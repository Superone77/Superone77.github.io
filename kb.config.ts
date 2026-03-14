import path from "node:path";
import { homedir } from "node:os";

function expandHomePath(input: string): string {
  if (input === "~") {
    return homedir();
  }

  if (input.startsWith("~/")) {
    return path.join(homedir(), input.slice(2));
  }

  return input;
}

export const kbConfig = {
  siteTitle: "Vinci Knowledge Base",
  siteDescription: "将本地知识库项目自动转换为静态网页并发布到 GitHub Pages。",
  sourceDir: expandHomePath(process.env.KB_SOURCE_DIR ?? "~/Documents/知识库/projects"),
  includeProjects: "all" as const
};
