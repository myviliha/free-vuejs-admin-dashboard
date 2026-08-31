/**
 * Typing a time, and the values a time panel offers (`PD-160`).
 *
 * **The same argument as the date field**: a control a person can only click is the wrong control for
 * a value they already know. `1130` should become `11:30 AM` while it is typed, and the panel is for
 * when they would rather point at it.
 *
 * Shared, because four editions have to agree on what a keystroke does. The split is the one the date
 * field set: **`HH:mm` on the wire, 12-hour on screen.** A 24-hour value sorts, compares and reaches a
 * server without anybody parsing "PM", and nobody has to read it.
 */
/** The hours a panel offers, as a 12-hour clock reads them: 12 first, then 1 to 11. */
export const TIME_HOURS = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
/**
 * Minutes, every five.
 *
 * Twelve rows is a column a person can scan without scrolling far, and any minute a five does not
 * cover is one keystroke away in the field itself. Quarter hours alone would be four rows and would
 * make `11:05` a thing only typing can reach.
 */
export const TIME_MINUTES = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
];
export const TIME_MERIDIEM = ["AM", "PM"];
/** `HH:mm` to the three parts a panel highlights. */
export function timeParts(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    if (!match)
        return { hour: "", minute: "", meridiem: "" };
    const h24 = Number(match[1]);
    const meridiem = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return { hour: `${h12}`.padStart(2, "0"), minute: match[2], meridiem };
}
/** The three parts back to `HH:mm`. The one place 12-hour becomes 24. */
export function partsToValue(hour, minute, meridiem) {
    const h12 = Number(hour) % 12;
    const h24 = meridiem === "PM" ? h12 + 12 : h12;
    return `${`${h24}`.padStart(2, "0")}:${minute}`;
}
/** `HH:mm` to what the field shows. Empty in, empty out, so a cleared field shows its placeholder. */
export function toDisplayTime(value) {
    const { hour, minute, meridiem } = timeParts(value);
    return hour ? `${hour}:${minute} ${meridiem}` : "";
}
/**
 * Format what has been typed, and read a time out of it when there is one.
 *
 * Takes the whole field value rather than a keystroke, so paste and mid-string deletion behave. Two
 * ways to say afternoon, because both are things people type: a trailing `p`, or an hour of 13 to 23,
 * which is read as 24-hour and shown as 12. `0930`, `930`, `09:30` and `9:30am` are the same time.
 */
export function maskTime(raw) {
    const lower = raw.toLowerCase();
    const suffix = /p/.test(lower.replace(/^[^a-z]*/, "")) ? "PM" : /a/.test(lower) ? "AM" : "";
    /*
     * A separator says where the hour ends, which four digits alone cannot.
     *
     * `930` is ambiguous while it is being typed and `9:30` is not, so an explicit separator with a
     * two-digit minute after it pads the hour. Without this, `9:30 am` produced three digits and no
     * time at all.
     */
    const groups = lower.replace(/[a-z]/g, "").split(/\D+/).filter(Boolean);
    const explicit = groups.length === 2 && groups[0].length <= 2 && groups[1].length === 2;
    /*
     * Three digits typed in a row is `h:mm`, not a two-digit hour.
     *
     * **The docstring promised `930` and the code did not deliver it.** Typing `9`, `3`, `0` produced
     * `93:0` and the next keystroke turned the field red on a time typed correctly, because the run was
     * read as hour `93`. Typing the separator was no escape either: it is stripped before this point.
     * Padding a lone three-digit run is the same move the explicit branch above already makes.
     */
    const plain = lower.replace(/\D/g, "").slice(0, 4);
    /*
     * Three digits are `h:mm` **only when the two-digit reading is impossible**.
     *
     * `930` cannot be hour 93, so it is half past nine. `113` can be hour 11 and usually is: someone on
     * their way to `1130`. Padding both was the first attempt and it turned `113` into `01:13 AM` while
     * they were still typing, which is worse than the bug it fixed.
     */
    const threeIsHourMinute = plain.length === 3 && Number(plain.slice(0, 2)) > 23;
    const digits = explicit
        ? `${groups[0].padStart(2, "0")}${groups[1]}`
        : threeIsHourMinute
            ? plain.padStart(4, "0")
            : plain;
    if (digits.length === 0)
        return { text: "", value: "", invalid: false };
    const hourPart = digits.slice(0, 2);
    const minutePart = digits.slice(2, 4);
    let text = hourPart;
    if (digits.length > 2)
        text += `:${minutePart}`;
    if (digits.length < 4)
        return { text, value: "", invalid: false };
    const h = Number(hourPart);
    const m = Number(minutePart);
    if (m > 59 || h > 23)
        return { text, value: "", invalid: true };
    // An hour past twelve says afternoon by itself; otherwise the suffix does, and AM is the default.
    const meridiem = h >= 13 ? "PM" : h === 12 ? suffix || "PM" : suffix || "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const value = partsToValue(`${h12}`.padStart(2, "0"), minutePart, meridiem);
    return { text: toDisplayTime(value), value, invalid: false };
}
