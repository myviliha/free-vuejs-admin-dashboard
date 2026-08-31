/**
 * The class strings that *are* the design system, as data.
 *
 * A component in any framework renders the same markup with the same Tailwind
 * utilities; only the templating differs. Keeping the strings here means the
 * React component and the Vue one cannot drift: change a button's hover state
 * once and both follow.
 *
 * Framework-free on purpose. It ships to non-React consumers through
 * `@viliha/vui-core` (see packages/core/scripts/build.mjs), so nothing in this
 * file may import React, Vue or Svelte.
 */
export type ButtonVariant = "default" | "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
export type ButtonSize = "default" | "sm" | "lg" | "icon";
export declare const BUTTON_BASE = "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
export declare const BUTTON_VARIANTS: Record<ButtonVariant, string>;
export declare const BUTTON_SIZES: Record<ButtonSize, string>;
export type BadgeVariant = "default" | "secondary" | "outline" | "muted" | "success" | "warning" | "destructive" | "info";
/**
 * **A pill, at 500, since 2026-08-24.** It was `rounded-md ... font-normal`, which reads as a small
 * rectangle of text rather than a status chip, and every table that wanted the conventional shape
 * was writing `rounded-full px-2.5` at the call site: the same override typed twice before anyone
 * noticed it was a decision the component should be making. The reference draws all of its badges
 * this way and it is right about it. One product-wide change to fifty-eight badges, on purpose.
 */
export declare const BADGE_BASE = "inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 font-medium";
/**
 * Optional type scale, matching the reference's two.
 *
 * Neither is the default: a badge with no size **inherits** its surroundings, which is what makes it
 * usable inside a table cell, a heading and a sidebar row without three call sites arguing about
 * which one is right. These are for a demo, or for the badge that has to be a size regardless.
 */
export declare const BADGE_SIZES: {
    readonly sm: "text-xs";
    readonly md: "text-sm";
};
/**
 * The tinted family: a wash of the state's colour with the text in it.
 *
 * `info` joined on 2026-08-24. It was the one state the reference offers that this could not, for
 * the same reason the alerts page shipped two variants of four: there was no token for it until
 * `PD-066`.
 */
export declare const BADGE_VARIANTS: Record<BadgeVariant, string>;
/**
 * The solid family: the state's colour as the ground.
 *
 * **Two axes, because one could not say "solid success".** This table conflated shape and colour:
 * `default` was solid primary while `success` was a tint, so the seven keys were a mix of two
 * families and there was no way to ask for the other half of either. The reference has both and
 * needs both, because a tint on a coloured row disappears and a solid chip in a dense table shouts.
 *
 * Same keys as the tinted family, so `solid` is a boolean on the component rather than a second
 * vocabulary a reader has to learn. `outline` is the one that cannot have a solid form and stays
 * itself.
 */
export declare const BADGE_SOLID: Record<BadgeVariant, string>;
export declare const SWITCH_ROOT = "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80";
export declare const SWITCH_THUMB = "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground";
/**
 * The checkbox. Carries an invalid variant for the same reason `INPUT` does: a required box in a
 * submitted form is a real state.
 *
 * **It is a ring rather than a border, and that is not a style preference.** This is a native
 * `input[type=checkbox]`, so Tailwind's preflight has already set `border: 0 solid` on it and the
 * box itself is painted by the UA, which ignores `border-color` outright. `border-destructive`
 * here renders exactly nothing. A ring is a `box-shadow`, which does paint on a native control.
 */
export declare const CHECKBOX = "size-4 shrink-0 cursor-pointer rounded border-input accent-[var(--button-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:ring-2 aria-invalid:ring-destructive";
export declare const TABS_ROOT = "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col";
export type TabsListVariant = "default" | "line";
export declare const TABS_LIST_BASE = "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none";
export declare const TABS_LIST_VARIANTS: Record<TabsListVariant, string>;
export declare const TABS_TRIGGER: string;
export declare const TABS_CONTENT = "flex-1 outline-none";
export declare const ACCORDION_ITEM = "border-b last:border-b-0";
export declare const ACCORDION_TRIGGER = "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180";
export declare const ACCORDION_CHEVRON = "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200";
export declare const ACCORDION_CONTENT = "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down";
export declare const ACCORDION_CONTENT_INNER = "pt-0 pb-4";
/**
 * The dialog's backdrop: a tint **and a blur**.
 *
 * A tint alone leaves the page behind fully legible, so the eye keeps reading it and the dialog has
 * to shout to hold attention. Blurring it removes the competition without hiding the context, which
 * is why the reference uses `backdrop-blur-[32px]` and why every operating system does the same
 * thing behind a sheet.
 *
 * `supports-[backdrop-filter]` guards it: where the filter is unsupported the tint alone still has
 * to be enough contrast on its own, and it is, which is why the tint is not weakened to compensate
 * for a blur that might not arrive.
 */
export declare const DIALOG_OVERLAY: string;
export declare const DIALOG_PANEL = "vui-pop-in w-full max-w-md overflow-hidden rounded-lg border border-border bg-background shadow-xl";
/**
 * The dialog's close control: a tinted circle in the panel's corner.
 *
 * Measured from the reference: `h-9.5 w-9.5` rising to `h-11 w-11` at `sm`, at `right-3 top-3` then
 * `right-6 top-6`. It is `absolute`, so a panel whose content scrolls keeps the X in view rather
 * than scrolling it away, and it is the first tab stop inside the panel for the same reason a reader
 * looks there first.
 */
/**
 * The corner close control.
 *
 * **It used to be a 44px circle inset 24px, and nothing reserved the space for it.** So on every
 * dialog with a header the control sat *below* the header band and painted over the first line of the
 * body: the modals page showed "the invoice is raised seven days before the ch" with the rest of the
 * word under the X. A control that overlaps the text it shares a panel with is not a placement
 * problem on one page, it is the same defect on every dialog in the product.
 *
 * 32px at a 12px inset fits **inside** the header band, whose own height is the title's line at
 * `py-3`. `DIALOG_HEADER` reserves the width with `pr-14`, so a long title wraps before it reaches
 * the control rather than sliding under it. No `sm:` growth, because the band does not grow either.
 */
export declare const DIALOG_CLOSE = "absolute top-3 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
/** `pr-14` reserves the close control's corner, so a long title wraps instead of running under it. */
export declare const DIALOG_HEADER = "border-b border-border bg-muted/40 py-3 pr-14 pl-5";
export declare const DIALOG_TITLE = "text-base font-semibold tracking-tight";
/** Capped so long content scrolls inside the dialog, not the page behind it. */
export declare const DIALOG_BODY = "relative max-h-[70vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed";
export declare const DIALOG_FOOTER = "flex items-center justify-end gap-2 border-t border-border bg-muted/40 px-5 py-3";
/**
 * Everything about the popover surface except its transform origin. Radix and
 * Reka each publish the measured origin under their own variable name, so each
 * component adds that one utility itself, the same split the accordion uses.
 */
export declare const POPOVER_CONTENT = "z-[200] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";
export declare const POPOVER_HEADER = "flex flex-col gap-1 text-sm";
export declare const POPOVER_TITLE = "font-medium";
export declare const POPOVER_DESCRIPTION = "text-muted-foreground";
export declare const TOOLTIP_CONTENT = "vui-fade-in relative w-fit max-w-xs text-balance rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md";
export declare const DROPDOWN_TRIGGER = "inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 font-medium transition-colors";
export declare const DROPDOWN_TRIGGER_ACTIVE = "bg-accent text-accent-foreground";
export declare const DROPDOWN_TRIGGER_IDLE = "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
export declare const DROPDOWN_CONTENT = "vui-pop-in z-[200] min-w-52 overflow-hidden rounded-md border border-border bg-popover text-left text-sm font-normal text-popover-foreground shadow-md";
/** Bordered rows, the list standard shared with `Menu`. */
export declare const DROPDOWN_ITEM = "flex w-full cursor-pointer items-center gap-2 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-accent hover:text-accent-foreground aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-transparent aria-disabled:hover:text-inherit";
/**
 * A menu row's parts. The label takes the row's remaining width so a trailing glyph or state
 * checkbox sits at the right edge, and truncates rather than wrapping the row; the checkbox reports
 * state and is never the hit target, because the row is. Both were literals inside
 * `dropdown-menu.tsx` until the Vue record view needed the same two elements (`D28`: a constant only
 * one edition reads is not shared, and a literal only one edition has is not either).
 */
export declare const DROPDOWN_ITEM_LABEL = "flex-1 truncate";
export declare const DROPDOWN_ITEM_CHECK = "pointer-events-none";
export declare const DROPDOWN_LABEL = "border-b border-border px-3 py-2 text-left font-medium text-muted-foreground";
export declare const SELECT_TRIGGER = "flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-4 text-sm transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive";
export declare const SELECT_CONTENT = "vui-pop-in z-[200] overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md";
export declare const SELECT_ITEM = "flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-accent hover:text-accent-foreground";
export declare const SELECT_ITEM_ACTIVE = "bg-accent/60";
/**
 * The keyboard-highlighted option, which is **not** the selected one: arrowing through the list
 * moves this while `SELECT_ITEM_ACTIVE` stays on whatever is currently chosen. A single class for
 * both would make "the value you have" and "the value you are about to pick" indistinguishable.
 */
export declare const SELECT_ITEM_HIGHLIGHT = "bg-accent text-accent-foreground";
/**
 * The same highlight, applied declaratively. React computes `active` in JS and
 * adds SELECT_ITEM_ACTIVE; a headless library that exposes the selected state as
 * a data attribute uses this instead. Two forms of one decision, kept together
 * so changing the colour changes both.
 */
export declare const SELECT_ITEM_CHECKED = "data-[state=checked]:bg-accent/60";
export declare const SELECT_PLACEHOLDER = "text-muted-foreground";
/**
 * The same greying, as a variant on the trigger rather than a conditional class on the value.
 *
 * **The two editions reach it differently and this constant is where that is written down.** React
 * knows whether a value is selected, so `select.tsx` puts `SELECT_PLACEHOLDER` on the value span
 * when it is not. Reka sets `data-placeholder` on the trigger, so the Vue port styles from there and
 * the colour is inherited. Same appearance, different element, and the alternative was a class
 * string composed inside a `.vue` file, which is the one thing the shared source exists to prevent.
 */
export declare const SELECT_TRIGGER_PLACEHOLDER = "data-[placeholder]:text-muted-foreground";
export declare const TABLE_ROOT = "w-full caption-bottom text-sm font-normal";
export declare const TABLE_HEADER = "[&_tr]:border-b";
export declare const TABLE_FOOTER = "border-t bg-muted/40 font-medium";
export declare const TABLE_ROW = "border-b border-border transition-colors hover:bg-muted/50";
export declare const TABLE_HEAD = "h-8 border-r border-border px-3 text-left align-middle font-semibold text-foreground last:border-r-0 [&:has([role=checkbox])]:pr-0";
export declare const TABLE_CELL = "border-r border-border px-3 py-1.5 align-middle last:border-r-0 [&:has([role=checkbox])]:pr-0";
export declare const TABLE_CAPTION = "mt-4 text-muted-foreground";
/**
 * The **content table**: the airy counterpart to the dense grid above.
 *
 * `TABLE_*` is tuned for the back office, where the job is fitting rows on a screen: vertical rules
 * on every cell, `py-1.5`, a 32px header. A table on a page of content has the opposite job, and
 * reading a dense grid as "the table style" is what makes a marketing or reporting page look like a
 * spreadsheet someone pasted in.
 *
 * **Descendant variants rather than a prop or a global class.** Every metric here belongs to the
 * table as a whole, so putting it on the table is one class at one call site instead of the same
 * override typed onto every `th` and `td`, which is what the reference does and what a demo page
 * should never have to. It stays a plain Tailwind string, so it needs no client boundary, no rule in
 * `theme.css`, and nothing to port: Vue, Angular and the static HTML edition all get it by reading
 * the same constant. A React context was the other option and is what ruled the client boundary in:
 * this file also ships to the framework-free package, whose build rejects a client directive on
 * sight, and a table has no reason to stop rendering on the server.
 *
 * The last row loses its bottom border because this sits inside a clipped frame, where a border on
 * the final row lands directly on the frame's own edge and reads as a double rule.
 */
/**
 * The two controls that live in a table's last column: the menu trigger, and the destructive one.
 *
 * Both were inline strings at their call sites, three in the React edition and one in Vue, and the
 * two copies of the destructive one had **already drifted into a different class order**
 * (`focus-visible:outline-none` before the ring in one, after it in the other). Identical output, two
 * literals, which is the state `check:shared-classes` exists to catch and the reason a string used by
 * more than one edition belongs here (`PD-136`).
 *
 * `p-1.5` on a 16px icon, so the hit target is 28px rather than the 40px a `Button` would give: a
 * row's action must not set the row's height.
 */
export declare const ROW_ACTION_TRIGGER = "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
/** The same control where the action cannot be undone, so it warns in `--destructive` on hover. */
export declare const ROW_DELETE_BUTTON = "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export declare const TABLE_AIRY: string;
export declare const HOVER_CARD_CONTENT = "z-[210] w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95";
export declare const PROGRESS_ROOT = "relative h-2 w-full overflow-hidden rounded-full bg-primary/15";
/**
 * The avatar: a **circle** by default.
 *
 * It was `rounded-md`, so every avatar in the product was a rounded square: a person's face in a
 * box, and a wide image uploaded to a profile cropped to a rectangle rather than to the circle the
 * design shows. An avatar of a person is a circle by convention, which is what the reference draws
 * and what shadcn ships; the one place here that genuinely wants a square is a product thumbnail in
 * the orders table, and it already asks for `rounded-lg` explicitly.
 *
 * `overflow-hidden` with `object-cover` on the image is what makes the crop happen, and both were
 * already right: only the shape was wrong.
 */
export declare const AVATAR_ROOT = "relative flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full";
/**
 * The avatar's image.
 *
 * `z-10` exists only to beat the sibling fallback, which is rendered after it and would otherwise
 * paint on top. **Anything layered over an avatar has to beat this**, and that is not obvious from
 * the call site: a camera badge positioned over a profile picture vanished the moment a picture was
 * chosen, which is exactly when the control had something to undo. Layer above `z-10`.
 */
export declare const AVATAR_IMAGE = "absolute inset-0 z-10 size-full object-cover";
export declare const AVATAR_FALLBACK = "flex size-full items-center justify-center bg-muted font-medium text-muted-foreground";
/**
 * The avatar scale, and the presence dot that goes with it.
 *
 * Six steps, matching the reference's, because the sizes an avatar is actually used at are not a
 * continuum: 24 in a table's team stack, 32 in a menu row, 40 in a list, 48 in a card, 56 and 64 on a
 * profile. Call sites were writing `size-10` by hand, which works and says nothing about whether 40
 * is a step or a one-off.
 *
 * **The dot is sized per step rather than fixed.** A 6px dot on a 64px avatar is a speck and a 16px
 * dot on a 24px avatar is a third of the face. Scaling it is the only way one component serves both,
 * and it is why this is a table and not a single class.
 */
export declare const AVATAR_SIZES: {
    readonly xs: "size-6";
    readonly sm: "size-8";
    readonly md: "size-10";
    readonly lg: "size-12";
    readonly xl: "size-14";
    readonly "2xl": "size-16";
};
export type AvatarSize = keyof typeof AVATAR_SIZES;
/**
 * The wrapper the dot needs.
 *
 * **`AVATAR_ROOT` carries `overflow-hidden`**, which is what crops the picture into a circle and
 * would equally crop a dot sitting on the circle's edge. So presence is drawn in a wrapper *outside*
 * the clip, and the wrapper only exists when there is a status to show: an avatar without one has
 * exactly the DOM it always had.
 */
export declare const AVATAR_PRESENCE_WRAP = "relative inline-flex shrink-0";
/** The four the reference offers, as CSS ratios rather than padding hacks. */
export declare const VIDEO_RATIOS: {
    readonly "16:9": "aspect-video";
    readonly "4:3": "aspect-[4/3]";
    readonly "21:9": "aspect-[21/9]";
    readonly "1:1": "aspect-square";
};
export type VideoRatio = keyof typeof VIDEO_RATIOS;
export declare const VIDEO_FRAME = "relative w-full overflow-hidden rounded-xl bg-muted";
export declare const VIDEO_IFRAME = "absolute inset-0 size-full border-0";
/**
 * The poster, before the player exists.
 *
 * A gradient of the brand rather than a fetched thumbnail, because a thumbnail is the third-party
 * request this component exists to defer.
 */
