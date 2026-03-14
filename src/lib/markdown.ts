import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js";

export interface Heading {
  depth: number;
  id: string;
  text: string;
}

export interface RenderedMarkdown {
  description: string;
  excerpt: string;
  headings: Heading[];
  html: string;
  title: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{Script=Han}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || "section";
}

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, language) {
    if (language && hljs.getLanguage(language)) {
      return `<pre class="hljs"><code>${hljs.highlight(code, {
        language,
        ignoreIllegals: true
      }).value}</code></pre>`;
    }

    return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`;
  }
});

markdown.use(anchor, {
  level: [1, 2, 3],
  permalink: anchor.permalink.ariaHidden({
    class: "heading-anchor",
    symbol: "#"
  }),
  slugify
});

function stripMarkdown(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~#>-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(input: string): Heading[] {
  const headings: Heading[] = [];
  const counters = new Map<string, number>();

  for (const line of input.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const depth = match[1].length;
    const text = match[2].replace(/\s+#+\s*$/, "").trim();
    const baseId = slugify(text);
    const count = counters.get(baseId) ?? 0;
    counters.set(baseId, count + 1);

    headings.push({
      depth,
      id: count === 0 ? baseId : `${baseId}-${count}`,
      text
    });
  }

  return headings;
}

function extractTitle(headings: Heading[], input: string, fallback: string): string {
  const h1 = headings.find((item) => item.depth === 1);
  if (h1) {
    return h1.text;
  }

  const firstLine = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return firstLine ? firstLine.replace(/^#+\s*/, "") : fallback;
}

export function renderMarkdown(input: string, fallbackTitle: string): RenderedMarkdown {
  const headings = extractHeadings(input);
  const title = extractTitle(headings, input, fallbackTitle);
  const plainText = stripMarkdown(input);
  const excerpt = plainText.slice(0, 180);

  return {
    description: excerpt,
    excerpt,
    headings,
    html: markdown.render(input),
    title
  };
}
