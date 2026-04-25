import fs from "node:fs";
import path from "node:path";

const HTML_FILE_PATTERN = /^[a-zA-Z0-9-_/]+\.html$/;

function normalizeHtmlFileName(input: string): string {
  const withExtension = input.endsWith(".html") ? input : `${input}.html`;
  const sanitized = withExtension.replace(/^\/+/, "");

  if (!HTML_FILE_PATTERN.test(sanitized) || sanitized.includes("..")) {
    throw new Error("Invalid HTML file name");
  }

  return sanitized;
}

function getCandidateRoots(): string[] {
  const cwd = process.cwd();
  const roots = [cwd, path.join(cwd, "public")];
  const worktreesDir = path.join(cwd, ".claude", "worktrees");

  if (fs.existsSync(worktreesDir)) {
    const worktrees = fs
      .readdirSync(worktreesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(worktreesDir, entry.name));

    roots.push(...worktrees);
  }

  return roots;
}

function resolveHtmlPath(fileName: string): string | null {
  const normalized = normalizeHtmlFileName(fileName);

  for (const root of getCandidateRoots()) {
    const fullPath = path.join(root, normalized);

    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

export function htmlFileExists(fileName: string): boolean {
  try {
    return resolveHtmlPath(fileName) !== null;
  } catch {
    return false;
  }
}

export function readHtmlFile(fileName: string): string | null {
  try {
    const resolvedPath = resolveHtmlPath(fileName);

    if (!resolvedPath) {
      return null;
    }

    return fs.readFileSync(resolvedPath, "utf8");
  } catch {
    return null;
  }
}

export function toHtmlRoute(fileName: string): string {
  const normalized = normalizeHtmlFileName(fileName);
  return `/html/${normalized}`;
}