export declare const VIDEO_POSTER = "group absolute inset-0 grid size-full cursor-pointer place-items-center bg-gradient-to-br from-primary/25 via-primary/10 to-info/20 transition-colors hover:from-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset";
export declare const VIDEO_PLAY = "grid size-16 place-items-center rounded-full bg-card/90 shadow-lg ring-1 ring-border transition-transform group-hover:scale-105";
export declare const VIDEO_PLAY_ICON = "size-6 translate-x-px text-primary";
export declare const VIDEO_HINT = "absolute bottom-3 left-0 w-full px-4 text-center text-xs text-foreground/70";
export declare const AVATAR_STATUS = "absolute right-0 bottom-0 rounded-full border-[1.5px] border-card";
export declare const AVATAR_STATUS_SIZES: Record<AvatarSize, string>;
/** Presence, on the state tokens rather than raw palette classes, so a retheme carries it. */
export declare const AVATAR_STATUS_TONES: {
    readonly online: "bg-success";
    readonly offline: "bg-muted-foreground";
    readonly busy: "bg-warning";
    readonly away: "bg-info";
};
export type AvatarStatus = keyof typeof AVATAR_STATUS_TONES;
/**
 * `<input type="file">`, whose button is the one part of it a stylesheet can reach.
 *
 * The reference draws that button as a **full-height segment with a rule down its right edge**, not
 * as a pill floating inside the field. The height is `INPUT`'s 44px **minus its two border
 * pixels**, because the button lives in the content box rather than the border box and a flat 44px
 * paints its square corners over the field's own outline. `file:mr-4`
 * gives "No file chosen" the same 16px inset every other value gets, so the two halves read as one
 * control. `py-0` because the button is the full height: the input's own vertical padding would
 * inset it and reopen the gap.
 */
export declare const FILE_INPUT = "cursor-pointer py-0 text-muted-foreground file:mr-4 file:h-[calc(2.75rem-2px)] file:cursor-pointer file:rounded-none file:border-0 file:border-r file:border-input file:bg-muted/50 file:px-4 file:text-sm file:font-medium file:text-foreground";
export declare const RADIO_GROUP_ROOT = "grid gap-3";
export declare const RADIO_GROUP_ITEM = "aspect-square size-5 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,background-color,border-color,box-shadow] outline-none data-[state=checked]:border-primary data-[state=checked]:bg-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40";
export declare const SCROLL_AREA_ROOT = "relative";
export declare const SCROLL_AREA_SCROLLBAR = "flex touch-none p-px transition-colors select-none";
export declare const SLIDER_ROOT = "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col";
export declare const SLIDER_TRACK = "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5";
export declare const SLIDER_RANGE = "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full";
export declare const TOGGLE_GROUP_ROOT = "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs";
export declare const MENU_ROOT = "overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground";
export declare const MENU_SECTION = "border-b border-border px-3 py-2 font-medium text-muted-foreground";
/** Same tint and blur as `DIALOG_OVERLAY`: a confirm sheet and a dialog are one surface to a reader,
 *  and blurring one of them would be the inconsistency this pass exists to remove. */
export declare const ALERT_DIALOG_OVERLAY = "fixed inset-0 z-[80] bg-foreground/25 supports-[backdrop-filter]:backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0";
export declare const ALERT_DIALOG_CONTENT = "group/alert-dialog-content fixed top-[50%] left-[50%] z-[80] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg";
export declare const ALERT_DIALOG_HEADER = "flex flex-col gap-1.5 text-center sm:group-data-[size=default]/alert-dialog-content:text-left";
export declare const ALERT_DIALOG_FOOTER = "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";
export declare const ALERT_DIALOG_TITLE = "text-lg font-semibold";
export declare const ALERT_DIALOG_DESCRIPTION = "text-sm text-muted-foreground";
/** Same tint and blur as `DIALOG_OVERLAY`, for the reason recorded there. */
export declare const SHEET_OVERLAY = "fixed inset-0 z-[60] bg-foreground/25 supports-[backdrop-filter]:backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0";
export declare const SHEET_CONTENT = "fixed z-[60] flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500";
/**
 * Where a sheet sits, per side.
 *
 * These were four literals inside `sheet.tsx`, which is the one place a class string must not live: the
 * HTML edition needs the same geometry and, without this, invented its own (`w-80` against `w-3/4
 * sm:max-w-sm border-l`), so the two editions' sheets were different widths with a missing edge. Found
 * in review of that edition, which is the first consumer outside React.
 */
export declare const SHEET_SIDES: Record<"right" | "left" | "top" | "bottom", string>;
export declare const SHEET_HEADER = "flex flex-col gap-1.5 p-4";
export declare const SHEET_FOOTER = "mt-auto flex flex-col gap-2 p-4";
export declare const SHEET_TITLE = "font-semibold text-foreground";
export declare const SHEET_DESCRIPTION = "text-sm text-muted-foreground";
/**
 * Toggle is a `cva` in React rather than a flat string, so it lifts as a base plus two maps, the
 * same shape `BUTTON_BASE` / `BUTTON_VARIANTS` / `BUTTON_SIZES` already uses. A framework without
 * `cva` composes them by hand and gets the same classes.
 */
export declare const TOGGLE_BASE = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
export declare const TOGGLE_VARIANTS: {
    readonly default: "bg-transparent";
    readonly outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground";
};
export declare const TOGGLE_SIZES: {
    readonly default: "h-9 min-w-9 px-2";
    readonly sm: "h-8 min-w-8 px-1.5";
    readonly lg: "h-10 min-w-10 px-2.5";
};
export type ToggleVariant = keyof typeof TOGGLE_VARIANTS;
export type ToggleSize = keyof typeof TOGGLE_SIZES;
/**
 * Screen-reader-only text, shared by the three families that carry a visually
 * hidden message (`Field`, `PasswordInput`, `BreadcrumbEllipsis`). One constant
 * rather than three, because it is the same idiom in each and there is no
 * per-family decision in it.
 */
export declare const SR_ONLY = "sr-only";
/**
 * Alert is a `cva`, so it lifts as a base plus a variants map, the same shape
 * `BADGE_BASE` / `BADGE_VARIANTS` already uses.
 */
export declare const ALERT_BASE = "relative grid w-full grid-cols-[0_1fr] items-start rounded-xl border p-4 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*6)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-6 [&>svg]:-translate-y-0.5 [&>svg]:text-current";
/**
 * The alert states.
 *
 * **Four states and a neutral, where this carried one state and a neutral until 2026-08-24.** The
 * missing three were not an oversight, they were unthemeable: `success`, `warning` and `info` had no
 * token, so an alert in those colours meant `bg-emerald-50` in the one file every edition renders
 * from. `PD-066` made them tokens and this is the first component to spend them.
 *
 * **Tinted ground, coloured edge, neutral message.** The reference draws all four that way and it is
 * the better reading: the state is carried by the frame and the icon, so the sentence explaining it
 * stays at full contrast. `destructive` used to colour its own description, which made the one alert
 * a reader most needs to parse the hardest to read, and made it the odd one of four.
 */
export declare const ALERT_VARIANTS: {
    readonly default: "bg-card text-card-foreground";
    readonly success: "border-success bg-success/10 [&>svg]:text-success";
    readonly warning: "border-warning bg-warning/10 [&>svg]:text-warning";
    readonly destructive: "border-destructive bg-destructive/10 [&>svg]:text-destructive";
    readonly info: "border-info bg-info/10 [&>svg]:text-info";
};
export type AlertVariant = keyof typeof ALERT_VARIANTS;
export declare const ALERT_TITLE = "col-start-2 mb-1 line-clamp-1 min-h-4 font-semibold tracking-tight";
export declare const ALERT_DESCRIPTION = "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed";
/** Breadcrumb: the composable primitives. `Breadcrumbs` below is the assembled trail. */
export declare const BREADCRUMB_LIST = "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5";
export declare const BREADCRUMB_ITEM = "inline-flex items-center gap-1.5";
export declare const BREADCRUMB_LINK = "transition-colors hover:text-foreground";
export declare const BREADCRUMB_PAGE = "font-normal text-foreground";
export declare const BREADCRUMB_SEPARATOR = "[&>svg]:size-3.5";
export declare const BREADCRUMB_ELLIPSIS = "flex size-9 items-center justify-center";
export declare const BREADCRUMB_ELLIPSIS_ICON = "size-4";
/**
 * Breadcrumbs: the one assembled trail used on every route page and form, a
 * separate family from the primitives above.
 */
export declare const BREADCRUMBS_ROOT = "flex min-w-0 items-center gap-2 text-sm";
export declare const BREADCRUMBS_BACK = "grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
export declare const BREADCRUMBS_BACK_ICON = "size-3.5";
export declare const BREADCRUMBS_NAV = "flex min-w-0 items-center gap-1";
export declare const BREADCRUMBS_CRUMB = "flex min-w-0 items-center gap-1";
export declare const BREADCRUMBS_CURRENT = "truncate font-medium text-foreground";
export declare const BREADCRUMBS_LINK = "shrink-0 text-muted-foreground transition-colors hover:text-foreground";
export declare const BREADCRUMBS_SEPARATOR_ICON = "size-3 shrink-0 text-muted-foreground/60";
/**
 * FieldGrid and Field: the two-column form standard, label in column 1 and the
 * control in column 2. `FIELD_ROW` is `display:contents`, which is what makes a
 * `Field`'s label and control become direct grid cells, so it is a constant
 * rather than inline: a port that forgets it loses the whole layout.
 */
export declare const FIELD_GRID_ROOT = "grid grid-cols-[max-content_1fr] items-center gap-x-4 gap-y-4";
export declare const FIELD_ROW = "contents";
export declare const FIELD_LABEL = "flex items-center gap-1 whitespace-nowrap text-sm font-medium leading-relaxed";
export declare const FIELD_LABEL_MULTILINE = "self-start pt-1.5";
export declare const FIELD_CONTROL = "min-w-0";
export declare const FIELD_CONTROL_INNER = "relative";
/** Leaves room for the error icon so it never overlaps the control's own text. */
export declare const FIELD_ERROR_PAD = "[&_input]:pr-8 [&_textarea]:pr-8";
/** Helper text under the control, hidden while an error shows. */
export declare const FIELD_HINT = "mt-1.5 text-xs text-muted-foreground";
export declare const FIELD_ERROR_ICON = "absolute right-2 text-destructive";
export declare const FIELD_ERROR_ICON_MULTILINE = "top-2.5";
export declare const FIELD_ERROR_ICON_CENTERED = "top-1/2 -translate-y-1/2";
export declare const FIELD_ERROR_ICON_SIZE = "size-4";
export declare const STATUS_FIELD_WRAP = "relative";
/** Room for the icon, so it never sits on top of the value. */
export declare const STATUS_FIELD_PAD = "[&_input]:pr-11 [&_textarea]:pr-11";
export declare const STATUS_FIELD_ICON = "absolute top-1/2 right-4 -translate-y-1/2";
export declare const STATUS_FIELD_ICON_SIZE = "size-5";
export declare const STATUS_FIELD_STATE: {
    readonly error: "border-destructive focus-visible:ring-destructive";
    readonly success: "border-success focus-visible:ring-success";
};
/** The message under the control, for the variant that prints it as well as carrying it on the icon. */
export declare const STATUS_FIELD_MESSAGE = "mt-1.5 text-sm";
export declare const STATUS_FIELD_TONE: {
    readonly error: "text-destructive";
    readonly success: "text-success";
};
/**
 * The required-field asterisk. Drawn as an inline SVG with a `viewBox` and no
 * `width="15"`, so the theme's icon-chip rule does not wrap it.
 */
export declare const REQUIRED_MARK = "size-3.5 shrink-0 self-center text-destructive";
/**
 * Page: the standard frame. A full-height column, a 48px action header, then the
 * single scrolling content region. `PAGE_SCROLL` is the one scroll owner, and
 * nothing inside it should scroll the document.
 */
export declare const PAGE_ROOT = "flex h-full flex-col";
/**
 * The circular chrome the demos' header controls wear.
 *
 * **Shared because two editions draw it** (`Z-14`). It lived in `apps/web/free-react`, and the Vue demo
 * needs the identical control: a 44px circle with a border, which is the shape the reference uses for
 * its theme toggle and its notification bell alike. Ours were `Button variant="outline" size="icon"`,
 * a rounded *square*: the right size and the wrong shape, and the shape is the thing you notice.
 *
 * One string because the toggle and the bell are the same control in that design, and writing it twice
 * is how they stop being.
 */
export declare const HEADER_CONTROL = "relative flex size-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
/**
 * How far a header panel hangs below its trigger, in pixels.
 *
 * The reference hardcodes `mt-[17px]`, which is this sum with their numbers: a 44px control centred in
 * a 76px bar leaves 16px beneath it, and one more clears the bar's bottom border. So a panel starts
 * **on** the header's line rather than partway up it. Written as the arithmetic so it follows the bar.
 */
export declare const HEADER_PANEL_OFFSET: number;
/**
 * A row inside a header panel: the account menu's links and its sign-out.
 *
 * Shared because both editions of the free demo draw it, and it was written out in
 * `account-menu.tsx` as a local `ITEM` while the Vue port was about to type the same forty characters
 * again. It is not `DROPDOWN_ITEM`: that one is the menu primitive's own row, which carries Radix's
 * focus and disabled selectors, and these are plain anchors inside a bare panel.
 */
/**
 * The free demo's sidebar chrome, shared by every edition of it.
 *
 * **Not page content: the shell.** Review found ten of these written byte-identically in
 * `apps/web/free-react/app/shell.tsx` and `apps/web/free-vue/src/AppShell.vue`, which is `PD-048` and
 * `PD-050` in a place the guard could not see, and the reason it matters here is the same reason it
 * mattered there: the six layouts are already shared *data* in `SHELL_LAYOUTS`, so a renderer reading
 * them with its own private measurements is one edit away from two editions showing the same layout
 * differently. Every measurement below came off the reference and is annotated where it was corrected.
 *
 * Page bodies are deliberately **not** hoisted with them. Those match because the pages match, which is
 * what a port is, and moving page composition into a component library to satisfy a duplicate-string
 * check would be the worse codebase. `scripts/check-shared-classes.mjs` says the same in its `EDITIONS`
 * note.
 */
export declare const FREE_NAV_ROW = "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
/**
 * A child row, which is `py-2.5` rather than `py-2` and `relative` for the rule beside it.
 *
 * Selection is the state a sidebar exists to show, so a submenu row gets the same active treatment as
 * a top-level one: a submenu of one is very nearly invisible otherwise, and clicking a group's only
 * child moved the page while looking like nothing had happened.
 */
export declare const FREE_NAV_ROW_CHILD = "relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
/**
 * The inactive row.
 *
 * The reference's is `text-gray-700`, a near-body grey rather than the muted one: at muted the whole
 * menu looked disabled.
 */
export declare const FREE_NAV_IDLE = "text-foreground/75 hover:bg-accent hover:text-foreground";
/**
 * How the current item is marked (`PD-065`).
 *
 * Three, because the reference's six layouts use three: a filled pill, a coloured label on its own, and
 * a rule down the leading edge. They are not interchangeable at a glance, which is the point of
 * offering them: a documentation sidebar of forty links reads very differently with forty possible
 * pills than with one bar.
 *
 * The active state colours the pill, the label **and** the icon. Tinting only the background reads as a
 * hover that stuck.
 */
export declare const FREE_ACTIVE_MARK: {
    readonly pill: "bg-primary/10 text-primary";
    readonly text: "text-primary";
    readonly "left-bar": "rounded-none border-l-2 border-primary text-primary";
};
/**
 * The `NEW` pill a sidebar row can carry beside its label.
 *
 * Its own constant rather than the `Badge` component, because a nav row is a `Link` whose whole
 * surface is the click target: a `Badge` inside one is a second element with its own padding and
 * line-height fighting the row's, and the reference's is a flat 12px pill with no border. Shared so
 * every edition's shell draws the same mark from one string.
 */
export declare const FREE_NAV_BADGE = "ms-auto rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium leading-4 text-success";
/**
 * A dashboard card's title **in the VuiAdmin style** (`PD-207`).
 *
 * **The prefix is the point.** `CARD_TITLE` above sets weight and no size, and that is the design
 * system's own look, which `apps/web/reactjs` renders. VuiAdmin puts a size and a heavier weight on
 * top, and that addition *is* the style rather than a correction to the shared one. Naming this
 * `DASHBOARD_CARD_TITLE` claimed it was universal, which would have made the next style unable to
 * disagree with it without editing a constant three other apps read.
 *
 * It exists at all because the string was written four times: `free-react/app/dashboard/charts.tsx`,
 * `free-vue/src/dashboard/Panel.vue`, `free-angular/src/dashboard/panel.ts`, and `pro-react` was
 * about to be the fourth. `FT-020` forbids a class string written in two editions. The **edition**
 * axis is what that rule is about, and the **style** axis is what this prefix is about: one string,
 * five frameworks, one style.
 *
 * `bold` rather than `semibold` because the three editions' dashboard panels already agree on it,
 * and `charts.tsx` says why: the reference's card titles are larger **and** heavier than the body.
 */
