import type { Component } from "vue";

import AlertsScreen from "./screens/AlertsScreen.vue";
import AvatarsScreen from "./screens/AvatarsScreen.vue";
import BadgeScreen from "./screens/BadgeScreen.vue";
import BarChartScreen from "./screens/BarChartScreen.vue";
import BasicTablesScreen from "./screens/BasicTablesScreen.vue";
import BlankScreen from "./screens/BlankScreen.vue";
import ButtonsScreen from "./screens/ButtonsScreen.vue";
import CalendarScreen from "./screens/CalendarScreen.vue";
import DashboardScreen from "./screens/DashboardScreen.vue";
import FormElementsScreen from "./screens/FormElementsScreen.vue";
import ImagesScreen from "./screens/ImagesScreen.vue";
import LayoutsScreen from "./screens/LayoutsScreen.vue";
import LineChartScreen from "./screens/LineChartScreen.vue";
import ModalsScreen from "./screens/ModalsScreen.vue";
import NotFoundScreen from "./screens/NotFoundScreen.vue";
import ProfileScreen from "./screens/ProfileScreen.vue";
import SignInScreen from "./screens/SignInScreen.vue";
import SignUpScreen from "./screens/SignUpScreen.vue";
import VideosScreen from "./screens/VideosScreen.vue";

/**
 * Address to screen, for every route in `FREE_ROUTES`.
 *
 * **A map rather than a router library**, for the reason `apps/web/vuejs` records: nineteen routes must
 * not cost a dependency, and a plain object plus a hash ref is all a demo needs.
 *
 * `routes.test.ts` holds this against `FREE_ROUTES` in both directions, so an address with no screen and
 * a screen with no address are both failures rather than a blank page.
 */
export const SCREENS: Record<string, Component> = {
  "/": DashboardScreen,
  "/alerts": AlertsScreen,
  "/avatars": AvatarsScreen,
  "/badge": BadgeScreen,
  "/bar-chart": BarChartScreen,
  "/basic-tables": BasicTablesScreen,
  "/blank": BlankScreen,
  "/calendar": CalendarScreen,
  "/buttons": ButtonsScreen,
  /**
   * `/error-404` is in the map like any other route, and `App.vue` decides it renders bare.
   *
   * It was special-cased in the root component, which the route test caught: the screen existed and the
   * map did not know about it, so "every route resolves to a screen" was false for one of nineteen while
   * the page rendered perfectly. A special case in a router is a route the tests cannot see.
   */
  "/error-404": NotFoundScreen,
  "/form-elements": FormElementsScreen,
  "/images": ImagesScreen,
  "/layouts": LayoutsScreen,
  "/line-chart": LineChartScreen,
  "/profile": ProfileScreen,
  "/modals": ModalsScreen,
  "/signin": SignInScreen,
  "/signup": SignUpScreen,
  "/videos": VideosScreen,
};

/**
 * The routes this edition has not ported, with the title their page header should carry.
 *
 * **Listed rather than defaulted**, so the set is countable: a `SCREENS[path] ?? Placeholder` fallback
 * would render the same thing and tell nobody how much is left. `routes.test.ts` asserts these two
 * tables partition `FREE_ROUTES` exactly, so a screen added here has to be removed from there.
 */

/** The document title each address carries, matching the React and Next editions exactly. */
export const TITLES: Record<string, string> = {
  "/": "Ecommerce Dashboard",
  "/alerts": "Alerts",
  "/avatars": "Avatar",
  "/badge": "Badges",
  "/bar-chart": "Bar Chart",
  "/basic-tables": "Basic Tables",
  "/blank": "Blank Page",
  "/buttons": "Buttons",
  "/calendar": "Calendar",
  "/error-404": "404 Error",
  "/form-elements": "Form Elements",
  "/images": "Images",
  "/layouts": "Layouts",
  "/line-chart": "Line Chart",
  "/modals": "Modals",
  "/profile": "User Profile",
  "/signin": "Sign In",
  "/signup": "Sign Up",
  "/videos": "Videos",
};

/**
 * `Alerts · VuiAdmin free`, and `VuiAdmin free` on the root.
 *
 * **This edition had one static title for all nineteen screens.** `index.html` set it once and nothing
 * changed it, so every tab read the same thing and a reader with the demo open twice could not tell
 * the two apart. The React and Next editions set a title per route; the shared template is here so the
 * three cannot word it differently.
 */
export const titleOf = (title?: string) => (title ? `${title} · VuiAdmin free` : "VuiAdmin free");
