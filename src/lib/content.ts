import fs from "node:fs";
import path from "node:path";

import YAML from "yaml";

import { kbConfig } from "../../kb.config";
import { renderMarkdown, type Heading, type RenderedMarkdown } from "./markdown";
import { prettifySlug } from "./site";

export interface StatusMeta {
  currentBatch?: string;
  displayName?: string;
  humanReviewRequired?: boolean;
  projectId?: string;
  status?: string;
  updatedAt?: string;
}

export interface DocPage {
  description: string;
  excerpt: string;
  fileName: string;
  headings: Heading[];
  html: string;
  order: number;
  projectSlug: string;
  relativePath: string;
  slug: string;
  sourcePath: string;
  title: string;
}

export interface ProjectPage {
  description: string;
  displayName: string;
  docCount: number;
  docs: DocPage[];
  knowledgeIndex?: RenderedMarkdown;
  readme?: RenderedMarkdown;
  slug: string;
  sourcePath: string;
  status?: string;
  updatedAt?: string;
}

export interface SearchEntry {
  kind: "doc" | "project";
  projectSlug: string;
  subtitle: string;
  title: string;
  url: string;
}

export interface SiteContent {
  generatedAt: string;
  projects: ProjectPage[];
  searchEntries: SearchEntry[];
}

const collator = new Intl.Collator("zh-CN", {
  numeric: true,
  sensitivity: "base"
});

let cache: SiteContent | null = null;

function ensureSourceDirExists(sourceDir: string): void {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(
      `知识库源目录不存在：${sourceDir}。可通过 KB_SOURCE_DIR 环境变量覆盖默认路径。`
    );
  }
}

function readFileIfExists(filePath: string): string | undefined {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return fs.readFileSync(filePath, "utf8");
}