export declare const FREE_DASHBOARD_CARD_TITLE = "text-lg font-bold";
/** 16px between rows. At `space-y-0.5` the sidebar read as a different product: dense where the reference breathes. */
export declare const FREE_NAV_LIST = "flex flex-col gap-4";
/** A submenu's own list, indented past the parent's icon. */
/**
 * The collapsing submenu panel, animated by CSS rather than measured by JavaScript.
 *
 * **Both editions used to measure `scrollHeight` in an effect and animate `height`.** That works
 * once a framework is running and is invisible to anything that is not: the server renders
 * `height: 0px`, React corrects it on hydration, and a static export never hydrates. The HTML
 * edition therefore shipped with **every submenu permanently shut**, which put the whole sidebar
 * 312px short and moved every element on every page with it. One cause, 116 reported differences on
 * `/avatars` alone (`PD-141`).
 *
 * `grid-template-rows: 0fr` to `1fr` is the framework-free way to animate to content height. There is
 * nothing to measure, so the open state is correct in the very first byte of HTML, and it deletes a
 * `useState`, a `useEffect`, a ref and a `ResizeObserver` from each edition. It also removes a flash
 * the reference itself had: before hydration its open groups rendered shut.
 *
 * The inner element does the clipping, because a grid item cannot be clipped by its own track.
 */
export declare const FREE_SUBMENU_BOX = "grid transition-[grid-template-rows] duration-300 ease-in-out";
export declare const FREE_SUBMENU_BOX_OPEN = "grid-rows-[1fr]";
export declare const FREE_SUBMENU_BOX_SHUT = "grid-rows-[0fr]";
export declare const FREE_SUBMENU_CLIP = "overflow-hidden";
export declare const FREE_SUBMENU_LIST = "mt-2 ml-9 flex flex-col gap-1";
/** The hairline down a submenu's leading edge, at the icon column. */
export declare const FREE_SUBMENU_RULE = "absolute inset-y-0 left-6 w-px bg-border";
/**
 * A dropdown trigger that is **not** a toolbar button: a header bell, an avatar row.
 *
 * `bare` says "no chrome"; it does not say "no layout". React's had `gap-2` baked into the bare arm
 * and Vue's applied only the caller's class, so the account menu came out **16px narrower** in one
 * edition and the whole header cluster sat off by that much. Neither `check:shared-classes` nor any
 * count could see it, because the string existed in one edition and simply was not written in the
 * other; the layout comparison in `check:parity` is what found it (`PD-126`).
 */
export declare const DROPDOWN_TRIGGER_BARE = "flex cursor-pointer items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring";
/**
 * The route-change progress bar: the track it lives in, and the bar itself (`PD-125`).
 *
 * **Every edition draws this, so it is here rather than in an app.** The wiring differs per framework
 * because each router announces navigation differently, but the thing a reader sees must not.
 *
 * `z-[300]` puts it above every overlay in the scale, which is correct and unusual: a dialog can be
 * open when a navigation starts, and a progress bar hidden behind the thing you were just using is
 * not a progress bar. `pointer-events-none` because it is a readout and never a target.
 *
 * `origin-left` with a `scaleX` animation rather than an animated `width`: transform is composited and
 * width is not, so on a page mid-navigation, which is the only time this is visible, one of them costs
 * a layout pass per frame and the other does not.
 */
export declare const ROUTE_PROGRESS_TRACK = "pointer-events-none fixed inset-x-0 top-0 z-[300] h-0.5";
export declare const ROUTE_PROGRESS_BAR = "h-full w-full origin-left bg-primary";
/**
 * The profile page's bordered pill, and its read-only field label.
 *
 * Both editions draw this page, so both read these. The label was already two copies in the reference
 * before it became a constant there, and they had drifted: one carried no weight at all, so it
 * inherited 400 and read lighter than the 500 the design asks for. Two copies of one style is how the
 * next difference gets in.
 */
export declare const PROFILE_PILL = "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground lg:w-auto";
export declare const PROFILE_FIELD_LABEL = "mb-2 text-sm font-medium text-muted-foreground";
/** A profile card, at the reference's measurements. */
export declare const PROFILE_CARD = "rounded-2xl border border-border p-5 lg:p-6";
/**
 * The five tints a monogram cycles through in a table.
 *
 * Every one is a state token at a tenth, not a palette colour, so a rethemed product recolours its
 * avatars with everything else. Five because a sixth row should repeat rather than reach for a hue the
 * theme does not name.
 */
export declare const DEMO_TINTS: readonly ["bg-primary/10 text-primary", "bg-destructive/10 text-destructive", "bg-info/10 text-info", "bg-warning/10 text-warning", "bg-success/10 text-success"];
/**
 * The page header: its title and its breadcrumb.
 *
 * Chrome, shared for the reason `PD-106` gives. `check:parity` found the two editions disagreeing
 * about all of it: the title's tracking, the list's gap, whether the chevron sits inside the Home link
 * or in a list item of its own, and whether the current page is marked `aria-current`. None of that is
 * visible in a screenshot and all of it is the difference between one product and two.
 */
export declare const FREE_PAGE_TITLE = "text-xl font-semibold";
export declare const FREE_CRUMB_LIST = "flex items-center gap-1.5";
export declare const FREE_CRUMB_LINK = "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground";
export declare const FREE_CRUMB_CURRENT = "text-sm text-foreground";
/**
 * The rail's flyout panel, and the group name at the top of it.
 *
 * Chrome, so it is shared for the reason `PD-106` gives: both editions draw this exact panel, and the
 * guard cannot see class strings inside an app. The heading is not decoration. In a rail the icon is
 * the only label a reader has, so a panel that opened with just a list of children left them guessing
 * which group they had hit.
 */
export declare const FREE_FLYOUT_PANEL = "min-w-[220px] p-2";
export declare const FREE_FLYOUT_HEADING = "px-3 pt-1 pb-2 text-xs font-semibold text-muted-foreground";
/** Collapsed, the sidebar is icons only. Measured from the reference at 90px. */
export declare const FREE_RAIL_WIDTH = 90;
export declare const MENU_ROW = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground";
export declare const PAGE_HEADER = "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-4";
export declare const PAGE_ACTIONS = "ml-auto flex items-center gap-2";
/**
 * The page's scrolling region.
 *
 * **`relative` is load-bearing, and it is not about positioning anything.** `overflow-y-auto` clips
 * a child's *painting*, but it does not make this element a containing block, so a descendant with
 * `position: absolute` and no offsets resolves against the initial containing block instead: it
 * keeps its static position, escapes the clip, and stretches `documentElement.scrollHeight` past the
 * viewport. The whole app then scrolls behind a shell that is exactly one viewport tall, which reads
 * as a band of empty background under the footer.
 *
 * That is not hypothetical. `sr-only` is `position: absolute`, so **every visually-hidden input in
 * the package** was doing it. The dropzone's file input, 1px tall and 1329px down the page, was
 * measured making the document 1330px in a 900px viewport. Fixing it here rather than at each call
 * site is the difference between one rule and one rule per hidden input, forever.
 */
export declare const PAGE_SCROLL = "relative min-h-0 flex-1 overflow-y-auto";
/**
 * A page's content region.
 *
 * **Centred, with a ceiling.** It was a flat `p-4` with no max width, so on a 2560px monitor a
 * dashboard spanned the whole screen and a line of body text ran further than an eye tracks
 * comfortably. The reference wraps its pages in `p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6`: 24px
 * of padding from `md` and a 1536px ceiling, which is the difference between an application and a
 * page that happens to fill the window.
 *
 * `gap-4` stays, because pages here separate their sections with it rather than with a margin on
 * each one.
 */
export declare const PAGE_CONTENT = "mx-auto flex w-full max-w-[1536px] flex-col gap-4 p-4 md:p-6";
/**
 * Steps: a marker and a connector, each with a per-state class set rather than a
 * single string, which is the same base-plus-map shape `TOGGLE_*` uses. A
 * framework without `cva` composes them by hand and gets the same classes.
 */
export type StepState = "complete" | "current" | "upcoming";
export declare const STEPS_ROOT = "flex items-start";
export declare const STEPS_ITEM = "flex flex-col items-center gap-2 text-center";
export declare const STEPS_MARKER_BASE = "grid size-8 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold transition-colors";
export declare const STEPS_MARKER_STATES: Record<StepState, string>;
export declare const STEPS_CHECK_ICON = "size-4";
export declare const STEPS_LABEL_GROUP = "flex flex-col gap-0.5";
export declare const STEPS_LABEL_BASE = "text-sm font-medium leading-none";
export declare const STEPS_LABEL_STATES: Record<StepState, string>;
export declare const STEPS_DESCRIPTION = "text-xs text-muted-foreground";
export declare const STEPS_CONNECTOR_BASE = "mt-4 h-0.5 min-w-6 flex-1 rounded-full transition-colors";
/** Keyed by whether the step before the connector is done, not by step state. */
export declare const STEPS_CONNECTOR_STATES: {
    readonly done: "bg-[var(--button-primary)]";
    readonly todo: "bg-border";
};
/**
 * PasswordInput: the asterisk overlay, the error icon and the reveal toggle. The
 * overlay is drawn over a transparent input, so `PASSWORD_INPUT_HIDDEN` keeps
 * the caret visible while hiding the characters.
 */
export declare const PASSWORD_INPUT_ROOT = "relative";
export declare const PASSWORD_INPUT_PAD = "pr-9";
/** Wider padding when the error icon sits to the left of the reveal button. */
export declare const PASSWORD_INPUT_PAD_INVALID = "pr-16";
export declare const PASSWORD_INPUT_ASTERISK = "font-mono";
export declare const PASSWORD_INPUT_HIDDEN = "text-transparent caret-foreground selection:bg-transparent";
export declare const PASSWORD_INPUT_OVERLAY = "pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-pre px-4 font-mono text-sm text-foreground";
export declare const PASSWORD_INPUT_ERROR_ICON = "absolute right-9 top-1/2 -translate-y-1/2 text-destructive";
export declare const PASSWORD_INPUT_ICON = "size-4";
export declare const PASSWORD_INPUT_TOGGLE = "absolute inset-y-0 right-0 flex items-center px-2.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none";
/**
 * ConfirmDialog is the shared Dialog at one width, so only three strings are its own.
 */
export declare const CONFIRM_DIALOG_PANEL = "max-w-sm";
export declare const CONFIRM_DIALOG_DESCRIPTION = "text-muted-foreground";
/** A destructive confirm button's icon border, so the glyph reads on a red fill. */
export declare const CONFIRM_DIALOG_DESTRUCTIVE_ICON = "[&_svg]:border-white/30";
/**
 * FilterGrid and FilterField: the filter panel's two-column standard. The same `display:contents`
 * trick `FIELD_ROW` uses, and load-bearing for the same reason: without it the label and control
 * stop being the grid's own cells and nothing lines up across rows.
 */
export declare const FILTER_GRID_ROOT = "grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-3";
export declare const FILTER_ROW = "contents";
export declare const FILTER_LABEL = "whitespace-nowrap text-xs font-medium text-muted-foreground";
export declare const FILTER_CONTROL = "min-w-0";
/**
 * InputOTP: a row of single-character cells that reads as one field. The borders are shared between
 * neighbours (`border-y border-r` plus `first:border-l`), which is why the first and last cells
 * round only their outer corners.
 */
export declare const INPUT_OTP_CONTAINER = "flex items-center gap-2 has-disabled:opacity-50";
export declare const INPUT_OTP_INPUT = "disabled:cursor-not-allowed";
export declare const INPUT_OTP_GROUP = "flex items-center";
export declare const INPUT_OTP_SLOT = "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40";
export declare const INPUT_OTP_CARET_WRAP = "pointer-events-none absolute inset-0 flex items-center justify-center";
export declare const INPUT_OTP_CARET = "h-4 w-px animate-caret-blink bg-foreground duration-1000";
/**
 * Toast: the card, and the region it stacks in.
 *
 * `TOAST_REGION` sits at `z-[250]`, the top of the z-scale, because a toast that reports the outcome
 * of an action taken inside a dialog has to be visible above that dialog. `pointer-events-none` on
 * the region with `pointer-events-auto` on the card is what stops the empty column swallowing clicks
 * on the page beneath it.
 */
export declare const TOAST_REGION = "pointer-events-none fixed inset-x-0 bottom-0 z-[250] flex flex-col items-end gap-2 p-4 sm:left-auto sm:right-0 sm:max-w-sm";
export declare const TOAST_CARD = "vui-toast-in pointer-events-auto flex w-full items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-lg";
export declare const TOAST_ICON = "mt-0.5 size-5 shrink-0";
/** Keyed by variant, and `default` renders no icon at all, so its entry is empty by design. */
export declare const TOAST_ICON_STATES: {
    readonly default: "";
    readonly success: "text-success";
    readonly error: "text-destructive";
    readonly warning: "text-warning";
};
export type ToastIconVariant = keyof typeof TOAST_ICON_STATES;
export declare const TOAST_BODY = "min-w-0 flex-1";
export declare const TOAST_TITLE = "text-sm font-semibold text-foreground";
export declare const TOAST_DESCRIPTION = "mt-0.5 text-sm text-muted-foreground";
export declare const TOAST_ACTION = "shrink-0 rounded-md border border-border px-2.5 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";
export declare const TOAST_DISMISS = "shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
export declare const TOAST_DISMISS_ICON = "size-4";
/** Form (the field wrapper): four strings, and the label's is a variant rather than a base. */
export declare const FORM_ITEM = "grid gap-2";
export declare const FORM_LABEL_ERROR = "data-[error=true]:text-destructive";
export declare const FORM_DESCRIPTION = "text-sm text-muted-foreground";
export declare const FORM_MESSAGE = "text-sm text-destructive";
/** FormActions: the footer that holds a record's save and cancel row. */
export declare const FORM_ACTION_ICON = "size-4";
export declare const FORM_FOOTER = "ml-auto flex items-center gap-2";
/**
 * Command: the filtered list behind a palette.
 *
 * **`COMMAND_GROUP` selects on `[cmdk-group-heading]`**, an attribute React's `cmdk` puts on the
 * heading element. A port on a different primitive has to emit that attribute or the four variants
 * here do nothing, which is the general rule in `D23` of the Vue parity spec: **a shared class string
 * that selects on a library's attribute is only shared if every edition emits the attribute.**
 */
export declare const COMMAND_ROOT = "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground";
export declare const COMMAND_INPUT_ROW = "flex h-9 items-center gap-2 border-b px-3";
export declare const COMMAND_INPUT_ICON = "size-4 shrink-0 opacity-50";
export declare const COMMAND_INPUT = "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
export declare const COMMAND_LIST = "relative max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto";
export declare const COMMAND_EMPTY = "py-6 text-center text-sm";
export declare const COMMAND_GROUP = "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";
export declare const COMMAND_SEPARATOR = "-mx-1 h-px bg-border";
/**
 * **This string carries two vocabularies for one state, and that is the fix rather than a smell.**
 * `cmdk` marks the highlighted row `data-selected="true"` and the inert one `data-disabled="true"`;
 * Reka marks them with a bare `data-highlighted` and an empty-string `data-disabled`. Emitting the
 * other library's attribute from the port was the alternative, and it cannot work here: the variant
 * has to match the element the class is on, and only the primitive knows which row is highlighted. So
 * the string accepts both, each edition matches its own, and the pairs that never match cost nothing.
 *
 * **`data-[disabled='']` is quoted deliberately, and the unquoted form was a real bug.** Tailwind
 * compiles a bare `data-[disabled]` to an existence selector, and `cmdk` stamps `data-disabled="false"`
 * on every row that is not disabled, so the unquoted variant matched all of them: every React command
 * row rendered at half opacity with pointer events off. Matching the empty string hits Reka's value
 * and nothing of cmdk's.
 */
export declare const COMMAND_ITEM = "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[disabled='']:pointer-events-none data-[disabled='']:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";
export declare const COMMAND_SHORTCUT = "ml-auto text-xs tracking-widest text-muted-foreground";
/**
 * CommandPalette: the Cmd+K surface. It is its own component rather than `Command` in a dialog, and
 * it depends on no command library at all, which is why it ports before `command` does.
 */
