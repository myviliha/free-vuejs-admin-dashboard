import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import tailwind from "@tailwindcss/vite";
import { FREE_ROUTES } from "@viliha/vui-core";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";

/**
 * One HTML file per route, which is what lets this app drop the hash from its URLs.
 *
 * **This was a hash router, and the reason it gave was true but not the whole story.** History mode
 * asks the host to rewrite every unknown path to `index.html`, which is exactly the kind of thing
 * that works locally and 404s once deployed — so the app used `#/alerts`, and paid for it in every
 * URL a reader sees (`PD-124`).
 *
 * The part that argument missed is that a static build can solve the same problem without a hash:
 * write `alerts.html` and a deep link becomes a file read rather than a rewrite rule. That is what
 * this does, so the Vue edition has identical hosting requirements to the React and HTML ones — one
 * problem to get right instead of two.
 *
 * Both spellings are written, `alerts.html` and `alerts/index.html`, because static hosts disagree
 * about which one answers `/alerts` and the pair costs a few kilobytes of identical markup. `/` needs
 * neither: Vite already wrote `index.html`.
 *
 * `404.html` is that shell once more, under the name GitHub Pages serves for an address it has no file
 * for. With one file per route it should never be reached; it is what catches a typo.
 */
const routeFiles = (): Plugin => ({
  name: "free-vue-route-files",
  apply: "build",
  closeBundle() {
    const out = join(import.meta.dirname, "dist");
    const shell = readFileSync(join(out, "index.html"), "utf8");
    let written = 0;
    for (const route of FREE_ROUTES) {
      if (route === "/") continue;
      const name = route.replace(/^\//, "");
      for (const file of [join(out, `${name}.html`), join(out, name, "index.html")]) {
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, shell);
        written += 1;
      }
    }
    writeFileSync(join(out, "404.html"), shell);
    this.info(`free-vue: ${written} route file(s) and 404.html written beside index.html`);
  },
});

/**
 * The free edition's Vue demo: nineteen screens on the same design system as the paid editions.
 *
 * **A plain build into `dist/`, and it used to write into a storefront.** `base` was
 * `/preview/free-vue/` and `outDir` pointed into another application's `public/` directory, because
 * the demo was served from a marketing site rather than from anywhere of its own. This repository is
 * the app on its own domain, so both are gone: the output is `dist/`, the base is the root, and every
 * asset URL is correct without a build-only special case.
 */
export default defineConfig({
  plugins: [vue(), tailwind(), routeFiles()],
  build: { outDir: "dist", emptyOutDir: true },
});
