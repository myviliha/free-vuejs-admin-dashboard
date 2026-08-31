import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

/**
 * One smoke test, and the reason it exists rather than being skipped as "just a demo": this app is what
 * a buyer looks at to decide whether the parity claim is true. A screen that throws on mount still
 * builds, still deploys, and is only noticed by the person it was meant to convince.
 *
 * `happy-dom` rather than a string render, because the assertion is that the components mount and
 * paint the fixtures, which is exactly what a server render cannot show (the Vue package made the same call
 * for the Vue package).
 */
export default defineConfig({
  plugins: [vue()],
  test: { environment: "happy-dom", include: ["*.test.ts"] },
});