export declare const PALETTE_OVERLAY = "fixed inset-0 z-[100] flex items-start justify-center bg-foreground/25 p-4 pt-[12vh]";
export declare const PALETTE_PANEL = "vui-pop-in flex max-h-[70vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl";
export declare const PALETTE_SEARCH_ROW = "flex shrink-0 items-center gap-2 border-b border-border px-3";
export declare const PALETTE_SEARCH_ICON = "shrink-0";
export declare const PALETTE_INPUT = "h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground";
export declare const PALETTE_LIST = "relative min-h-0 flex-1 overflow-y-auto p-1.5";
export declare const PALETTE_EMPTY = "px-3 py-8 text-center text-sm text-muted-foreground";
export declare const PALETTE_GROUP = "mb-1 last:mb-0";
export declare const PALETTE_GROUP_LABEL = "px-2 py-1 text-xs font-medium text-muted-foreground";
export declare const PALETTE_ITEM = "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors data-[active=true]:bg-accent data-[active=true]:text-accent-foreground";
export declare const PALETTE_ITEM_ICON = "size-4 shrink-0";
export declare const PALETTE_ITEM_LABEL = "flex-1 truncate";
export declare const PALETTE_ITEM_HINT = "size-4 shrink-0 text-muted-foreground";
/**
 * Calendar.
 *
 * The selected day is `primary`, which is the brand since `PD-072`. It rendered charcoal for as
 * long as that token was a near-black ink: the one element on a calendar whose job is to say "your
 * product's colour" was the one that did not.
 *
 * **`CALENDAR_DAY` answers to both vocabularies.** It was written against `react-day-picker`'s
 * attributes, and `RangeCalendar.vue` renders on Reka, which spells the same three states
 * `data-selection-start`, `data-selected` and `data-selection-end`. Reka sets those on the element
 * itself and exposes only `dayValue` to the slot, so a port cannot translate them the way
 * `Calendar.vue` translates `data-selected-single`. Carrying both sets here is what keeps one string
 * dressing both primitives, which is the whole point of the file (`PD-127`). The order matters:
 * `data-[selected]` is the middle of a range and comes **before** the two ends, so an end wins.
 *
 * Originally: `CALENDAR_DAY` selects on `react-day-picker`'s attributes (`data-[range-start]`,
 * `data-[selected-single]`, `group-data-[focused=true]/day`). Per `D23`, a port on another primitive
 * emits those same attributes rather than inventing its own, or every state in this string is dead.
 */
export declare const CALENDAR_ROOT = "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent";
export declare const CALENDAR_NAV_ICON = "size-4";
export declare const CALENDAR_WEEKDAY = "flex size-(--cell-size) items-center justify-center text-center";
export declare const CALENDAR_DAY = "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selection-end]:rounded-md data-[selection-end]:rounded-r-md data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-start]:rounded-md data-[selection-start]:rounded-l-md data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selected]:rounded-none data-[selected]:bg-accent data-[selected]:text-accent-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70";
/**
 * The picker surface shared by Combobox and MultiCombobox.
 *
 * **These eleven strings were byte-identical in both React files**, which the wave 4 lift found by
 * extracting them. Two copies of a class string is the fork a shared source exists to prevent, and it
 * had already happened inside one edition.
 */
export declare const PICKER_ANCHOR = "relative";
export declare const PICKER_PANEL = "vui-pop-in z-[200] flex flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md";
export declare const PICKER_SEARCH_ROW = "relative border-b border-border p-1.5";
export declare const PICKER_SEARCH_ICON = "pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground";
export declare const PICKER_SEARCH_INPUT = "h-8 w-full rounded-sm bg-transparent pl-8 pr-2 text-sm outline-none placeholder:text-muted-foreground";
export declare const PICKER_SPINNER = "absolute right-3 top-1/2 size-3.5 -translate-y-1/2 animate-spin text-muted-foreground";
export declare const PICKER_LIST = "relative overflow-auto";
export declare const PICKER_EMPTY = "px-3 py-6 text-center text-sm text-muted-foreground";
export declare const PICKER_ERROR = "w-full px-3 py-6 text-center text-sm text-destructive hover:underline";
export declare const PICKER_OPTION = "flex w-full items-center justify-between gap-2 border-b border-border px-3 py-2 text-left last:border-b-0";
export declare const PICKER_OPTION_LABEL = "truncate";
export declare const PICKER_OPTION_CHECK = "size-3.5 shrink-0 text-[var(--button-primary)]";
/** Combobox: the single-select trigger. The panel below it is the shared `PICKER_*` set. */
/**
 * The searchable trigger. **The hover, focus and disabled halves used to be typed inline in
 * `combobox.tsx` on top of this constant**, so every port that read the constant rendered a trigger
 * with no focus ring and no disabled state — invisible to a parity test, because the test compares the
 * port against the constant rather than against React. Same for `MULTI_COMBOBOX_TRIGGER`.
 */
export declare const COMBOBOX_TRIGGER: string;
export declare const COMBOBOX_SKELETON = "h-4 w-24";
export declare const COMBOBOX_VALUE = "truncate";
export declare const COMBOBOX_CHEVRON = "size-3.5 shrink-0 text-muted-foreground transition-transform";
/** MultiCombobox: the same panel, a taller trigger, and a tag per selected value. */
export declare const MULTI_COMBOBOX_TRIGGER: string;
/**
 * A multi-select that failed its rules. The border carries it, as everywhere else, and this is a
 * variant rather than an inline ternary so the Vue edition can express the failing state at all: it
 * could not, and a required multi-select looked untouched while Save was blocked.
 */
export declare const MULTI_COMBOBOX_STATES: {
    readonly invalid: "border-destructive focus-visible:ring-destructive";
    readonly valid: "border-input";
};
export declare const MULTI_COMBOBOX_TAGS = "flex flex-1 flex-wrap items-center gap-1";
export declare const MULTI_COMBOBOX_PLACEHOLDER = "text-muted-foreground";
export declare const MULTI_COMBOBOX_TAG = "inline-flex max-w-[12rem] items-center gap-1 rounded-sm bg-accent px-1.5 py-0.5 text-xs text-accent-foreground";
export declare const MULTI_COMBOBOX_TAG_LABEL = "truncate";
export declare const MULTI_COMBOBOX_SKELETON = "h-3 w-14";
export declare const MULTI_COMBOBOX_TAG_REMOVE = "grid size-3.5 shrink-0 place-items-center rounded-sm text-muted-foreground hover:bg-background hover:text-foreground";
export declare const MULTI_COMBOBOX_TAG_REMOVE_ICON = "size-3";
export declare const MULTI_COMBOBOX_CHEVRON = "size-3.5 shrink-0 self-start text-muted-foreground transition-transform";
/** CascadingCombobox: a labelled column per level, each holding a Combobox. */
export declare const CASCADE_LEVEL = "flex flex-col gap-1";
export declare const CASCADE_LEVEL_LABEL = "text-xs font-medium text-muted-foreground";
/** The cascade's own layout, which the wave 4 lift missed on its first pass. */
export declare const CASCADE_ROOT_STACKED = "flex flex-col gap-3";
export declare const CASCADE_ROOT_ROW = "flex flex-wrap gap-3";
export declare const CASCADE_LEVEL_IN_ROW = "min-w-40 flex-1";
/** The form footer's bar, which the wave 4 lift missed because it is a prop default. */
export declare const FORM_FOOTER_BAR = "flex shrink-0 items-center gap-2 border-y border-border bg-muted/40 px-4 py-3";
/** Wizard: the stepped shell, and its review step's grouped summary. */
export declare const WIZARD_ROOT = "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card";
export declare const WIZARD_HEADER = "shrink-0 border-b border-border p-4 md:p-6";
export declare const WIZARD_BODY = "relative min-h-0 flex-1 overflow-y-auto p-4 md:p-6";
export declare const WIZARD_BODY_STACK = "space-y-4";
export declare const WIZARD_FOOTER = "flex shrink-0 items-center justify-between border-t border-border bg-muted/40 px-4 py-3";
export declare const WIZARD_NAV_ICON = "size-4";
export declare const WIZARD_REVIEW_GROUP = "overflow-hidden rounded-lg border border-border";
export declare const WIZARD_REVIEW_HEADER = "border-b border-border bg-muted/40 px-3 py-2";
export declare const WIZARD_REVIEW_TITLE = "flex items-center gap-2 font-semibold text-[var(--button-primary)]";
export declare const WIZARD_REVIEW_ICON = "size-4 text-[var(--button-primary)]";
export declare const WIZARD_REVIEW_HINT = "text-sm text-muted-foreground";
export declare const WIZARD_REVIEW_BODY = "p-4";
/** OrgSwitcher: the trigger, the panel and one row per organization. */
export declare const ORG_AVATAR_EMPTY = "grid size-9 shrink-0 place-items-center rounded-md border border-dashed border-border";
export declare const ORG_AVATAR_ICON = "size-4";
export declare const ORG_AVATAR_LABEL = "truncate";
export declare const ORG_AVATAR_IMAGE = "size-full object-contain";
export declare const ORG_TRIGGER = "flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors";
export declare const ORG_TRIGGER_TEXT = "min-w-0 flex-1";
export declare const ORG_TRIGGER_NAME = "block truncate text-lg font-bold leading-tight tracking-tight text-foreground";
export declare const ORG_TRIGGER_META = "block h-4 truncate text-xs leading-tight text-muted-foreground";
export declare const ORG_TRIGGER_SKELETON = "inline-block h-3 w-20 animate-pulse rounded bg-muted align-middle";
export declare const ORG_TRIGGER_CHEVRON = "size-4 shrink-0 text-muted-foreground transition-transform";
export declare const ORG_PANEL = "w-72 p-0";
export declare const ORG_PANEL_LABEL = "px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground";
export declare const ORG_LIST = "relative max-h-72 overflow-y-auto p-1.5";
export declare const ORG_ITEM = "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent disabled:opacity-60";
export declare const ORG_ITEM_TEXT = "min-w-0 flex-1";
export declare const ORG_ITEM_ROW = "flex items-center gap-2";
export declare const ORG_ITEM_NAME = "truncate font-semibold";
export declare const ORG_ITEM_BADGE = "shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground";
export declare const ORG_ITEM_META = "mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground";
export declare const ORG_ITEM_META_ICON = "size-3.5";
export declare const ORG_ITEM_HINT = "shrink-0 text-xs text-muted-foreground";
export declare const ORG_SEPARATOR = "h-px bg-border";
export declare const ORG_FOOTER = "p-1.5";
/** The organization mark and the add row, which the first wave 6 pass missed: one was a local const. */
export declare const ORG_MARK = "grid size-9 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted/40 text-sm font-semibold text-[var(--button-primary)]";
export declare const ORG_ADD_ROW = "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
/** The trigger's states. Open reads as held, so the panel obviously belongs to this control. */
export declare const ORG_TRIGGER_STATES: {
    readonly open: "bg-accent";
    readonly closed: "hover:bg-sidebar-accent";
};
export declare const ORG_TRIGGER_COLLAPSED = "w-9 shrink-0 justify-center px-0";
export declare const ORG_TRIGGER_EXPANDED = "flex-1";
export declare const ORG_TRIGGER_CHEVRON_OPEN = "rotate-180";
/**
 * The plan-status glyph's colour, keyed by status, the same base-plus-map shape `TOAST_ICON_STATES`
 * uses. It stayed inline in React's `PLAN_ICON` at first, which meant the Vue edition **could not
 * express any of these four colours**: a host filling the slot would have had to paste the colour into
 * its own template, which is the one thing the shared source exists to prevent.
 */
export declare const ORG_PLAN_STATUS_STATES: {
    readonly active: "text-success";
    readonly trialing: "text-warning";
    readonly past_due: "text-destructive";
    readonly canceled: "text-muted-foreground";
};
export type OrgPlanStatus = keyof typeof ORG_PLAN_STATUS_STATES;
/**
 * The skeleton block. **It was typed into both editions**, which is the thing this file exists to
 * prevent: `skeleton.tsx` and `Skeleton.vue` each carried the same three utilities inline, so a change
 * to the pulse or the radius would have moved one and not the other. Found while porting the record
 * workflow, whose two resolving states are skeletons.
 */
export declare const SKELETON = "animate-pulse rounded-md bg-accent";
/**
 * The profile page's loading state: the title bar's height, then one card-sized pulse. Deliberately not
 * a field-by-field impression of the form, which reads as a form that has arrived wrong.
 */
export declare const PROFILE_SKELETON_ROOT = "flex h-full flex-col";
export declare const PROFILE_SKELETON_BAR = "h-12 shrink-0 border-b border-border";
export declare const PROFILE_SKELETON_BODY = "min-h-0 flex-1 p-4";
export declare const PROFILE_SKELETON_CARD = "h-full animate-pulse rounded-lg border border-border bg-muted/30";
/**
 * A row of sections. How many share the row is what sets each card's width, so nothing needs
 * spanning: one section on a row fills it. Rows collapse to a single column on small screens, and
 * three step through two on the way down. More than three wrap within the row rather than shrinking
 * past readable.
 */
export declare const RECORD_ROW_GRID: {
    readonly 1: "grid grid-cols-1";
    readonly 2: "grid grid-cols-1 items-start gap-5 md:grid-cols-2";
    readonly 3: "grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3";
};
/**
 * Every section card is the same two columns: `[i] Label *` and the control, one field per row. The
 * label track is `max-content`, so it widens to the longest label in the card and never wraps, and
 * every control in that card starts at the same x. A form is made wider by putting cards side by side
 * (a row of sections), never by cramming more fields into a row.
 */
export declare const RECORD_FIELD_GRID = "grid-cols-[max-content_minmax(14rem,1fr)]";
/**
 * Hairlines between the two columns and between the rows. Lighter than the card's own border: enough
 * to read the grid, not enough to draw the eye.
 */
export declare const RECORD_RULE = "border-border/50";
/** Nothing to show: an empty value, or a reference whose label never resolved. Both read the same. */
export declare const RECORD_MISSING = "text-muted-foreground";
/** A `multiple` field's read display: one chip per resolved label, then `+N`. */
export declare const RECORD_CHIP_ROW = "flex flex-wrap items-center gap-1";
export declare const RECORD_CHIP = "inline-flex max-w-[10rem] items-center truncate rounded-sm bg-accent px-1.5 py-0.5 text-xs text-accent-foreground";
export declare const RECORD_CHIP_MORE = "inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-xs text-muted-foreground";
/**
 * The two skeletons a resolving value shows. Sized to the text they replace, so the row does not
 * change height when the label lands: one value, or a line of chips.
 */
export declare const RECORD_VALUE_SKELETON = "h-4 w-24";
export declare const RECORD_CHIPS_SKELETON = "h-4 w-32";
/**
 * The text input. **It had been typed into both editions since wave 2**, which is what this file
 * exists to prevent, and was found while porting the record form. The invalid state is a variant
 * rather than a computed class on purpose: `[aria-invalid]` out-specifies the base border, so a
 * control turns red by setting an attribute assistive tech already reads.
 */
/**
 * The text field, on the **44px scale**.
 *
 * It was `h-8` with `px-2.5 py-1` at `rounded-md`, a 32px control, and the reference's is `h-11
 * px-4 py-2.5` at `rounded-lg`. Twelve pixels does not sound like a design decision until a form is
 * sitting next to a 44px header control and a 44px button and reading as three different products.
 *
 * A field is where a person types, so it is the last place to save space, and `data-density`
 * ("compact" in `theme.css`) is the axis that exists for a screen that genuinely needs dense rows.
 * The comfortable size is the default and the dense one is opt-in, which is the right way round.
 *
 * `SELECT_TRIGGER`, `TEXTAREA_BASE` and `BUTTON_SIZES.lg` follow it, or a select beside an input and
 * a submit under both would each sit at a different height.
 */
export declare const INPUT: string;
/**
 * The record form's chrome, lifted out of `record-form.tsx` on 2026-08-20 so the Vue edition renders
 * the same form rather than a second one that looks like it. The layout rules the strings encode are
 * documented where they are used; what matters here is that there is one copy.
 */
