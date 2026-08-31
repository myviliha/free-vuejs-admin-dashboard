import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Every class the app writes has a rule in the stylesheet the build produced.
 *
 * **This is the check whose absence shipped a broken dashboard.** The Angular edition imported the
 * design system already compiled, so Tailwind never learned that `foreground`, `card` and `primary`
 * were *colours*. Twelve utilities then failed to emit, all of them ones Tailwind has to compute:
 * every opacity modifier (`text-foreground/80`, `bg-accent/40`) and every colour on a utility the
 * default palette does not cover (`border-card`, `ring-card`).
 *
 * Nothing errored. The class was in the markup, the rule was simply absent, and the element rendered
 * with whatever it inherited. On the dashboard the date-range label kept `text-transparent` at every
 * width, so the control looked like an icon-only button with no label at all.
 *
 * The build has to have run for this to mean anything, which is why it skips rather than fails when
 * `dist/` is not there: `npm test` before a first build should not be a red suite.
 */
const HERE = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(HERE, "dist", "assets");

/** Tailwind escapes these in selectors, so the lookup has to escape them the same way. */
const cssEscape = (token: string) => token.replace(/[\\.:[\]()/%#,!<>'"&*+~=@^|$?{};]/g, (ch) => "\\" + ch);

/**
 * Class names that are hooks rather than utilities, so having no rule is correct. `group/x` and
 * `peer/x` name a group for a variant to target and emit nothing themselves; `rdp-*` are
 * react-day-picker's semantic names; `vui-*` are the design system's own component classes.
 */
const SEMANTIC = /^(?:rdp-|apexcharts-|fc-|vui-)|^(?:group|peer)\//;

function stylesheet(): string | null {
  if (!existsSync(ASSETS)) return null;
  const sheets = readdirSync(ASSETS).filter((f) => f.endsWith(".css"));
  if (!sheets.length) return null;
  return sheets.map((f) => readFileSync(join(ASSETS, f), "utf8")).join("\n");
}

function sources(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) sources(full, out);
    else if (/\.(ts|tsx|vue|html)$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe("emitted utilities", () => {
  const css = stylesheet();

  it.runIf(css)("every class the app writes has a rule in the built stylesheet", () => {
    // `runIf` gates the case, and the compiler cannot see that, so the assertion is stated.
    if (!css) throw new Error("unreachable: the case is gated on `css`");
    const classes = new Set<string>();
    for (const file of sources(join(HERE, "src"))) {
      const body = readFileSync(file, "utf8");
      /*
       * Literal class lists only. A bound attribute (`:class="cn(...)"` in Vue, `[class]="x"` in
       * Angular) holds an *expression*, and splitting that on whitespace yields `cn('size-4` and
       * `'rotate-180')` rather than class names. The strings inside `cn(...)` are picked up below,
       * which is where a bound class's literals actually live.
       */
      for (const [, list = ""] of body.matchAll(/(?<![:[\w-])(?:class|triggerClass|panelClass|labelClass)\s*=\s*"([^"]*)"/g)) {
        for (const token of list.split(/\s+/)) if (token) classes.add(token);
      }
      for (const [, args = ""] of body.matchAll(/\bcn\(([^)]*)\)/g)) {
        for (const [, quoted = ""] of args.matchAll(/"([^"]*)"/g)) {
          for (const token of quoted.split(/\s+/)) if (token) classes.add(token);
        }
      }
    }

    const orphans = [...classes].filter(
      (c) =>
        // A utility contains at least one letter. `...` shows up from an elided example in a comment,
        // and a template expression is not a class name either.
        /[a-z]/i.test(c) &&
        !/[${}]/.test(c) &&
        !SEMANTIC.test(c) &&
        !css.includes("." + cssEscape(c)),
    );

    // Named, so a failure says which class rather than only how many.
    expect(orphans).toEqual([]);
  });
});
