import "./styles.css";
import { createApp } from "vue";

import App from "./App.vue";

/**
 * The free Vue demo's entry point.
 *
 * The stylesheet import is the first line for the reason `apps/web/vuejs` records: it is Tailwind plus
 * the design system's own token file, generated from `packages/react/src/theme.css`, so this demo cannot
 * drift from the tokens the other editions read. A hand-written copy would make it a lookalike, which
 * is the one thing a parity demo must not be.
 */
createApp(App).mount("#app");