export declare const FORM_SECTION = "overflow-hidden rounded-lg border border-border";
export declare const FORM_SECTION_TITLE = "border-b border-border bg-muted/40 px-4 py-2.5 font-semibold text-[var(--button-primary)]";
export declare const FORM_SECTION_DESC = "border-b border-border px-4 py-2.5 text-muted-foreground";
export declare const FORM_FIELD_LABEL = "flex items-center gap-2 whitespace-nowrap border-r py-3.5 pl-4 pr-4 text-muted-foreground";
export declare const FORM_FIELD_ICON = "size-3.5 text-[var(--button-primary)]";
export declare const FORM_FIELD_CONTROL = "flex min-w-0 items-center py-3.5 pl-4 pr-4";
export declare const FORM_CHECKBOX_ROW = "flex h-8 items-center gap-2";
export declare const FORM_CHECKBOX = "size-4 accent-[var(--button-primary)]";
export declare const FORM_CHECKBOX_TEXT = "text-sm text-muted-foreground";
export declare const FORM_READ_VALUE = "block whitespace-pre-wrap break-words px-2 py-1.5";
export declare const FORM_ERROR_TEXT = "mt-1 text-xs text-destructive";
export declare const FORM_DOC_PANEL = "relative hidden w-80 shrink-0 overflow-y-auto rounded-lg border border-border bg-muted/20 lg:block";
export declare const FORM_DOC_BODY = "space-y-4 p-4 text-sm";
export declare const FORM_DOC_INTRO = "space-y-1.5";
export declare const FORM_DOC_TITLE = "flex items-center gap-1.5 font-semibold text-[var(--button-primary)]";
export declare const FORM_DOC_ICON = "size-4 text-[var(--button-primary)]";
export declare const FORM_DOC_TEXT = "leading-relaxed text-muted-foreground";
export declare const FORM_DOC_LIST = "divide-y divide-border border-t border-border";
export declare const FORM_DOC_ITEM = "space-y-0.5 py-3 first:pt-4";
export declare const FORM_DOC_TERM = "font-medium text-foreground";
export declare const FORM_PAGE = "flex h-full flex-col";
export declare const FORM_PAGE_BAR = "flex h-12 shrink-0 items-center border-b border-border px-4";
export declare const FORM_PAGE_MAIN = "min-h-0 flex-1 overflow-hidden p-4";
export declare const FORM_PAGE_ROW = "flex h-full gap-4";
export declare const FORM_PAGE_CARD = "flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card";
export declare const FORM_PAGE_SCROLL = "relative vui-scroll min-h-0 flex-1 overflow-y-auto p-4 md:p-6";
export declare const FORM_PAGE_WIDTH = "mx-auto w-full max-w-5xl";
export declare const FORM_PANEL_HEADER = "flex h-12 shrink-0 items-center gap-2 border-b border-border px-4";
export declare const FORM_PANEL_ICON_CHIP = "flex size-6 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground";
export declare const FORM_PANEL_BODY = "relative vui-scroll min-h-0 flex-1 overflow-y-auto p-4";
export declare const FORM_FIELD_ROW = "col-span-2 grid grid-cols-subgrid items-stretch border-t leading-relaxed first:border-t-0";
export declare const FORM_SLOT_ROW = "col-span-2 border-t px-4 py-3.5 leading-relaxed";
export declare const FORM_FIELD_INFO = "size-3.5 shrink-0 cursor-help";
export declare const FORM_BACKDROP = "fixed inset-0 z-[55] bg-foreground/25";
export declare const FORM_PANEL = "fixed inset-y-0 right-0 z-[60] flex w-full flex-col border-l border-border bg-background shadow-xl sm:w-auto sm:min-w-[420px] sm:max-w-[90vw]";
export declare const FORM_TEXTAREA = "w-full resize-none rounded-sm border bg-background px-2 py-1.5 outline-none [field-sizing:content] placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-inset";
/** Bounds a control to its cell rather than to its content. */
export declare const FORM_CONTROL_WIDTH = "w-full";
/** A control that failed its rules: the border carries it, so the layout does not move. */
export declare const FORM_CONTROL_INVALID = "border-destructive focus-visible:ring-destructive";
/** The gap between two rows of sections. Only between: the first row has none. */
export declare const FORM_ROW_GAP = "mt-5";
/** The field grid is a `dl`, and `grid` is on it rather than in `FORM_FIELD_GRID`. */
export declare const FORM_FIELD_DL = "grid";
export declare const FORM_PANEL_ICON = "size-3.5";
export declare const FORM_CLOSE_ICON = "size-4";
/** The close button sits at the end of the header row. */
export declare const FORM_CLOSE_BUTTON = "ml-auto";
/**
 * The error message, for anyone the red border and the tooltip do not reach. A colour and a hover are
 * not available to everyone, so the text is always in the document even when it is never painted.
 */
export declare const FORM_ERROR_SR = "sr-only";
export declare const FORM_PANEL_TITLE = "truncate font-semibold";
/** A record with no title yet reads as a placeholder rather than as a name. */
export declare const FORM_PANEL_TITLE_EMPTY = "text-muted-foreground";
/**
 * One icon, two jobs: the field's help text, and its error when it has one. The help lives on the
 * label so it is there in a slide-over, where the documentation panel is not.
 */
export declare const FORM_FIELD_INFO_STATES: {
    readonly error: "text-destructive";
    readonly help: "text-muted-foreground/70 hover:text-[var(--button-primary)]";
};
export declare const FORM_TEXTAREA_STATES: {
    readonly invalid: "border-destructive focus-visible:ring-destructive";
    readonly valid: "border-input focus-visible:ring-ring";
};
/**
 * The slide-over's two animations. Named states rather than a ternary in each edition, because the
 * exit animation is what runs the pending close: getting the class wrong strands the panel open.
 */
export declare const FORM_BACKDROP_STATES: {
    readonly in: "vui-overlay-in";
    readonly out: "vui-overlay-out";
};
export declare const FORM_PANEL_STATES: {
    readonly in: "vui-panel-in";
    readonly out: "vui-panel-out";
};
/**
 * The logo and favicon control: a preview box, an optional details line, and Replace / Remove. The two
 * box shapes and the two fits are maps rather than ternaries so both editions can express all four.
 */
export declare const BRAND_ASSET_ROOT = "flex flex-col gap-1";
export declare const BRAND_ASSET_ROW = "flex items-center gap-3";
export declare const BRAND_ASSET_BOX = "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/40";
export declare const BRAND_ASSET_BOX_SIZES: {
    readonly square: "size-12";
    readonly wide: "h-12 w-24";
};
/** `contain` keeps a logo whole; `cover` fills the box, which is right for a photo. */
export declare const BRAND_ASSET_FITS: {
    readonly contain: "max-h-full max-w-full object-contain";
    readonly cover: "size-full object-cover";
};
export declare const BRAND_ASSET_EMPTY = "text-xs text-muted-foreground";
export declare const BRAND_ASSET_ACTIONS = "flex items-center gap-2";
/** The real file input, kept out of the layout: the buttons above drive it. */
export declare const BRAND_ASSET_INPUT = "hidden";
export declare const BRAND_ASSET_DETAILS = "text-xs text-muted-foreground";
export declare const BRAND_ASSET_ERROR = "text-xs text-destructive";
/**
 * The record view's chrome, lifted out of `record-view.tsx` on 2026-08-20 for the same reason the
 * form's was: the table is the component the paid editions carry, so the Vue/HTML/WordPress builds
 * have to render *this* table, not a lookalike. Every string below was inline in that file and is
 * byte-identical here — the move was mechanical on purpose, so a port can diff against it.
 */
/** The page shell: a full-height column, then the per-record action row, then the padded card. */
export declare const RV_SHELL = "flex h-full flex-col";
export declare const RV_HEADER = "flex h-12 items-center justify-between border-b border-border px-4";
export declare const RV_HEADER_ACTIONS = "flex items-center gap-1.5";
export declare const RV_CONTENT = "min-h-0 flex-1 overflow-hidden p-4";
export declare const RV_CARD = "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card";
/** The add button clears the icon-only controls beside it. */
export declare const RV_ADD_BUTTON = "ml-1";
/** A control's word label, dropped below `sm` so the toolbar stays a row of icons on a phone. */
export declare const RV_LABEL_SM = "hidden sm:inline";
/** The import file input is driven by the menu above it, so it is never in the layout itself. */
export declare const RV_FILE_INPUT = "hidden";
/**
 * Shapes more than one element in this view uses, kept as one string each so a change moves all of
 * them rather than the one that was easiest to find.
 */
export declare const RV_INLINE_ROW = "flex items-center gap-2";
export declare const RV_TRUNCATE = "truncate";
export declare const RV_FULL_WIDTH = "w-full";
export declare const RV_ICON = "size-3.5";
export declare const RV_ICON_LG = "size-4";
/** The sub-toolbar: what is being listed on the left, the controls on the right. */
export declare const RV_TOOLBAR = "flex shrink-0 items-center justify-between border-b border-border px-4 py-1.5";
export declare const RV_TOOLBAR_TITLE = "font-medium";
export declare const RV_TOOLBAR_CONTROLS = "flex items-center gap-0.5";
export declare const RV_CLEAR_SELECTION = "text-muted-foreground underline-offset-2 hover:text-foreground hover:underline";
/** The two bulk actions carry their colour on the label, not the menu row, so the row still reads
 *  as one of the list. Restore is the primary action; delete is the destructive one. */
export declare const RV_BULK_RESTORE = "flex items-center gap-2 text-[var(--button-primary)]";
export declare const RV_BULK_DELETE = "flex items-center gap-2 text-destructive";
/**
 * The Trash toggle is deliberately a dropdown trigger that is not a dropdown: it sits in the same row
 * as Filter / Sort / Options and switching views is the same kind of act, so it reuses that trigger's
 * base and its two states rather than growing a fourth near-identical pill. A map, not a ternary,
 * because both editions have to be able to say either state.
 */
export declare const RV_TRASH_TOGGLE_STATES: {
    readonly on: "bg-accent text-accent-foreground";
    readonly off: "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
};
/**
 * The toolbar's control icons. Each control gets its own hue: the row is icon-only below `sm`, and a
 * row of identical grey glyphs is not something you can aim at. The hue is the control's identity, so
 * it is a constant per control rather than a palette anyone can rotate.
 */
export declare const RV_ICON_TITLE = "size-4 text-muted-foreground";
export declare const RV_ICON_IMPORT = "size-3.5 text-info";
export declare const RV_ICON_EXPORT = "size-3.5 text-violet-500";
export declare const RV_ICON_MORE = "size-4 text-slate-500";
export declare const RV_ICON_TRASH = "size-3.5 text-red-500";
export declare const RV_ICON_FILTER = "size-3.5 text-warning";
export declare const RV_ICON_SORT = "size-3.5 text-info";
export declare const RV_ICON_OPTIONS = "size-3.5 text-fuchsia-500";
export declare const RV_ICON_PAGE_SIZE = "size-3.5 text-info";
/**
 * The Filter panel. It is capped at the smaller of `28rem` and `70vh` and scrolls only in the middle,
 * so the header and the Search / Clear footer stay put however many filterable fields a table has.
 */
export declare const RV_FILTER_PANEL = "flex max-h-[min(28rem,70vh)] w-96 flex-col";
export declare const RV_FILTER_GRID = "relative min-h-0 flex-1 overflow-y-auto p-3";
export declare const RV_FILTER_FOOTER = "flex shrink-0 items-center justify-end gap-2 border-t border-border p-3";
export declare const RV_FILTER_CHECKS = "flex flex-col gap-1";
export declare const RV_FILTER_CHECK = "flex items-center gap-2 text-sm";
export declare const RV_FILTER_INPUT = "h-8 w-full";
/** The single-keyword fallback, shown when no field opted into per-field filtering. The magnifier is
 *  decoration over the input, hence `pointer-events-none` and the matching left padding. */
export declare const RV_KEYWORD_BODY = "p-3";
export declare const RV_KEYWORD_WRAP = "relative";
export declare const RV_KEYWORD_ICON = "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground";
export declare const RV_KEYWORD_INPUT = "h-8 pl-9";
/** The pagination footer, ruled off from the controls to its left. The range is tabular so the digits
 *  do not shuffle as you page. */
export declare const RV_PAGER = "ml-1 flex items-center gap-1 border-l border-border pl-2 text-muted-foreground";
export declare const RV_PAGER_RANGE = "whitespace-nowrap px-1 tabular-nums";
export declare const RV_PAGER_BUTTON = "grid size-7 place-items-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:hover:bg-transparent";
/** `vui-scroll` keeps both bars visible: a table wider than its container otherwise just looks like
 *  it ends. The header sticks at `z-20` — above the cell overlays at 10, below the pinned Actions
 *  column at 30, which has to cross both. */
export declare const RV_SCROLL = "relative vui-scroll min-h-0 flex-1 overflow-auto";
export declare const RV_TABLE_HEADER = "sticky top-0 z-20 bg-background [&_th]:sticky [&_th]:top-0 [&_th]:z-20 [&_th]:bg-background";
/** The header row and the empty/skeleton rows are not records, so they do not answer to a hover. */
export declare const RV_ROW_INERT = "hover:bg-transparent";
/** The leading column: drag grip, then checkbox. The header's spacer is the grip's size exactly, so
 *  the select-all box lines up with every box below it. */
export declare const RV_SELECT_CELL = "flex h-8 items-center gap-2 pl-2 pr-3";
export declare const RV_GRIP_SPACER = "h-6 w-4 shrink-0";
/** A column header. `w-max` lets it size to its own label until the user drags it; `relative` is
 *  what the resize handle positions against. */
export declare const RV_HEAD_CELL = "relative w-max";
export declare const RV_HEAD_ICON = "size-3.5 shrink-0 text-foreground";
export declare const RV_HEAD_LABEL = "flex items-center gap-1 whitespace-nowrap";
export declare const RV_HEAD_INNER = "flex h-8 w-full items-center gap-1.5 whitespace-nowrap";
export declare const RV_HEAD_SORTABLE = "hover:text-foreground";
/** Sortable columns always show an indicator, so sortability is visible before you click: the solid
 *  caret is the active direction, the muted two-way one means "sortable, not sorted". */
export declare const RV_HEAD_CARET = "size-3.5 shrink-0";
export declare const RV_HEAD_CARET_IDLE = "size-3.5 shrink-0 text-muted-foreground/50";
/** The identity (Name/Title) header, sortable or static. It carries its own hover rather than
 *  composing `RV_HEAD_SORTABLE`, because a field header's classes are built through `cn`. */
export declare const RV_NAME_HEAD_BUTTON = "flex h-8 w-full items-center gap-1.5 whitespace-nowrap hover:text-foreground";
export declare const RV_NAME_HEAD_STATIC = "flex h-8 items-center gap-1.5 whitespace-nowrap";
/** The drag target on a column's right edge: a hairline that is invisible until you approach it, at
 *  `z-10` so it sits over the cell it belongs to and under the sticky header. */
export declare const RV_RESIZE_HANDLE = "absolute right-0 top-0 z-10 h-full w-1.5 cursor-col-resize touch-none bg-transparent transition-colors hover:bg-primary/40 focus-visible:bg-primary/60 focus-visible:outline-none";
/** A flex spacer absorbs the leftover width, so data columns keep their natural size and the Actions
 *  column stays pinned right. Borderless, or a divider shows in the gap. */
export declare const RV_SPACER_HEAD = "w-full border-r-0";
export declare const RV_SPACER_CELL = "border-r-0";
/** The pinned Actions column. The header is at `z-30` to clear the sticky header row it crosses; the
 *  body cell only has to clear the cell overlays, so it sits at 10. The one-sided shadow is what makes
 *  it read as pinned rather than as a column that happens to be last. */
export declare const RV_ACTIONS_HEAD = "sticky right-0 z-30 border-l border-border text-right shadow-[-8px_0_12px_-8px_rgb(0_0_0/0.12)]";
export declare const RV_ACTIONS_HEAD_LABEL = "flex h-8 items-center justify-center whitespace-nowrap px-2";
export declare const RV_ACTIONS_CELL = "sticky right-0 z-10 border-l border-border bg-card p-0 shadow-[-8px_0_12px_-8px_rgb(0_0_0/0.12)]";
/** The loading rows. Each pulse is the size of the thing it stands in for, so the table does not
 *  change height when the data lands. `vui-shimmer` rather than `SKELETON`: the table's own animation
 *  sweeps, which reads as a row arriving instead of a row breathing. */
export declare const RV_SKELETON_CHECKBOX = "mx-2 size-4 vui-shimmer rounded";
export declare const RV_SKELETON_AVATAR = "size-7 shrink-0 vui-shimmer rounded-full";
export declare const RV_SKELETON_NAME = "h-3.5 w-32 vui-shimmer rounded";
export declare const RV_SKELETON_VALUE = "h-3.5 w-20 vui-shimmer rounded";
export declare const RV_SKELETON_ACTIONS = "mx-auto h-4 w-8 vui-shimmer rounded";
/** A record row. The three data attributes are the row's states — open, drop target, just saved —
 *  set on the element so one class string covers all of them and none needs a ternary. */
export declare const RV_ROW = "group data-[active=true]:bg-accent/60 data-[dragover=true]:border-t-2 data-[dragover=true]:border-t-primary data-[flash=true]:bg-primary/10";
/** The cell gives up its own padding wherever the control inside owns it (a full-height button, an
 *  inline input), so the hit area is the cell rather than a box inside it. */
export declare const RV_CELL_FLUSH = "p-0";
/** Always visible in a light colour so reordering is discoverable, darkening on hover. The glyph
 *  itself opts out of the icon chip: a bordered box here reads as a control, not a handle. */
export declare const RV_GRIP = "flex h-6 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/40 transition-colors hover:text-foreground active:cursor-grabbing";
export declare const RV_GRIP_ICON = "size-3.5 border-transparent bg-transparent";
/** The record's name: initials chip plus title, the whole row-width button being what opens the
 *  record. `rowClick: "none"` disables it, and a disabled button must not keep the hover. */
