import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, it } from "vitest";

/**
 * The vendored packages are complete in **git**, not merely on disk.
 *
 * **This exists because the difference bit.** `@viliha/vui-vue`'s build vendors
 * `@internationalized/date` inside its own `dist/node_modules/.pnpm/…`, and `.gitignore` carried an
 * unanchored `node_modules/`, which matches a directory of that name at any depth. Seven files were
 * therefore never committed: every check passed here, and a fresh clone failed to resolve the
 * Calendar's imports. A working tree is not the artefact anyone else receives.
 *
 * `git ls-files` rather than `readdirSync` is the whole point — asking the filesystem is asking the
 * one copy that is known to be fine.
 */
const HERE = dirname(fileURLToPath(import.meta.url));

const tracked = new Set(
  execFileSync("git", ["ls-files", "packages"], { cwd: HERE, encoding: "utf8" })
    .split("\n")
    .filter(Boolean),
);

it("the vendored packages are tracked at all, so the checks below mean something", () => {
  expect(tracked.size).toBeGreaterThan(500);
});

it("every local import in the vendored Vue package resolves to a tracked file", () => {
  /**
   * Walks what git has, and follows each relative import to the file it names.
   *
   * A missing file here is invisible until someone clones: npm links the package from `packages/`, so
   * the import resolves against the working tree that still has it.
   */
  const missing: string[] = [];
  for (const file of tracked) {
    if (!file.endsWith(".js")) continue;
    const body = readFileSync(join(HERE, file), "utf8");
    for (const [, spec] of body.matchAll(/from\s*["'](\.[^"']+)["']/g)) {
      if (!spec) continue;
      // Repo-relative, so the answer can be looked up in `tracked` rather than on disk.
      const target = relative(HERE, join(dirname(join(HERE, file)), spec));
      // The build emits extensionless siblings in places, so try the plain path and `.js`/`.mjs`.
      const candidates = [target, `${target}.js`, `${target}.mjs`];
      // **`tracked`, not `existsSync`.** Checking the filesystem is what made the first version of
      // this test pass while the clone was broken: the files were on disk and simply not committed.
      if (candidates.some((c) => tracked.has(c))) continue;
      missing.push(`${file} -> ${spec}`);
    }
  }
  expect(missing).toEqual([]);
});

it("no vendored file points into a pnpm store outside this repository", () => {
  // `dist/node_modules/.pnpm/…` inside the package is fine — the build put it there and it ships.
  // A path that climbs *out*, or names a store this repository does not contain, is not.
  const escapes: string[] = [];
  for (const file of tracked) {
    if (!/\.(js|mjs|css|d\.ts)$/.test(file)) continue;
    const body = readFileSync(join(HERE, file), "utf8");
    for (const [, spec] of body.matchAll(/["'](\.\.\/\.\.\/\.\.\/[^"']*node_modules[^"']*)["']/g)) {
      if (spec) escapes.push(`${file} -> ${spec}`);
    }
  }
  expect(escapes).toEqual([]);
});

it("the vendored Outfit font files are tracked", () => {
  // The theme names Outfit and nothing else supplies it, so if these stop shipping the pages fall
  // back to the system sans. That is not a visible break — it is a quiet one: text measures wider,
  // and the first thing it did was wrap the social buttons on the sign-in screen onto two lines.
  const fonts = [...tracked].filter((f) => f.startsWith("packages/vui-css/fonts/"));
  expect(fonts.sort()).toEqual([
    "packages/vui-css/fonts/outfit-latin-ext.woff2",
    "packages/vui-css/fonts/outfit-latin.woff2",
  ]);
});
