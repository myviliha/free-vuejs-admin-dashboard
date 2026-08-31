export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const HOURS = Array.from({ length: 24 }, (_, h) => h);
/** Matches the `h-14` hour rows, so the two editions place an event at the same offset. */
export const HOUR_REM = 3.5;
/** `HH:mm` to minutes past midnight. */
export const toMin = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
/** Minutes past midnight to `HH:mm`, clamped inside the day. */
export function minToTime(m) {
    const c = Math.max(0, Math.min(24 * 60 - 1, m));
    return `${String(Math.floor(c / 60)).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`;
}
/**
 * **`Intl`'s space is not always a space, and that is why this normalises.**
 *
 * CLDR 42 put U+202F, a narrow no-break space, between the time and the day period for `en-US`.
 * That ships in ICU 72 through 77, which is Node 18.14 through 24 and every browser from early
 * 2023: `timeLabel("00:00")` returns `12:00\u202FAM` there and `12:00 AM` on newer runtimes. The
 * root `package.json` declares `node >= 18`, so both are supported, and `date-fns`' `"h:mm a"` was a
 * plain space everywhere. Formatting a grid label differently depending on the visitor's browser is
 * new variability nobody asked for, and a hidden codepoint is the worst kind to debug.
 *
 * So the two thin spaces are folded to an ordinary one. `Intl` is still doing the work; this only
 * takes an opinion about the separator, which is the part that moved.
 */
const ordinarySpaces = (s) => s.replace(/[\u202F\u00A0]/g, " ");
/** `9 AM`, `12 PM`, `1 PM`. */
export function hourLabel(hour) {
    return ordinarySpaces(new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true }).format(new Date(2000, 0, 1, hour)));
}
/** `9:30 AM` from `09:30`. */
export function timeLabel(t) {
    return ordinarySpaces(new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(2000, 0, 1, Number(t.slice(0, 2)), Number(t.slice(3, 5)))));
}
/** Google's palette names, so the picker reads like one people recognise. */
export const EVENT_COLORS = [
    { key: "blueberry", label: "Blueberry", chip: "bg-blue-600 text-white", dot: "bg-blue-600" },
    { key: "tomato", label: "Tomato", chip: "bg-red-600 text-white", dot: "bg-red-600" },
    { key: "tangerine", label: "Tangerine", chip: "bg-orange-500 text-white", dot: "bg-orange-500" },
    { key: "banana", label: "Banana", chip: "bg-yellow-400 text-black", dot: "bg-yellow-400" },
    { key: "sage", label: "Sage", chip: "bg-green-500 text-white", dot: "bg-green-500" },
    { key: "peacock", label: "Peacock", chip: "bg-cyan-600 text-white", dot: "bg-cyan-600" },
    { key: "lavender", label: "Lavender", chip: "bg-violet-400 text-black", dot: "bg-violet-400" },
    { key: "grape", label: "Grape", chip: "bg-purple-600 text-white", dot: "bg-purple-600" },
    { key: "graphite", label: "Graphite", chip: "bg-gray-500 text-white", dot: "bg-gray-500" },
];
export const DEFAULT_EVENT_COLOR = "blueberry";
const CHIP_FOR = new Map(EVENT_COLORS.map((c) => [c.key, c.chip]));
const DOT_FOR = new Map(EVENT_COLORS.map((c) => [c.key, c.dot]));
/** An unknown key falls back to blueberry rather than rendering an unstyled chip. */
export const chipFor = (key) => CHIP_FOR.get(key) ?? "bg-blue-600 text-white";
export const dotFor = (key) => DOT_FOR.get(key) ?? "bg-blue-600";
/** Ninety-six fifteen-minute slots, labelled in AM/PM. Replaces the native time picker. */
export const TIME_OPTIONS = Array.from({ length: 96 }, (_, i) => {
    const t = minToTime(i * 15);
    return { value: t, label: timeLabel(t) };
});
export const NOTIFY_OPTIONS = [
    { value: "0", label: "At time of event" },
    { value: "5", label: "5 minutes before" },
    { value: "10", label: "10 minutes before" },
    { value: "15", label: "15 minutes before" },
    { value: "30", label: "30 minutes before" },
    { value: "60", label: "1 hour before" },
    { value: "1440", label: "1 day before" },
];
export const TYPE_TABS = [
    { key: "event", label: "Event" },
    { key: "task", label: "Task" },
    { key: "appointment", label: "Appointment schedule" },
];
/** `yyyy-MM-dd` without `date-fns`, so this module keeps no dependency. */
export function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/**
 * The demo's events, relative to a day you pass in.
 *
 * **A function and not a constant**, because a constant computed at module load makes "today" the
 * moment the bundle was evaluated, which differs between a test, a build and a dev server. Passing
 * the reference day in means a test can pin it and both editions can seed identically.
 */