export declare const RV_NAME_BUTTON = "flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-muted/60 disabled:cursor-default disabled:hover:bg-transparent";
export declare const RV_INITIALS = "flex size-5 shrink-0 items-center justify-center rounded bg-muted font-medium text-muted-foreground";
/** Nothing matched: one tall centred row, so the table still looks like a table. */
export declare const RV_EMPTY = "h-32 text-center text-muted-foreground";
/**
 * Column alignment, applied per cell. Numeric columns and short codes centre themselves (see
 * `computeColumnAligns`), so this is a map keyed by the computed alignment rather than a class the
 * caller passes: `left` is the default and therefore adds nothing. `BOX` is for the flex wrapper
 * that owns the whole cell, `TEXT` for an input or a render wrapper, which only needs the text side.
 */
export declare const RV_ALIGN_BOX: {
    readonly left: "";
    readonly center: "justify-center text-center";
    readonly right: "justify-end text-right";
};
export declare const RV_ALIGN_TEXT: {
    readonly left: "";
    readonly center: "text-center";
    readonly right: "text-right";
};
/** The value cell, in its three shapes: a custom `render`, the inline editor, and the read cell.
 *  A custom cell is clipped to the column box so a wide badge cannot bleed into the next column. */
export declare const RV_CELL_CUSTOM = "overflow-hidden px-3 py-1.5";
export declare const RV_CELL_INPUT = "h-8 w-full bg-background px-3 outline-none ring-2 ring-inset ring-ring";
export declare const RV_CELL_MULTI = "overflow-hidden";
export declare const RV_CELL_EDITABLE = "group/cell relative flex h-8 w-full items-center";
export declare const RV_CELL_BUTTON = "flex h-8 w-full items-center overflow-hidden px-3 text-left hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";
export declare const RV_CELL_READ = "group/cell relative flex h-8 items-center px-3";
/** Copy / edit, revealed on hovering the cell. Hidden with `opacity-0` rather than removed so it
 *  cannot shift the row, and `focus-within` brings it back for anyone arriving by keyboard. */
export declare const RV_CELL_ACTIONS = "absolute right-1 top-1/2 flex -translate-y-1/2 items-center divide-x divide-border overflow-hidden rounded-sm bg-background shadow-sm ring-1 ring-border opacity-0 transition-opacity group-hover/cell:opacity-100 focus-within:opacity-100";
export declare const RV_CELL_ACTION = "grid size-6 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground";
export declare const RV_COPIED_ICON = "size-3.5 text-success";
/** The per-row actions. Same square button for all four; only delete tints its hover, because that
 *  is the one you want to notice you are about to press. */
export declare const RV_ROW_ACTIONS = "flex items-center justify-center gap-0.5 px-2";
export declare const RV_ROW_ACTION = "grid size-7 cursor-pointer place-items-center rounded-sm hover:bg-muted";
export declare const RV_ROW_ACTION_DESTRUCTIVE = "grid size-7 cursor-pointer place-items-center rounded-sm hover:bg-destructive/10";
export declare const RV_ROW_ICON_VIEW = "size-4 text-info";
export declare const RV_ROW_ICON_EDIT = "size-4 text-warning";
export declare const RV_ROW_ICON_RESTORE = "size-4 text-[var(--button-primary)]";
export declare const RV_ROW_ICON_DELETE = "size-4 text-red-500";
/** The right-click menu. Positioned by hand rather than portalled, so it takes the menu layer
 *  (`z-[200]`) itself to clear the slide-over a table can be opened inside. */
export declare const RV_MENU = "fixed z-[200] min-w-44 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md";
export declare const RV_MENU_ITEM = "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-accent hover:text-accent-foreground";
export declare const RV_MENU_ITEM_RESTORE = "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[var(--button-primary)] hover:bg-accent";
export declare const RV_MENU_ITEM_DESTRUCTIVE = "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-destructive hover:bg-destructive/10";
export declare const RV_MENU_SEPARATOR = "my-1 h-px bg-border";
/** The record being acted on, inside a confirm's sentence: named in the copy so the dialog says what
 *  it is about to do rather than "this item". */
export declare const RV_CONFIRM_EMPHASIS = "font-medium text-foreground";
/**
 * **These were `react-day-picker`'s slot names and are now roles**, because the Vue edition is built on
 * Reka's calendar, whose anatomy is different: `CalendarRoot`, `CalendarHeader`, `CalendarGrid`,
 * `CalendarCell`. A constant called `button_previous` could only ever be read by one edition, so each
 * one below says what the element **is**, and each edition maps its own primitive onto it.
 *
 * The values are `calendar.tsx`'s, unchanged. The design is the same calendar; only the DOM differs,
 * which is the same trade the pickers made in wave 4.
 */
export declare const CALENDAR_MONTHS = "relative flex flex-col gap-4 md:flex-row";
export declare const CALENDAR_MONTH = "flex w-full flex-col gap-4";
export declare const CALENDAR_NAV = "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1";
/** Prev and Next. The size is the cell size, so the nav row lines up with the grid below it. */
export declare const CALENDAR_NAV_BUTTON = "size-(--cell-size) p-0 select-none aria-disabled:opacity-50";
export declare const CALENDAR_CAPTION = "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)";
export declare const CALENDAR_GRID = "w-full border-collapse";
export declare const CALENDAR_WEEKDAYS = "flex";
export declare const CALENDAR_WEEKDAY_HEAD = "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none";
export declare const CALENDAR_WEEK = "mt-2 flex w-full";
export declare const CALENDAR_FIT = "w-fit";
export declare const CALENDAR_CAPTION_LABEL_PLAIN = "text-sm";
export declare const CALENDAR_CAPTION_LABEL_BASE = "font-medium select-none";
export declare const CALENDAR_CAPTION_LABEL_DROPDOWN = "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground";
export declare const CALENDAR_DROPDOWNS = "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium";
export declare const CALENDAR_DROPDOWN_ROOT = "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50";
/** The real `<select>`, invisible over the label it drives, so the control is native and keyboard-safe. */
export declare const CALENDAR_DROPDOWN = "absolute inset-0 bg-popover opacity-0";
export declare const CALENDAR_WEEK_NUMBER_HEAD = "w-(--cell-size) select-none";
export declare const CALENDAR_WEEK_NUMBER = "text-[0.8rem] text-muted-foreground select-none";
/** The cell, which owns the day's group so the trigger inside it can be styled from its state. */
export declare const CALENDAR_CELL = "group/day relative aspect-square h-full w-full p-px text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md";
/**
 * Which edge of a week rounds when a selection starts there. It moves by one when a week-number column
 * is shown, because the first child is then the number rather than a day.
 */
export declare const CALENDAR_CELL_LEADING: {
    readonly withWeekNumber: "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md";
    readonly plain: "[&:first-child[data-selected=true]_button]:rounded-l-md";
};
/**
 * Today: a brand **ring**, not a fill.
 *
 * It was `bg-accent`, a faint grey block, which competes with the selected day rather than
 * complementing it: two filled cells, one grey and one brand, and no way to tell which is which
 * without knowing the convention. A ring says "today" while a fill says "chosen", so both read at
 * once and the common case where they are the same day needs no special handling.
 *
 * `inset` so the ring sits inside the cell and does not overlap its neighbours in a tight grid.
 */
export declare const CALENDAR_TODAY = "rounded-md ring-1 ring-inset ring-primary/60 data-[selected=true]:ring-0";
/**
 * The same ring, keyed on the attribute Reka puts on the trigger.
 *
 * `CALENDAR_TODAY` above reaches the day through react-day-picker's `classNames.today`, which the Vue
 * port has no equivalent of: Reka marks the trigger `data-today` and leaves the styling to the
 * caller. Without it that edition drew no ring at all, so today was indistinguishable from any other
 * day and only the reference told a reader where the month actually is (`PD-145`).
 *
 * `data-[selected]` rather than `data-[selected=true]`, because Reka writes the attribute without a
 * value: a ring around a filled day is two conventions arguing.
 */
export declare const CALENDAR_TODAY_VIEW = "data-[today]:rounded-md data-[today]:ring-1 data-[today]:ring-inset data-[today]:ring-primary/60 data-[today]:data-[selected]:ring-0";
export declare const CALENDAR_OUTSIDE = "text-muted-foreground aria-selected:text-muted-foreground";
/**
 * The same dimming, keyed on the attribute Reka puts on the trigger.
 *
 * `CALENDAR_OUTSIDE` above is applied by react-day-picker through its `classNames.outside`, which the
 * Vue port has no equivalent of: Reka marks the trigger `data-outside-view` and leaves the styling to
 * the caller. Without it that edition drew every adjacent-month day in full-strength foreground where
 * the reference greys them (`PD-144`).
 */
/**
 * The dashboard's date-range label, sized for the longest thing it can say.
 *
 * `min-w`, not `w`, and never wrapping: at a fixed 104px "Aug 20 to Aug 26" broke onto a second line
 * and pushed the card's header taller than the tabs beside it.
 *
 * **112, because the placeholder is wider than the value.** The range is resolved after mount, so the
 * button reads "Select date range" first and the row shifted 4px when the dates arrived. In the HTML
 * edition that never resolves, so the shift was permanent and every element to the left of it sat 4px
 * out (`PD-146`). Reserving for the longest label means neither state moves anything.
 */
export declare const DATE_RANGE_LABEL = "whitespace-nowrap lg:min-w-[112px] lg:text-left";
/**
 * The demographics map's host box, reserving exactly what the library draws.
 *
 * **`jsvectormap` sets its own height on this element, and it is 150px whatever the width.** Measured
 * at 401px and 718px wide: 150 both times. So `h-52` (208px) reserved 58px that the map then took
 * back, which means the card **shrinks when the map finishes loading** in every edition, and the HTML
 * edition's static export keeps the 208 forever because the map never runs. That one card accounted
 * for the last differences on the dashboard (`PD-146`).
 *
 * A fixed height rather than an aspect ratio, because the library's is fixed: an `aspect-[w/h]` box
 * would be right at one width and wrong at every other.
 */
export declare const DEMOGRAPHIC_MAP_HOST = "h-[150px] w-full";
/**
 * A native `<dialog>` used as a modal, and the panel that sits inside it.
 *
 * **Two elements, not one.** The first version of the HTML calendar's dialog put `DIALOG_OVERLAY` and
 * `DIALOG_PANEL` on the same `<dialog>`, which made the panel its own full-screen flex container: the
 * heading, the fields and the footer became flex *items* and were laid out side by side, overlapping,
 * pinned to a corner. It was functionally correct and visually unusable, which is what comes of
 * testing that a click changed a count and never looking at the result (`PD-152`).
 *
 * The shell neutralises the user-agent's border, padding and background so the panel is the only thing
 * drawn. `showModal` already gives a top-layer backdrop, a focus trap and Escape, so none of that is
 * written twice.
 *
 * **The backdrop is tinted from `theme.css`, not by a class here.** Tailwind compiled
 * `backdrop:bg-foreground/25` to `background-color: var(--foreground)` with the alpha dropped, and a
 * class selector outranks a plain `dialog::backdrop` rule, so the class won and painted an unresolved
 * variable: the page behind a modal was not dimmed at all (`PD-153`).
 *
 * **These live here because this file is scanned.** Tailwind generates a class from the sources in
 * `packages/css`'s scan list, and a browser script under `packages/css/scripts` is not in it, so a
 * class string written there produces no rule at all.
 */
export declare const STATIC_DIALOG_SHELL = "m-auto flex w-[calc(100%-2rem)] justify-center border-0 bg-transparent p-0";
/**
 * The calendar's own panel measurements.
 *
 * **The width belongs to the shell and the rest to the panel.** A native `<dialog>` is sized by its
 * content, so a panel set to `w-full max-w-[700px]` inside one resolves `w-full` against whatever the
 * content happened to need: 507px rather than 700. The shell carries the width, and the panel drops
 * `DIALOG_PANEL`'s own `max-w-md` so it fills it (`PD-152`).
 */
export declare const CALENDAR_DIALOG_WIDTH = "max-w-[700px]";
export declare const CALENDAR_DIALOG_PANEL = "max-w-none rounded-3xl p-6 lg:p-10";
export declare const CALENDAR_OUTSIDE_VIEW = "data-[outside-view]:text-muted-foreground data-[outside-view]:aria-selected:text-muted-foreground";
export declare const CALENDAR_DISABLED = "text-muted-foreground opacity-50";
export declare const CALENDAR_HIDDEN = "invisible";
export declare const CALENDAR_RANGE_START = "rounded-l-md bg-primary/10";
export declare const CALENDAR_RANGE_MIDDLE = "rounded-none";
export declare const CALENDAR_RANGE_END = "rounded-r-md bg-primary/10";
/**
 * The focus ring in Reka's vocabulary, **and it has no reader yet, deliberately.**
 *
 * React's ring comes from `group-data-[focused=true]/day`, which `react-day-picker` sets on the cell;
 * Reka sets `data-focused` on the trigger instead, so a port needs these five variants and React needs
 * none of them. The first version added it to React's day button so the constant would not sit unread,
 * and a review priced that: `tailwind-merge` cannot collapse across two different modifier sets, so it
 * changed React's class attribute and put **five rules that can never match into every consumer's CSS
 * build**. Paying that to satisfy a naming rule is the wrong trade.
 *
 * So it waits for the edition that will read it. `COMMAND_ITEM` solved the same problem the other way,
 * by carrying both vocabularies in one string, and that worked there because both editions render the
 * element the variants sit on. Here they do not.
 */
export declare const CALENDAR_DAY_FOCUS = "data-[focused]:relative data-[focused]:z-10 data-[focused]:border-ring data-[focused]:ring-[3px] data-[focused]:ring-ring/50";
/** The stat card's own padding. The card border comes from whatever grid it is dropped into. */
export declare const STAT_CARD = "p-4";
export declare const STAT_CARD_LABEL = "text-muted-foreground";
export declare const STAT_CARD_VALUE = "mt-1.5 text-2xl font-semibold tracking-tight";
export declare const STAT_CARD_DELTA = "mt-2 flex items-center gap-1 font-medium";
/** Trend to colour. `flat` is deliberately muted rather than a third hue: it is the absence of news. */
export declare const STAT_CARD_TREND: Record<"up" | "down" | "flat", string>;
/** A heading bar over a block inside a card: a bottom rule and a tinted strip, not free-floating text. */
export declare const SECTION_HEADER = "border-b border-border bg-muted/40 px-4 py-2 font-medium";
/** The empty state, centred in whatever it is given, with a circled icon above the message. */
export declare const EMPTY_STATE = "flex flex-col items-center justify-center gap-2 py-12 text-center";
export declare const EMPTY_STATE_ICON_WRAP = "flex size-10 items-center justify-center rounded-full bg-muted";
export declare const EMPTY_STATE_ICON = "size-5 text-muted-foreground";
export declare const EMPTY_STATE_TITLE = "font-medium";
export declare const EMPTY_STATE_BODY = "text-muted-foreground";
export declare const DASHBOARD_STATS_GRID = "grid grid-cols-2 gap-4 lg:grid-cols-4";
/** The tile's frame. `STAT_CARD` is its padding; the dashboard decides it is a bordered card. */
export declare const DASHBOARD_STAT_TILE = "rounded-lg border border-border bg-card";
export declare const DASHBOARD_GRID = "grid grid-cols-1 gap-4 lg:grid-cols-3";
export declare const DASHBOARD_CARD = "overflow-hidden rounded-lg border border-border bg-card";
export declare const DASHBOARD_CARD_WIDE = "overflow-hidden rounded-lg border border-border bg-card lg:col-span-2";
export declare const DASHBOARD_SIDE_COLUMN = "grid grid-cols-1 content-start gap-4";
export declare const DASHBOARD_REGION_LIST = "space-y-3 p-4";
export declare const DASHBOARD_BAR_TRACK = "h-2 overflow-hidden rounded-full bg-muted";
export declare const DASHBOARD_BAR_FILL = "h-full rounded-full bg-primary";
export declare const DASHBOARD_PEOPLE_LIST = "divide-y divide-border";
export declare const DASHBOARD_PERSON_ROW = "flex items-center gap-3 px-4 py-3";
export declare const DASHBOARD_ORG_CELL = "flex items-center gap-3";
export declare const DASHBOARD_DOT = "size-2 shrink-0 rounded-full";
export declare const DASHBOARD_DOT_ON = "bg-success";
export declare const DASHBOARD_DOT_OFF = "bg-muted-foreground/40";
/**
 * An organisation's status, as a badge.
 *
 * Shared because the label and the variant are product decisions, not styling: "trial" reading as a
 * warning is a thing the demo says about the product, and it has to say the same thing in every
 * edition. The variants are `Badge`'s, which both editions ship.
 */
