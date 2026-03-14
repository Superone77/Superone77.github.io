import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
const ghpages = require("gh-pages");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  console.error("未找到 dist 目录。请先运行 npm run build。");
  process.exit(1);
}

const message = process.env.GH_PAGES_COMMIT_MESSAGE ?? "Deploy Vinci Knowledge Base";
const repo =
  process.env.GITHUB_REPOSITORY_URL ??
  (() => {
    try {
      return execSync("git config --get remote.origin.url", {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    } catch {
      return "";
    }
  })();
const cname = process.env.GITHUB_PAGES_CNAME;

const branches = process.env.GH_PAGES_BRANCH
  ? [process.env.GH_PAGES_BRANCH]
  : ["gh-pages", "master"];

function publishToBranch(branch) {
  const options = {
    branch,
    dotfiles: true,
    message
  };

  if (repo) {
    options.repo = repo;
  }

  if (cname) {
    options.cname = cname;
  }

  return new Promise((resolve, reject) => {
    ghpages.publish(distDir, options, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

for (const branch of branches) {
  try {
    await publishToBranch(branch);
    console.log(`已发布到 ${branch} 分支。`);
  } catch (error) {
    console.error(`发布到 ${branch} 分支失败。`);
    console.error(error);
    process.exit(1);
  }
}