export function seedEvents(today) {
    const rel = (days) => {
        const d = new Date(today);
        d.setDate(d.getDate() + days);
        return dateKey(d);
    };
    return [
        {
            id: 1,
            date: rel(0),
            start: "09:30",
            end: "10:00",
            title: "Standup",
            color: "peacock",
            type: "event",
            notify: "10",
        },
        {
            id: 6,
            date: rel(0),
            start: "09:45",
            end: "10:30",
            title: "Client sync",
            color: "tangerine",
            type: "event",
            notify: "10",
        },
        {
            id: 2,
            date: rel(0),
            start: "14:00",
            end: "15:00",
            title: "Design review",
            color: "grape",
            type: "event",
            notify: "10",
            meet: true,
        },
        {
            id: 3,
            date: rel(2),
            start: "11:00",
            end: "12:00",
            title: "Onboarding call",
            color: "tangerine",
            type: "event",
            notify: "15",
        },
        {
            id: 4,
            date: rel(5),
            start: "16:30",
            end: "17:00",
            title: "1:1 with Ava",
            color: "sage",
            type: "event",
            notify: "10",
        },
        {
            id: 5,
            date: rel(-3),
            start: "10:00",
            end: "11:30",
            title: "Sprint planning",
            color: "tomato",
            type: "event",
            notify: "30",
        },
    ];
}
/**
 * Move the start, and push the end **only if the start has passed it**.
 *
 * The first version dragged the end by the original gap, which is a defensible design and is not
 * React's: picking 09:15 on a 09:00–10:00 draft saves 09:15–10:00 there and would have saved
 * 09:15–10:15 here. Every start change that does not cross the end diverged, on a shared helper the
 * reference edition did not even call. One rule, and it is the reference's.
 */
export function withStart(draft, start) {
    const end = toMin(draft.end) > toMin(start) ? draft.end : minToTime(toMin(start) + 60);
    return { ...draft, start, end };
}
export const CALENDAR_COPY = {
    title: "Calendar",
    today: "Today",
    create: "Create",
    modes: { month: "Month", week: "Week", day: "Day" },
    untitled: "(no title)",
    fields: {
        title: "Title",
        date: "Date",
        start: "Start",
        end: "End",
        colour: "Colour",
        notify: "Notification",
        guests: "Guests",
        location: "Location",
        description: "Description",
    },
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    addTitle: "Add title",
    entryType: "Entry type",
    moreOptions: "More options",
    meet: "Add Google Meet video conferencing",
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
export function layoutDay(events) {
    const sorted = [...events].sort((a, b) => toMin(a.start) - toMin(b.start) || toMin(a.end) - toMin(b.end));
    const out = [];
    let cluster = [];
    let clusterEnd = -1;
    const flush = () => {
        const cols = Math.max(1, ...cluster.map((c) => c.lane + 1));
        for (const c of cluster)
            out.push({ ev: c.ev, lane: c.lane, cols });
        cluster = [];
        clusterEnd = -1;
    };
    for (const ev of sorted) {
        const s = toMin(ev.start);
        const e = Math.max(toMin(ev.end), s + MIN_EVENT_MINUTES);
        if (cluster.length && s >= clusterEnd)
            flush();
        const used = new Set(cluster.filter((c) => c.end > s).map((c) => c.lane));
        let lane = 0;
        while (used.has(lane))
            lane++;
        cluster.push({ ev, lane, end: e });
        clusterEnd = Math.max(clusterEnd, e);
    }
    flush();
    return out;
}
/** The shortest block the grid draws, and the overlap floor `layoutDay` uses. */
export const MIN_EVENT_MINUTES = 20;
/** Where an event sits in the hour grid, in `rem`, so both editions place it identically. */
export function eventBox(ev) {
    return {
        top: (toMin(ev.start) / 60) * HOUR_REM,
        height: (Math.max(toMin(ev.end) - toMin(ev.start), MIN_EVENT_MINUTES) / 60) * HOUR_REM,
    };
}
/** How far down the grid "now" is, in `rem`. */
export const nowOffsetRem = (now) => ((now.getHours() * 60 + now.getMinutes()) / 60) * HOUR_REM;
/** Group events by day, each day's list sorted by start time. Both editions read the same order. */
export function eventsByDate(events) {
    const map = new Map();
    for (const e of events) {
        const list = map.get(e.date);
        if (list)
            list.push(e);
        else
            map.set(e.date, [e]);
    }
    for (const list of map.values())
        list.sort((a, b) => a.start.localeCompare(b.start));
    return map;
}
/**
 * The draft a click on a day or an hour opens.
 *
 * An hour click starts on that hour; a day click starts at nine. The end is an hour later in both,
 * which is the default a reader then adjusts rather than a rule.
 */
export function draftFor(dateKeyValue, hour) {
    const start = hour === undefined ? "09:00" : `${String(hour).padStart(2, "0")}:00`;
    return {
        date: dateKeyValue,
        start,
        end: minToTime(toMin(start) + 60),
        title: "",
        color: DEFAULT_EVENT_COLOR,
        type: "event",
        guests: "",
        meet: false,
        location: "",
        description: "",
        notify: "10",
    };
}
/**
 * Can this draft be saved, and what does it save as?
 *
 * Two rules, both shared: a title is required after trimming, and an end that is not after the
 * start becomes start plus an hour rather than being rejected. An edition that saved a backwards
 * event, or rejected one instead of fixing it, behaves differently on the same form.
 */
export function normaliseDraft(draft) {
    const title = draft.title.trim();
    if (!title)
        return null;
    const end = toMin(draft.end) > toMin(draft.start) ? draft.end : minToTime(toMin(draft.start) + 60);
    return { ...draft, title, end };
}
/** How many chips a month cell shows before it says "+n more". */
export const MONTH_CELL_CHIPS = 3;