export declare const DEMO_STATUS_BADGE: Record<"active" | "trial" | "suspended", {
    label: string;
    variant: "success" | "warning" | "destructive";
}>;
export declare const AUTH_HEADER = "flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4";
export declare const ERROR_SCREEN_ROOT = "flex min-h-screen flex-col bg-muted/30";
export declare const ERROR_SCREEN_MAIN = "flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center";
/** A failure we caused reads destructive; everything else stays neutral. */
export declare const ERROR_SCREEN_ICON_TONES: {
    readonly muted: "grid size-14 place-items-center rounded-full bg-muted text-muted-foreground";
    readonly destructive: "grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive";
};
export type ErrorScreenTone = keyof typeof ERROR_SCREEN_ICON_TONES;
export declare const ERROR_SCREEN_CODE = "text-6xl font-semibold tracking-tight text-muted-foreground";
export declare const ERROR_SCREEN_TITLE = "text-2xl font-semibold tracking-tight";
export declare const ERROR_SCREEN_MESSAGE = "max-w-sm text-muted-foreground";
/**
 * The one-line footer strip.
 *
 * **Darker and a step larger than it was.** It read at `text-[10px]` in `--muted-foreground`, which
 * is a ten-pixel grey on a grey ground: legible if you already knew what it said. The line carries
 * the copyright and the licence, which is the one sentence on the page a buyer may actually need to
 * read, so it is now `text-xs` at seventy per cent of the body colour. Still quiet, still clearly
 * secondary, and no longer something to squint at.
 */
export declare const SITE_FOOTER = "flex shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 border-t border-border bg-background px-4 py-2.5 text-center text-xs text-foreground/70";
export declare const SITE_FOOTER_LINK = "font-medium text-foreground underline-offset-2 hover:underline";
export declare const AUTH_CARD = "overflow-hidden rounded-lg border border-border bg-background shadow-sm";
export declare const AUTH_CARD_HEADER = "border-b border-border bg-muted/40 px-5 py-4 text-center";
export declare const AUTH_CARD_HEADER_BADGE = "mb-3";
export declare const AUTH_CARD_TITLE = "text-base font-semibold tracking-tight";
export declare const AUTH_CARD_DESCRIPTION = "mt-1 text-sm text-muted-foreground";
export declare const AUTH_CARD_BODY = "space-y-4 px-5 py-6 leading-relaxed";
export declare const AUTH_CARD_ASIDE = "mt-4 space-y-3 border-t border-border pt-4 text-center leading-relaxed text-muted-foreground";
export declare const AUTH_CARD_FOOTER = "border-t border-border bg-muted/40 px-5 py-4";
export declare const OR_DIVIDER = "flex items-center gap-3 py-1 text-muted-foreground";
export declare const OR_DIVIDER_RULE = "h-px flex-1 bg-border";
export declare const ICON_BADGE = "mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary";
/** The two-column auth routes' marketing panel, hidden below `md`. */
export declare const AUTH_SHOWCASE = "hidden overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[var(--button-primary)]/[0.08] via-card to-card p-8 md:flex md:flex-col md:justify-center";
export declare const AUTH_SHOWCASE_EYEBROW = "text-xs font-medium tracking-wide text-muted-foreground uppercase";
export declare const AUTH_SHOWCASE_TITLE = "mt-2 text-2xl leading-tight font-semibold tracking-tight text-balance";
export declare const AUTH_SHOWCASE_LIST = "mt-8 space-y-5";
export declare const AUTH_SHOWCASE_ITEM = "flex gap-3";
export declare const AUTH_SHOWCASE_ITEM_ICON = "mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-border bg-background text-[var(--button-primary)]";
export declare const AUTH_SHOWCASE_ITEM_TITLE = "block text-sm font-medium";
export declare const AUTH_SHOWCASE_ITEM_BODY = "mt-0.5 block text-sm leading-relaxed text-muted-foreground";
/** The two-column auth layout: the showcase beside the card. */
export declare const AUTH_SPLIT = "grid w-full max-w-4xl gap-6 md:grid-cols-2";
export declare const LEGAL_HEADER = "mb-8 border-b border-border pb-6";
export declare const LEGAL_TITLE = "text-2xl font-semibold tracking-tight";
export declare const LEGAL_UPDATED = "mt-1 text-sm text-muted-foreground";
export declare const LEGAL_LEAD = "mt-4 leading-relaxed text-muted-foreground";
export declare const LEGAL_SECTION = "mt-8 scroll-mt-20 first:mt-0";
export declare const LEGAL_SECTION_TITLE = "text-lg font-semibold tracking-tight";
export declare const LEGAL_SECTION_BODY = "mt-2 space-y-3 leading-relaxed text-muted-foreground";
export declare const LEGAL_LIST = "list-disc space-y-1.5 pl-5";
export declare const LEGAL_NOTICE = "mt-10 rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground";
/**
 * The one sentence that **is** shared, because it is the disclaimer.
 *
 * A page that ships placeholder terms must say so identically in every edition; that is the part a
 * reader relies on, unlike the terms themselves.
 */
export declare const LEGAL_TEMPLATE_NOTICE = "This page ships as a working starting point. It is not legal advice. Replace it with terms your own lawyer has reviewed before you put this in front of customers.";
export declare const NOTIFICATION_ROW = "flex w-full items-start gap-3 border-b border-border text-left transition-colors last:border-b-0 hover:bg-accent/50";
export declare const NOTIFICATION_ROW_PAD: {
    readonly full: "px-4 py-3.5";
    readonly compact: "px-3 py-2.5";
};
export declare const NOTIFICATION_ROW_UNREAD = "bg-[var(--button-primary)]/[0.04]";
export declare const NOTIFICATION_BODY = "min-w-0 flex-1";
export declare const NOTIFICATION_TEXT: {
    readonly full: "text-sm leading-relaxed";
    readonly compact: "text-[13px] leading-snug";
};
export declare const NOTIFICATION_ACTOR = "font-medium text-foreground";
export declare const NOTIFICATION_MESSAGE = "text-muted-foreground";
export declare const NOTIFICATION_CONTEXT = "mt-1 block truncate text-[11px] text-muted-foreground/80";
export declare const NOTIFICATION_META = "flex shrink-0 flex-col items-end gap-1.5";
export declare const NOTIFICATION_TIME = "text-[11px] text-muted-foreground";
export declare const NOTIFICATION_DOT = "size-1.5 rounded-full bg-[var(--button-primary)]";
/** Which glyph and tint each kind wears. The icon is a **key**, bound per edition. */
export declare const NOTIFICATION_KINDS: {
    readonly mention: {
        readonly icon: "chat-bubble";
        readonly tint: "text-[var(--chart-1)]";
    };
    readonly assignment: {
        readonly icon: "target";
        readonly tint: "text-[var(--chart-2)]";
    };
    readonly comment: {
        readonly icon: "chat-bubble";
        readonly tint: "text-[var(--chart-3)]";
    };
    readonly system: {
        readonly icon: "bell";
        readonly tint: "text-muted-foreground";
    };
    readonly billing: {
        readonly icon: "contact";
        readonly tint: "text-[var(--chart-4)]";
    };
};
export declare const TIER_CARD: (featured?: boolean) => string;
export declare const TIER_CARD_AMOUNT_ROW = "flex items-baseline gap-1";
export declare const TIER_CARD_AMOUNT = "text-2xl font-semibold tracking-tight text-foreground";
export declare const TIER_CARD_CADENCE = "text-sm text-muted-foreground";
export declare const TIER_CARD_PERK = "mt-2 text-sm text-muted-foreground";
export declare const TIER_CARD_BULLETS = "mt-3 flex-1 space-y-1.5 text-sm text-muted-foreground";
export declare const TIER_CARD_BULLET = "flex gap-2";
export declare const TIER_CARD_BULLET_MARK = "text-[var(--button-primary)]";
export declare const TIER_CARD_CTA = "mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--button-primary)]";
export declare const TIER_CARD_CTA_ICON = "size-3.5 transition-transform group-hover:translate-x-0.5";
export declare const PLAN_MATRIX_SCROLL = "relative mb-5 overflow-x-auto vui-scroll";
export declare const PLAN_MATRIX_TABLE = "w-full border-collapse text-sm";
export declare const PLAN_MATRIX_HEAD_ROW = "border-b border-border text-left";
export declare const PLAN_MATRIX_TH = "py-2 pr-4 font-semibold";
export declare const PLAN_MATRIX_TH_LAST = "py-2 font-semibold";
export declare const PLAN_MATRIX_ROW = "border-b border-border align-top";
export declare const PLAN_MATRIX_AREA = "py-2 pr-4 font-medium whitespace-nowrap";
export declare const PLAN_MATRIX_ITEM = "py-2 pr-4";
export declare const PLAN_MATRIX_PLAN = "py-2 pr-4 whitespace-nowrap";
export declare const PLAN_MATRIX_NOTE = "py-2 text-muted-foreground";
/** The bordered aside used for the pledge and for "Pro is not on sale yet". */
export declare const PRICING_ASIDE = "rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground";
export declare const PRICING_TITLE_CLASS = "text-2xl font-semibold tracking-tight text-foreground";
export declare const PRICING_LEAD_CLASS = "mt-2 mb-8 text-sm leading-relaxed text-muted-foreground";
export declare const PRICING_TIER_GRID = "grid gap-4 sm:grid-cols-3";
export declare const PRICING_FAQ_LIST = "space-y-5";
export declare const PRICING_FAQ_TERM = "font-semibold text-foreground";
export declare const PRICING_FAQ_DEF = "mt-1 leading-relaxed";
export declare const PRICING_INLINE_LINK = "font-medium text-foreground underline";
export declare const KANBAN_BOARD = "flex h-full gap-4";
export declare const KANBAN_SCROLL = "relative min-h-0 flex-1 overflow-x-auto p-4";
export declare const KANBAN_COLUMN = "flex h-full w-72 shrink-0 flex-col gap-3";
export declare const KANBAN_COLUMN_HEAD = "flex items-center justify-between px-1";
export declare const KANBAN_COLUMN_COUNT = "rounded-full bg-muted px-1.5 py-0.5 tabular-nums text-muted-foreground";
export declare const KANBAN_COLUMN_TOTAL = "tabular-nums text-muted-foreground";
export declare const KANBAN_COLUMN_BODY: (isDropTarget?: boolean) => string;
export declare const KANBAN_COLUMN_EMPTY = "px-2 py-6 text-center text-muted-foreground";
export declare const KANBAN_COLUMN_ADD = "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
export declare const KANBAN_CARD: (dragging?: boolean) => string;
export declare const KANBAN_CARD_DELETE = "absolute right-1 top-1 grid size-6 place-items-center rounded text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100";
export declare const KANBAN_CARD_HEAD = "flex items-start gap-1.5 pr-5";
export declare const KANBAN_CARD_GRIP = "mt-0.5 size-3.5 shrink-0 text-muted-foreground/50";
export declare const KANBAN_CARD_OPEN = "min-w-0 flex-1 text-left focus-visible:outline-none";
export declare const KANBAN_CARD_TITLE = "truncate font-medium hover:underline";
export declare const KANBAN_CARD_SUB = "truncate text-muted-foreground";
export declare const KANBAN_CARD_FOOT = "mt-2 flex items-center justify-between pl-5";
export declare const KANBAN_CARD_AMOUNT = "font-semibold tabular-nums";
export declare const KANBAN_SUMMARY_WRAP = "shrink-0 px-4 pt-4";
export declare const KANBAN_SUMMARY = "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2";
export declare const KANBAN_SUMMARY_LABEL = "flex items-center gap-1.5 font-medium text-foreground";
export declare const KANBAN_SUMMARY_METRIC = "flex items-center gap-1.5 tabular-nums text-foreground";
export declare const KANBAN_SUMMARY_DIVIDER = "h-4 w-px bg-border";
export declare const KANBAN_TOOLBAR = "flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-4";
export declare const KANBAN_SEARCH_ICON = "pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground";
export declare const KANBAN_SEARCH_INPUT = "h-7 w-40 pl-7 sm:w-56";
export declare const FORM_CARD = "overflow-hidden rounded-lg border border-border";
export declare const FORM_CARD_TITLE = "flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2 font-semibold text-[var(--button-primary)]";
export declare const FORM_CARD_ICON = "size-4 text-[var(--button-primary)]";
export declare const FORM_CARD_BODY = "space-y-4 p-4";
export declare const WIZARD_PAGE = "mx-auto w-full max-w-2xl";
export declare const WIZARD_PAGE_HEAD = "mb-6 flex items-center gap-3";
export declare const WIZARD_PAGE_BADGE = "grid size-11 shrink-0 place-items-center rounded-xl bg-accent";
export declare const WIZARD_PAGE_TITLE = "text-xl font-bold tracking-tight";
export declare const WIZARD_PAGE_LEAD = "text-muted-foreground";
export declare const WIZARD_SHELL = "overflow-hidden rounded-lg border border-border bg-card";
export declare const WIZARD_SHELL_BODY = "space-y-4 p-4 md:p-6";
export declare const WIZARD_SHELL_FOOT = "flex items-center justify-between border-t border-border bg-muted/40 px-4 py-3";
/** The dashed drop zone a logo upload offers. */
export declare const UPLOAD_DROP = "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-8 text-center transition-colors hover:bg-accent/40";
export declare const UPLOAD_DROP_BADGE = "grid size-11 place-items-center rounded-full bg-muted";
export declare const UPLOAD_DROP_HINT = "text-xs text-muted-foreground";
/** The review list both wizards end on. */
export declare const WIZARD_REVIEW_LIST = "divide-y divide-border";
export declare const WIZARD_REVIEW_ROW = "flex items-center gap-3 py-2.5";
export declare const WIZARD_REVIEW_TERM = "w-28 shrink-0 text-muted-foreground";
export declare const WIZARD_REVIEW_VALUE = "min-w-0 flex-1 break-words";
export declare const SUPPORT_FRAME = "flex min-h-0 flex-1 overflow-hidden rounded-lg border border-border bg-card";
export declare const SUPPORT_QUEUE = "flex w-80 shrink-0 flex-col border-r border-border";
export declare const SUPPORT_QUEUE_HEAD = "flex shrink-0 flex-col gap-2 border-b border-border p-3";
export declare const SUPPORT_QUEUE_LIST = "relative min-h-0 flex-1 overflow-y-auto";
export declare const TICKET_ROW: (active?: boolean) => string;
export declare const TICKET_ROW_TOP = "flex items-center justify-between gap-2";
export declare const TICKET_ROW_SUBJECT = "truncate text-sm font-medium";
export declare const TICKET_ROW_META = "flex items-center gap-2 text-xs text-muted-foreground";
export declare const TICKET_DOT = "size-2 shrink-0 rounded-full";
export declare const TICKET_BADGE = "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize";
export declare const SUPPORT_EMPTY = "p-4 text-center text-sm text-muted-foreground";
export declare const SUPPORT_DETAIL = "flex min-w-0 flex-1 flex-col";
export declare const SUPPORT_DETAIL_HEAD = "shrink-0 border-b border-border px-5 py-3";
export declare const SUPPORT_DETAIL_REF = "text-xs tabular-nums text-muted-foreground";
export declare const SUPPORT_DETAIL_SUBJECT = "mt-1 truncate text-base font-semibold";
export declare const SUPPORT_THREAD = "relative min-h-0 flex-1 space-y-4 overflow-y-auto p-5";
export declare const SUPPORT_REPLY_FORM = "shrink-0 border-t border-border p-4";
export declare const SUPPORT_RAIL = "hidden w-60 shrink-0 flex-col gap-4 border-l border-border p-4 lg:flex";
export declare const SUPPORT_PROP = "space-y-1.5";
export declare const SUPPORT_PROP_LABEL = "text-xs font-medium uppercase tracking-wide text-muted-foreground";
export declare const SUPPORT_ENTRY = "flex gap-3";
export declare const SUPPORT_AVATAR: (isAgent?: boolean) => string;
export declare const SUPPORT_ENTRY_BODY = "min-w-0 flex-1 rounded-lg border border-border bg-background p-3";
export declare const SUPPORT_ENTRY_HEAD = "mb-1 flex items-center gap-2";
export declare const SUPPORT_ENTRY_AUTHOR = "text-sm font-medium";
export declare const SUPPORT_ENTRY_META = "text-xs text-muted-foreground";
export declare const SUPPORT_ENTRY_TEXT = "whitespace-pre-wrap text-sm leading-relaxed";
export declare const CHAT_RAIL = "flex w-64 shrink-0 flex-col border-r border-border bg-muted/20";
export declare const CHAT_RAIL_LIST = "relative min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2";
export declare const CHAT_RAIL_ROW: (active?: boolean) => string;
export declare const CHAT_THREAD = "mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6";
export declare const CHAT_COMPOSER = "rounded-2xl border border-border bg-card shadow-sm focus-within:border-[var(--button-primary)]";
export declare const CHAT_COMPOSER_CHIPS = "flex flex-wrap gap-2 border-b border-border p-2.5";
export declare const CHAT_COMPOSER_INPUT = "block max-h-40 w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none";
export declare const CHAT_COMPOSER_BAR = "flex items-center justify-between p-2";
export declare const CHAT_ATTACH_BUTTON = "grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
export declare const CHAT_DISCLAIMER = "mt-2 text-center text-[11px] text-muted-foreground";
export declare const CHAT_MESSAGE = "flex gap-3";
export declare const CHAT_AVATAR: (isUser?: boolean) => string;
export declare const CHAT_MESSAGE_BODY = "min-w-0 flex-1 pt-1";
export declare const CHAT_MESSAGE_WHO = "mb-1 text-xs font-medium text-muted-foreground";
export declare const CHAT_MESSAGE_TEXT = "whitespace-pre-wrap break-words text-sm leading-relaxed";
export declare const CHAT_MESSAGE_ATTACHMENTS = "mb-2 flex flex-wrap gap-2";
export declare const CHAT_IMAGE = "size-28 rounded-lg border border-border object-cover";
export declare const CHAT_FILE = "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent/40";
export declare const CHAT_FILE_NAME = "max-w-48 truncate";
export declare const CHIP = "group relative flex items-center gap-2 rounded-lg border border-border bg-background py-1.5 pl-1.5 pr-7 text-sm";
export declare const CHIP_IMAGE = "size-8 rounded object-cover";
export declare const CHIP_ICON = "grid size-8 place-items-center rounded bg-muted";
export declare const CHIP_NAME = "max-w-40 truncate text-xs font-medium";
export declare const CHIP_SIZE = "text-[11px] text-muted-foreground";
export declare const CHIP_REMOVE = "absolute right-1.5 top-1/2 grid size-5 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:bg-accent hover:text-foreground";
export declare const ONBOARDING_PAGE = "w-full max-w-xl";
export declare const ONBOARDING_CARD = "mt-6 rounded-xl border border-border bg-background p-6 shadow-sm";
export declare const ONBOARDING_STEP_TITLE = "text-base font-semibold tracking-tight";
export declare const ONBOARDING_STEP_BODY = "mt-4 space-y-3";
export declare const ONBOARDING_NAV = "mt-6 flex items-center justify-between gap-2";
export declare const STEPPER_LIST = "flex items-center";
export declare const STEPPER_ITEM = "flex flex-1 items-center last:flex-none";
export declare const STEPPER_DOT: (done?: boolean, active?: boolean) => string;
export declare const STEPPER_LABEL: (active?: boolean) => string;
export declare const STEPPER_RULE: (filled?: boolean) => string;
export declare const PLAN_OPTION: (selected?: boolean) => string;
export declare const PLAN_OPTION_FEATURES = "mt-2 flex flex-wrap gap-x-4 gap-y-1";
export declare const PLAN_OPTION_FEATURE = "flex items-center gap-1 text-muted-foreground";
export declare const TOKEN_BOX = "rounded-md border border-border p-3";
export declare const TOKEN_VALUE = "min-w-0 flex-1 truncate rounded bg-muted px-2 py-1 font-mono";
export declare const TOKEN_COPY = "grid size-7 shrink-0 place-items-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground";
export declare const INVITE_REMOVE = "grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-40";
export declare const INVITE_ADD = "mt-2 inline-flex items-center gap-1.5 font-medium text-primary hover:underline";
export declare const SETTINGS_SECTION = "overflow-hidden rounded-lg border border-border";
export declare const SETTINGS_SECTION_HEAD = "border-b border-border bg-muted/40 px-3 py-2";
export declare const SETTINGS_SECTION_TITLE = "font-semibold text-[var(--button-primary)]";
export declare const SETTINGS_SECTION_DESC = "text-sm text-muted-foreground";
export declare const SETTINGS_SECTION_BODY = "p-4";
export declare const SETTINGS_ROW = "grid gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-4";
export declare const SETTINGS_ROW_LABEL = "text-sm text-muted-foreground";
export declare const SETTINGS_ROW_CONTROL = "min-w-0 max-w-sm";
export declare const SETTINGS_TOGGLE_ROW = "flex items-start justify-between gap-4 py-2";
export declare const SETTINGS_TOGGLE_HINT = "text-sm text-muted-foreground";
/** The three-way colour-scheme switch: a segmented row of light, dark and system. */
export declare const SCHEME_SWITCH = "inline-flex rounded-lg border border-border p-0.5";
export declare const SCHEME_OPTION: (active?: boolean) => string;
export declare const SHOWCASE_SECTION = "overflow-hidden rounded-lg border border-border bg-card";
export declare const SHOWCASE_HEAD = "border-b border-border bg-muted/40 px-4 py-2.5";
export declare const SHOWCASE_TITLE = "font-medium";
export declare const SHOWCASE_DESC = "text-sm text-muted-foreground";
export declare const SHOWCASE_BODY = "flex flex-wrap items-start gap-4 p-5";
export declare const SHOWCASE_GRID = "grid gap-4 p-4 lg:grid-cols-2";
export declare const SCHEDULE_FRAME = "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card";
export declare const SCHEDULE_WEEKDAYS = "grid shrink-0 grid-cols-7 border-b border-border bg-muted/40";
export declare const SCHEDULE_WEEKDAY = "px-2 py-1.5 text-center text-xs font-medium text-muted-foreground";
/**
 * The day name inside the week and day header, which is **typography only**.
 *
 * Its parent already carries `flex-1 px-2 py-1.5 text-center`, so reusing `SCHEDULE_WEEKDAY` there
 * padded it twice: the Vue week header came out 0.75rem taller and 1rem narrower in its text box
 * than React's. One identifier meaning both a grid column head and a label inside a padded head is
 * how that happens.
 */
