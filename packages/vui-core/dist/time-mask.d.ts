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
export declare const TIME_HOURS: string[];
/**
 * Minutes, every five.
 *
 * Twelve rows is a column a person can scan without scrolling far, and any minute a five does not
 * cover is one keystroke away in the field itself. Quarter hours alone would be four rows and would
 * make `11:05` a thing only typing can reach.
 */
export declare const TIME_MINUTES: string[];
export declare const TIME_MERIDIEM: string[];
export interface MaskedTime {
    /** What to show in the field: `hh:mm AM`, as far as it has been typed. */
    text: string;
    /** `HH:mm`, 24-hour, once the time is complete and real. Empty otherwise. */
    value: string;
    /** Four digits typed but not a time that exists, such as `25:00`. */
    invalid: boolean;
}
/** `HH:mm` to the three parts a panel highlights. */
export declare function timeParts(value: string): {
    hour: string;
    minute: string;
    meridiem: string;
};
/** The three parts back to `HH:mm`. The one place 12-hour becomes 24. */
export declare function partsToValue(hour: string, minute: string, meridiem: string): string;
/** `HH:mm` to what the field shows. Empty in, empty out, so a cleared field shows its placeholder. */
export declare function toDisplayTime(value: string): string;
/**
 * Format what has been typed, and read a time out of it when there is one.
 *
 * Takes the whole field value rather than a keystroke, so paste and mid-string deletion behave. Two
 * ways to say afternoon, because both are things people type: a trailing `p`, or an hour of 13 to 23,
 * which is read as 24-hour and shown as 12. `0930`, `930`, `09:30` and `9:30am` are the same time.
 */
export declare function maskTime(raw: string): MaskedTime;
