/**
 * The calendar screen's vocabulary, its time maths and its fixtures (`PD-042`).
 *
 * **A calendar is arithmetic with a UI on top, and the arithmetic is what must not diverge.** Two
 * editions rounding a fifteen-minute slot differently, or labelling `13:00` as `1 PM` in one and
 * `13:00` in the other, is the same screen behaving like two products. So the slots, the labels, the
 * clamping and the nine event colours live here, and each edition renders them.
 *
 * `date-fns` does the calendar maths in both editions rather than being reimplemented here: month
 * grids, week boundaries and daylight-saving transitions are exactly what it exists to get right,
 * and this module deliberately does not have an opinion about them. What it owns is the product's
 * own vocabulary, which `date-fns` knows nothing about.
 *
 * **The colour classes are raw palette classes**, like the support desk's, and for the same reason:
 * `theme.css` has one state colour and no palette tokens, so a nine-colour picker has nothing to
 * read. Sharing the strings makes both editions wrong in the same way rather than differently. See
 * `odin/AGENTS.md` § Known thin spots.
 */
export type CalendarEventType = "event" | "task" | "appointment";
export type CalendarMode = "month" | "week" | "day";
export interface CalendarEvent {
    id: number;
    /** `yyyy-MM-dd`. */
    date: string;
    /** `HH:mm`. */
    start: string;
    /** `HH:mm`. */
    end: string;
    title: string;
    /** A key from `EVENT_COLORS`. */
    color: string;
    type: CalendarEventType;
    guests?: string;
    meet?: boolean;
    location?: string;
    description?: string;
    /** Minutes before, as a string, because it comes from a `<Select>`. */
    notify: string;
}
export type CalendarDraft = Omit<CalendarEvent, "id">;
export declare const WEEKDAYS: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export declare const HOURS: number[];
/** Matches the `h-14` hour rows, so the two editions place an event at the same offset. */
export declare const HOUR_REM = 3.5;
/** `HH:mm` to minutes past midnight. */
export declare const toMin: (t: string) => number;
/** Minutes past midnight to `HH:mm`, clamped inside the day. */
export declare function minToTime(m: number): string;
/** `9 AM`, `12 PM`, `1 PM`. */
export declare function hourLabel(hour: number): string;
/** `9:30 AM` from `09:30`. */
export declare function timeLabel(t: string): string;
/** Google's palette names, so the picker reads like one people recognise. */
export declare const EVENT_COLORS: readonly {
    key: string;
    label: string;
    chip: string;
    dot: string;
}[];
export declare const DEFAULT_EVENT_COLOR = "blueberry";
/** An unknown key falls back to blueberry rather than rendering an unstyled chip. */
export declare const chipFor: (key: string) => string;
export declare const dotFor: (key: string) => string;
/** Ninety-six fifteen-minute slots, labelled in AM/PM. Replaces the native time picker. */
export declare const TIME_OPTIONS: {
    value: string;
    label: string;
}[];
export declare const NOTIFY_OPTIONS: readonly [{
    readonly value: "0";
    readonly label: "At time of event";
}, {
    readonly value: "5";
    readonly label: "5 minutes before";
}, {
    readonly value: "10";
    readonly label: "10 minutes before";
}, {
    readonly value: "15";
    readonly label: "15 minutes before";
}, {
    readonly value: "30";
    readonly label: "30 minutes before";
}, {
    readonly value: "60";
    readonly label: "1 hour before";
}, {
    readonly value: "1440";
    readonly label: "1 day before";
}];
export declare const TYPE_TABS: readonly {
    key: CalendarEventType;
    label: string;
}[];
/** `yyyy-MM-dd` without `date-fns`, so this module keeps no dependency. */
export declare function dateKey(d: Date): string;
/**
 * The demo's events, relative to a day you pass in.
 *
 * **A function and not a constant**, because a constant computed at module load makes "today" the
 * moment the bundle was evaluated, which differs between a test, a build and a dev server. Passing
 * the reference day in means a test can pin it and both editions can seed identically.
 */
export declare function seedEvents(today: Date): CalendarEvent[];
/**
 * Move the start, and push the end **only if the start has passed it**.
 *
 * The first version dragged the end by the original gap, which is a defensible design and is not
 * React's: picking 09:15 on a 09:00–10:00 draft saves 09:15–10:00 there and would have saved
 * 09:15–10:15 here. Every start change that does not cross the end diverged, on a shared helper the
 * reference edition did not even call. One rule, and it is the reference's.
 */
export declare function withStart(draft: CalendarDraft, start: string): CalendarDraft;
export declare const CALENDAR_COPY: {
    readonly title: "Calendar";
    readonly today: "Today";
    readonly create: "Create";
    readonly modes: {
        readonly month: "Month";
        readonly week: "Week";
        readonly day: "Day";
    };
    readonly untitled: "(no title)";
    readonly fields: {
        readonly title: "Title";
        readonly date: "Date";
        readonly start: "Start";
        readonly end: "End";
        readonly colour: "Colour";
        readonly notify: "Notification";
        readonly guests: "Guests";
        readonly location: "Location";
        readonly description: "Description";
    };
    readonly save: "Save";
    readonly cancel: "Cancel";
    readonly delete: "Delete";
    readonly addTitle: "Add title";
    readonly entryType: "Entry type";
    readonly moreOptions: "More options";
    readonly meet: "Add Google Meet video conferencing";
};
/**
 * Lay overlapping events into side-by-side lanes.
 *
 * **The one real algorithm on this screen, and the reason it is here.** Events that overlap in time
 * form a cluster; within it each takes the lowest free lane, and every member reports the cluster's
 * column count so the widths divide evenly. Two editions doing this differently would put the same
 * two meetings in different places on the same morning, which is the most visible divergence there
 * is on a calendar.
 *
 * The twenty-minute floor matches the minimum block height, so a five-minute event still overlaps
 * anything drawn on top of it rather than appearing to sit beside it.
 */
export declare function layoutDay(events: readonly CalendarEvent[]): {
    ev: CalendarEvent;
    lane: number;
    cols: number;
}[];
/** The shortest block the grid draws, and the overlap floor `layoutDay` uses. */
export declare const MIN_EVENT_MINUTES = 20;
/** Where an event sits in the hour grid, in `rem`, so both editions place it identically. */
export declare function eventBox(ev: CalendarEvent): {
    top: number;
    height: number;
};
/** How far down the grid "now" is, in `rem`. */
export declare const nowOffsetRem: (now: Date) => number;
/** Group events by day, each day's list sorted by start time. Both editions read the same order. */
export declare function eventsByDate(events: readonly CalendarEvent[]): Map<string, CalendarEvent[]>;
/**
 * The draft a click on a day or an hour opens.
 *
 * An hour click starts on that hour; a day click starts at nine. The end is an hour later in both,
 * which is the default a reader then adjusts rather than a rule.
 */
export declare function draftFor(dateKeyValue: string, hour?: number): CalendarDraft;
/**
 * Can this draft be saved, and what does it save as?
 *
 * Two rules, both shared: a title is required after trimming, and an end that is not after the
 * start becomes start plus an hour rather than being rejected. An edition that saved a backwards
 * event, or rejected one instead of fixing it, behaves differently on the same form.
 */
export declare function normaliseDraft(draft: CalendarDraft): CalendarDraft | null;
/** How many chips a month cell shows before it says "+n more". */
export declare const MONTH_CELL_CHIPS = 3;