export declare const SCHEDULE_DAY_NAME = "text-xs font-medium text-muted-foreground";
export declare const SCHEDULE_MONTH_GRID = "grid min-h-0 flex-1 grid-cols-7 grid-rows-6";
export declare const SCHEDULE_CELL: (inMonth?: boolean) => string;
export declare const SCHEDULE_DATE: (inMonth?: boolean, isToday?: boolean) => string;
export declare const SCHEDULE_ADD = "grid size-5 shrink-0 place-items-center rounded text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100";
export declare const SCHEDULE_CHIPS = "mt-0.5 flex flex-col gap-0.5 overflow-hidden";
export declare const SCHEDULE_CHIP = "flex items-center gap-1 truncate rounded px-1 py-0.5 text-left text-[11px] transition-opacity hover:opacity-90";
export declare const SCHEDULE_MORE = "px-1 text-[11px] text-muted-foreground";
export declare const SCHEDULE_DAY_HEAD = "flex shrink-0 border-b border-border bg-muted/40";
export declare const SCHEDULE_GUTTER = "w-16 shrink-0";
export declare const SCHEDULE_HOUR_LABEL = "h-14 border-b border-r border-border pr-1 pt-0.5 text-right text-[11px] tabular-nums text-muted-foreground";
export declare const SCHEDULE_HOUR_CELL = "block h-14 w-full border-b border-border transition-colors hover:bg-accent/30";
export declare const SCHEDULE_DAY_COLUMN = "relative flex-1 border-l border-border";
export declare const SCHEDULE_NOW_LINE = "pointer-events-none absolute inset-x-0 z-20 border-t-2 border-red-500";
export declare const SCHEDULE_NOW_DOT = "absolute -left-1 -top-1 size-2 rounded-full bg-red-500";
export declare const SCHEDULE_BLOCK = "absolute z-10 flex flex-col overflow-hidden rounded px-1 py-0.5 text-left text-[11px] leading-tight shadow-sm transition-opacity hover:opacity-90";
export declare const SCHEDULE_TAB: (active?: boolean) => string;
/** The create dialog's type tablist, its title field and its progressive disclosure. */
export declare const SCHEDULE_TABLIST = "flex items-center gap-1 rounded-md bg-muted/50 p-0.5";
export declare const SCHEDULE_TITLE_INPUT = "w-full border-0 border-b border-input bg-transparent pb-1 text-lg font-medium placeholder:font-normal placeholder:text-muted-foreground focus-visible:border-[var(--button-primary)] focus-visible:outline-none";
export declare const SCHEDULE_MORE_TOGGLE = "self-start text-sm font-medium text-[var(--button-primary)] hover:underline";
export declare const SCHEDULE_COLOUR_DOT = "size-3 shrink-0 rounded-full";
/** A native `<input type="range">` styled as the slider. `accent-color` paints the thumb for free. */
export declare const SLIDER_NATIVE = "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[var(--button-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50";
/** `<details>` and `<summary>`, which is what `popover` and `dropdown-menu` already use here. */
export declare const COLLAPSIBLE_NATIVE_ROOT = "rounded-md border border-border";
export declare const COLLAPSIBLE_NATIVE_TRIGGER = "flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 font-medium transition-colors hover:bg-accent/40";
export declare const COLLAPSIBLE_NATIVE_CONTENT = "border-t border-border px-3 py-2 text-muted-foreground";
/** One real single-character field per slot, so a code can actually be typed without JavaScript. */
export declare const INPUT_OTP_NATIVE_SLOT = "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-center text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:border-ring focus:ring-[3px] focus:ring-ring/50 aria-invalid:border-destructive";
/** The inline SVG chart the HTML edition draws, since Recharts cannot render statically (`PD-045`). */
export declare const CHART_NATIVE_FIGURE = "w-full max-w-sm";
export declare const CHART_NATIVE_SVG = "aspect-video w-full";
export declare const CHART_NATIVE_CAPTION = "mt-1 text-xs text-muted-foreground";
export declare const CARD = "vui-card";
export declare const CARD_HEADER = "vui-card-header";
export declare const CARD_TITLE = "vui-card-title";
export declare const CARD_DESCRIPTION = "vui-card-description";
/**
 * The card's body.
 *
 * **The one part of the card that was not a constant**, so React and Vue each wrote `px-5 pb-5`
 * inline and Angular had no `CardContent` at all. Two tokens is under `check:shared-classes`'s
 * four-token floor, which is why a duplicate the gate exists to catch sat in plain sight through
 * three editions (`Z-15`).
 */
/**
 * The time panel: three columns a reader picks an hour, a minute and a meridiem from (`PD-160`).
 *
 * **Filled means chosen, exactly as the calendar's day does**, so the two pickers teach one
 * convention rather than two. The columns scroll rather than growing the panel, because twelve hours
 * and twelve minutes at row height is taller than most fields have room below them.
 */
/**
 * The row of actions a picker panel closes with, shared by the date and time fields (`PD-163`).
 *
 * **Both fields had their own copy of these classes in every edition**, which is four copies of a
 * footer that has to look identical or the two pickers stop reading as one component.
 *
 * The muted action is the destructive-ish one on the left and the primary is the confirming one on
 * the right, which is the order a reader is used to from a dialog.
 */
export declare const PICKER_FOOTER = "flex items-center justify-between border-t border-border px-3 py-2";
export declare const PICKER_ACTION = "cursor-pointer rounded-md px-2 py-1 text-sm font-medium transition-colors";
export declare const PICKER_ACTION_MUTED = "text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40";
export declare const PICKER_ACTION_PRIMARY = "text-primary hover:bg-primary/10";
export declare const TIME_PANEL = "flex divide-x divide-border rounded-md border border-border";
/**
 * `relative`, because `scroll-containing-block.test.ts` says so and it is right: `overflow-y-auto`
 * clips what a descendant paints without making the element a containing block (`PD-082`). It also
 * makes the column the offset parent, which is what lets each one scroll its chosen row into line.
 *
 * **The deep bottom padding is what lets every row reach the top.** The meridiem column has two
 * options and is shorter than the box, so it could not scroll at all: `02` and `00` lined up and `PM`
 * sat a row below them, which is three lookups rather than one time. Padding the column to just under
 * its own height gives the last option somewhere to scroll to, the way a wheel picker does.
 */
export declare const TIME_COLUMN = "vui-scroll relative max-h-56 w-16 overflow-y-auto px-1 pt-2 pb-48";
/**
 * `select-none`, because a column is scrolled by dragging and a drag over text selects it.
 *
 * The dev photographed a minute column with every visible option painted blue, which is the browser's
 * own selection highlight over seven `<button>` labels, not a state this component has (`PD-170`). It
 * does not reproduce under a synthetic drag, which is why it took a screenshot to see. An option in a
 * picker is a control rather than prose, so there is nothing here anybody wants to copy.
 */
export declare const TIME_OPTION = "w-full cursor-pointer rounded-md px-2 py-1.5 text-center text-sm transition-colors select-none hover:bg-accent hover:text-accent-foreground";
export declare const TIME_OPTION_ACTIVE = "bg-primary text-primary-foreground hover:bg-primary";
export declare const CARD_CONTENT = "vui-card-content";
export declare const CARD_FOOTER = "vui-card-footer";
export declare const KBD_BASE = "inline-grid min-w-[1.4rem] place-items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] leading-none text-muted-foreground";
export declare const KBD_GROUP = "inline-flex items-center gap-1";
export declare const LABEL_BASE = "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50";
export declare const SEPARATOR_BASE = "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px";
export declare const TEXTAREA_BASE = "flex field-sizing-content min-h-24 w-full rounded-lg border border-input bg-transparent px-4 py-2.5 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40";
export declare const DT_ROOT = "flex flex-col gap-3";
export declare const DT_TOOLBAR = "flex flex-wrap items-center gap-2";
export declare const DT_TOOLBAR_END = "ms-auto flex items-center gap-2";
export declare const DT_SEARCH = "h-8 max-w-xs";
export declare const DT_FRAME = "relative overflow-x-auto rounded-lg border border-border";
export declare const DT_HEAD_ROW = "bg-muted/40";
export declare const DT_SELECT_HEAD = "w-10";
export declare const DT_SORT_BUTTON = "-mx-1 inline-flex items-center gap-1.5 rounded-sm px-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export declare const DT_SORT_MARK = "vui-icon-plain size-3.5 shrink-0 transition-opacity";
export declare const DT_SORT_MARK_STATES: {
    readonly active: "opacity-100";
    readonly idle: "opacity-40";
};
export declare const DT_SKELETON_CELL = "h-4 w-full";
export declare const DT_EMPTY = "py-10 text-center text-muted-foreground";
export declare const DT_ROW_SELECTED = "bg-accent/40";
export declare const DT_ROW_CLICKABLE = "cursor-pointer";
export declare const DT_FOOTER = "flex flex-wrap items-center justify-between gap-3 text-caption text-muted-foreground";
export declare const DT_PAGER = "flex items-center gap-1";
export declare const DT_PAGER_GAP = "px-1.5";
export declare const DT_ALIGN: {
    readonly start: "text-left";
    readonly center: "text-center";
    readonly end: "text-right";
};
export declare const PROGRESS_INDICATOR = "h-full w-full flex-1 bg-primary transition-all";
export declare const RADIO_GROUP_INDICATOR = "relative flex size-full items-center justify-center";
/** The dot inside a checked radio. On the filled disc, so it is the foreground and not the brand. */
export declare const RADIO_GROUP_DOT = "size-2 rounded-full bg-primary-foreground";
export declare const SCROLL_AREA_THUMB = "relative flex-1 rounded-full bg-border";
export declare const CHART_CARD = "rounded-lg border border-border bg-card p-4";
/** A row of buttons that reads as one control: shared edges, no double borders. */
export declare const BUTTON_GROUP = "inline-flex items-center [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:-ml-px [&>*:not(:last-child)]:rounded-r-none";
/** Vertical, for a narrow column. Same idea, the other axis. */
export declare const BUTTON_GROUP_VERTICAL = "inline-flex flex-col items-stretch [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:-mt-px [&>*:not(:last-child)]:rounded-b-none";
/** The spinner's motion. `motion-reduce` is not optional: `theme.css` clamps it globally too. */
export declare const SPINNER = "animate-spin text-muted-foreground motion-reduce:animate-none";
export declare const LIST_ROOT = "flex flex-col";
/** A divided list. The border sits on every item but the first, so the ends stay clean. */
export declare const LIST_DIVIDED = "divide-y divide-border";
export declare const LIST_ITEM = "flex items-center gap-3 py-3 text-sm text-foreground";
export declare const CAROUSEL_ROOT = "relative overflow-hidden rounded-lg border border-border";
/** The track slides by a whole viewport per step, so a slide is never half shown. */
export declare const CAROUSEL_TRACK = "flex transition-transform duration-300 motion-reduce:transition-none";
export declare const CAROUSEL_SLIDE = "w-full shrink-0";
export declare const CAROUSEL_CONTROL = "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground shadow-sm disabled:opacity-40";
export declare const CAROUSEL_DOTS = "absolute inset-x-0 bottom-3 flex items-center justify-center gap-2";
export declare const CAROUSEL_DOT = "size-2 rounded-full bg-foreground/30 transition-colors";
export declare const CAROUSEL_DOT_ACTIVE = "bg-foreground";