function readStatus(filePath: string): StatusMeta {
  const raw = readFileIfExists(filePath);
  if (!raw) {
    return {};
  }

  let parsed: Record<string, unknown> | null = null;

  try {
    parsed = YAML.parse(raw) as Record<string, unknown> | null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[vinci-kb] Skipping invalid STATUS.yaml at ${filePath}: ${message}`);
    return {};
  }

  return {
    currentBatch: typeof parsed?.current_batch === "string" ? parsed.current_batch : undefined,
    displayName: typeof parsed?.display_name === "string" ? parsed.display_name : undefined,
    humanReviewRequired:
      typeof parsed?.human_review_required === "boolean" ? parsed.human_review_required : undefined,
    projectId: typeof parsed?.project_id === "string" ? parsed.project_id : undefined,
    status: typeof parsed?.status === "string" ? parsed.status : undefined,
    updatedAt: typeof parsed?.updated_at === "string" ? parsed.updated_at : undefined
  };
}

function getNaturalOrder(fileName: string, index: number): number {
  const prefix = /^(\d+)/.exec(fileName);
  if (prefix) {
    return Number(prefix[1]);
  }

  const letterPrefix = /^([A-Z])[-_]?/i.exec(fileName);
  if (letterPrefix) {
    return 1000 + letterPrefix[1].toUpperCase().charCodeAt(0);
  }

  return 10000 + index;
}

function loadDocs(projectSlug: string, knowledgeDir: string): {
  docs: DocPage[];
  knowledgeIndex?: RenderedMarkdown;
} {
  if (!fs.existsSync(knowledgeDir)) {
    return { docs: [] };
  }

  const entries = fs
    .readdirSync(knowledgeDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .sort((a, b) => collator.compare(a.name, b.name));

  const docs: DocPage[] = [];
  let knowledgeIndex: RenderedMarkdown | undefined;

  entries.forEach((entry, index) => {
    const fullPath = path.join(knowledgeDir, entry.name);
    const raw = fs.readFileSync(fullPath, "utf8");
    const relativePath = path.join("knowledge", entry.name);

    if (entry.name === "INDEX.md") {
      knowledgeIndex = renderMarkdown(raw, "Knowledge Index");
      return;
    }

    if (entry.name === "README.md") {
      return;
    }

    const slug = entry.name.replace(/\.md$/i, "");
    const rendered = renderMarkdown(raw, prettifySlug(slug));

    docs.push({
      description: rendered.description,
      excerpt: rendered.excerpt,
      fileName: entry.name,
      headings: rendered.headings,
      html: rendered.html,
      order: getNaturalOrder(entry.name, index),
      projectSlug,
      relativePath,
      slug,
      sourcePath: fullPath,
      title: rendered.title
    });
  });

  docs.sort((left, right) => {
    if (left.order !== right.order) {
      return left.order - right.order;
    }

    return collator.compare(left.fileName, right.fileName);
  });

  return { docs, knowledgeIndex };
}

function getLatestUpdatedAt(
  sourcePath: string,
  statusUpdatedAt: string | undefined,
  docs: DocPage[]
): string | undefined {
  if (statusUpdatedAt) {
    return statusUpdatedAt;
  }

  const candidates = docs.map((doc) => {
    const stat = fs.statSync(doc.sourcePath);
    return stat.mtime;
  });

  const readmePath = path.join(sourcePath, "README.md");
  if (fs.existsSync(readmePath)) {
    candidates.push(fs.statSync(readmePath).mtime);
  }

  candidates.sort((left, right) => right.getTime() - left.getTime());

  return candidates.length > 0 ? candidates[0].toISOString() : undefined;
}

function loadProject(projectPath: string): ProjectPage {
  const slug = path.basename(projectPath);
  const status = readStatus(path.join(projectPath, "STATUS.yaml"));
  const readmeRaw = readFileIfExists(path.join(projectPath, "README.md"));
  const readme = readmeRaw
    ? renderMarkdown(readmeRaw, status.displayName ?? prettifySlug(slug))
    : undefined;
  const { docs, knowledgeIndex } = loadDocs(slug, path.join(projectPath, "knowledge"));
  const updatedAt = getLatestUpdatedAt(projectPath, status.updatedAt, docs);
  const displayName = status.displayName ?? readme?.title ?? prettifySlug(slug);
  const description =
    readme?.description ??
    knowledgeIndex?.description ??
    docs[0]?.description ??
    `${displayName} 的知识库项目`;

  return {
    description,
    displayName,
    docCount: docs.length,
    docs,
    knowledgeIndex,
    readme,
    slug,
    sourcePath: projectPath,
    status: status.status,
    updatedAt
  };
}

export function getSiteContent(): SiteContent {
  if (cache) {
    return cache;
  }

  ensureSourceDirExists(kbConfig.sourceDir);

  const projectDirs = fs
    .readdirSync(kbConfig.sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => path.join(kbConfig.sourceDir, entry.name))
    .sort((left, right) => collator.compare(path.basename(left), path.basename(right)));

  const projects = projectDirs.map(loadProject);
  const searchEntries: SearchEntry[] = [];

  for (const project of projects) {
    searchEntries.push({
      kind: "project",
      projectSlug: project.slug,
      subtitle: `${project.docCount} 篇文章`,
      title: project.displayName,
      url: `/${project.slug}/`
    });

    for (const doc of project.docs) {
      searchEntries.push({
        kind: "doc",
        projectSlug: project.slug,
        subtitle: project.displayName,
        title: doc.title,
        url: `/${project.slug}/${doc.slug}/`
      });
    }
  }

  cache = {
    generatedAt: new Date().toISOString(),
    projects,
    searchEntries
  };

  return cache;
}

export function getProjectBySlug(projectSlug: string): ProjectPage | undefined {
  return getSiteContent().projects.find((project) => project.slug === projectSlug);
}

export function getDocBySlug(projectSlug: string, docSlug: string): DocPage | undefined {
  return getProjectBySlug(projectSlug)?.docs.find((doc) => doc.slug === docSlug);
}
