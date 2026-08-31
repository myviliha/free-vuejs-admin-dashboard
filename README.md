# VuiAdmin Vue — Free Vue Tailwind Admin Dashboard Template

VuiAdmin is a free and open-source admin dashboard template built on **Vue 3 and Tailwind CSS**, from
[VILIHA](https://viliha.com). Nineteen screens, MIT licensed, on the same design system as the paid
editions — so what you evaluate here is what you build with.

This is the **Vue** edition: Vue 3 with `<script setup>`, Vite, and a static build with one HTML file
per route. Every screen renders from fixtures in its own file, so you can open one, read it top to
bottom, and see exactly where your data goes.

## Overview

* Vue 3.5 (`<script setup>`, Composition API)
* Vite 8
* TypeScript
* Tailwind CSS v4
* ApexCharts, FullCalendar and jsvectormap for the data screens

The components come from `@viliha/vui-vue`, its framework-free half `@viliha/vui-core`, and the shared
stylesheets in `@viliha/vui-css` — all three vendored under [`packages/`](./packages) so a clone
installs with nothing private in the way.

### Quick links

* [🚀 Live demo](https://vuejs.viliha.com)
* [⚛️ React edition](https://github.com/myviliha/free-reactjs-admin-dashboard) — Vite SPA
* [▲ Next.js edition](https://github.com/myviliha/free-nextjs-admin-dashboard) — App Router
* [🧱 HTML edition](https://github.com/myviliha/free-html-admin-dashboard) — no build step at all
* [✨ VILIHA](https://viliha.com)
* [⚡ Pro](https://viliha.com) — the server-backed record workflow, more dashboards, more screens

## Getting started

### Prerequisites

* Node.js 20.x or later

### Install and run

```bash
git clone git@github.com:myviliha/free-vuejs-admin-dashboard.git
cd free-vuejs-admin-dashboard
npm install
npm run dev
```

The dev server listens on [http://localhost:3000](http://localhost:3000).

### Scripts

| Script                | What it does                                            |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Vite dev server on port 3000                            |
| `npm run build`       | Static build into `dist/`, one HTML file per route       |
| `npm run preview`     | Serve the built `dist/` locally                         |
| `npm run check-types` | `vue-tsc --noEmit`                                      |
| `npm test`            | Route table, sidebar and screen-mount checks (`vitest`) |

### Configuration

There is nothing to configure to run the demo. Every screen renders from fixtures in its own file, so
there is no API to point at, no database and nothing secret.

## Real URLs, without a hash

`/alerts`, not `#/alerts` — and the build is what makes that free.

The router here is about fifty lines of Composition API rather than `vue-router`: nineteen routes did
not need a dependency, and `FREE_ROUTES` from `@viliha/vui-core` decides what counts as an address, so
one this app cannot answer falls to the not-found screen instead of rendering a blank shell.

This edition **used** a hash router, and the reason it gave was true but incomplete: history mode asks
the host to rewrite every unknown path to `index.html`, which is the kind of thing that works locally
and 404s once deployed. What that missed is that a static build solves the same problem without a
hash — write `alerts.html` and a deep link is a file read, not a rewrite rule. So `vite.config.ts`
emits one file per route, in both spellings static hosts disagree about (`alerts.html` and
`alerts/index.html`), plus a `404.html` for typos. The Vue, React and HTML editions therefore have
identical hosting requirements: one problem to get right instead of three.

## The nineteen routes

Sixteen behind the shell, two auth screens outside it, and a 404.

| Behind the shell                                                                    | Outside it   |
| ----------------------------------------------------------------------------------- | ------------ |
| `/` dashboard, `/calendar`, `/profile`, `/form-elements`, `/basic-tables`, `/blank` | `/signin`    |
| `/alerts`, `/avatars`, `/badge`, `/buttons`, `/images`, `/videos`, `/modals`         | `/signup`    |
| `/line-chart`, `/bar-chart`, `/layouts`                                             | `/error-404` |

`FREE_NAV` in `@viliha/vui-core` is the one list the sidebar and the route set both read, so they
cannot disagree, and `FREE_ROUTES` is derived from it. Every other edition of this demo reads the same
list, which is why it lives in the package rather than in `src/nav.ts`.

`routes.test.ts` holds `SCREENS` against that list in **both** directions — a route with no screen is
a blank page, a screen with no route is a file nobody can reach — and asserts that every screen file
in the folder is mapped. `shell.test.ts` mounts the screens, because a screen that throws on mount
still builds, still deploys, and is noticed only by the person it was meant to convince.

## What's in it

* **Dashboard** — metrics, monthly sales and target, statistics, a demographic world map, recent orders
* **Calendar** — FullCalendar with add, edit and delete
* **User Profile** — profile, security and danger-zone cards with edit dialogs
* **Forms** — the full input set: text, select, multi-select, date, time, radio, checkbox, switch, file
  upload, password
* **Tables** — recent deals, top products, latest transactions, featured campaigns, with search, filter
  and row actions
* **Charts** — line and bar
* **UI elements** — alerts, avatars, badges, buttons, images, modals, videos
* **Authentication** — sign in and sign up on a split-screen layout
* **Pages** — a blank starting point, six shell layouts, and a 404

Plus the things a dashboard is judged on rather than counted by: a collapsible sidebar that keeps its
state across navigation, a rail mode with flyout submenus, dark mode, a route progress bar, and
`aria-current` on the row you are actually on.

### What is deliberately not here

The searchable and multi-select dropdowns, drag-and-drop upload, the advanced data table and the other
dashboards. Those are the paid tier, and they are **absent** rather than shown disabled: a control a
reader cannot use is worse than one they can see is not included.

## Project layout

```
index.html            the single page the build starts from
src/
  main.ts             entry point; the stylesheet import is the first line
  App.vue             picks a screen and decides whether it gets the shell
  router.ts           real paths, in about fifty lines
  screens.ts          address → screen, for all nineteen
  screens/            one file per screen
  AppShell.vue        the sidebar, header and footer
  dashboard/          the dashboard's cards, charts and map
  styles.css          Tailwind plus the design system's tokens
packages/
  vui-core/           framework-free half: tokens, class strings, fixtures, the route list
  vui-vue/            the Vue components
  vui-css/            the shared stylesheets and the token file
public/
  CNAME               the custom domain, read by Pages on every deploy
routes.test.ts        the sidebar, the route list and the screen map, held against each other
shell.test.ts         every screen mounts
```

## Deploying

`npm run build` writes a static `dist/` — no Node process to run. Upload it anywhere.

This repository publishes itself:
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) type-checks, tests and builds on every
push to `main`, then deploys to GitHub Pages at [vuejs.viliha.com](https://vuejs.viliha.com). A pull
request runs the same checks and stops before publishing.

`public/CNAME` carries the custom domain and ships inside the build, because Pages re-reads it on every
deploy. There is no `base` set, which is correct for a domain of its own; serving from a
`<user>.github.io/<repo>` URL instead needs `base: "/<repo>/"` in `vite.config.ts`.

## Free and Pro

The free edition is this repository: nineteen screens and 64 component families, MIT licensed, with no
account and no key. The Pro tier adds the server-backed record workflow — list, detail, create, edit and
delete against your own API — along with more dashboards and the rest of the component catalogue.

VILIHA offers comprehensive templates: the same dashboard in **Vue, React, Next.js, Angular, HTML and
Laravel**, built on one design system, so a team can change stack without changing product. See
[viliha.com](https://viliha.com).

## License

MIT. Use it commercially, fork it, ship it; keep the licence notice.

## Support

If this is useful, a star on GitHub helps. Issues and pull requests are welcome.
