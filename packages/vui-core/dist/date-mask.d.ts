/**
 * Typing a date, the way a card expiry is typed (`PD-159`).
 *
 * **A picker alone is the wrong control for a date of birth.** Reaching 1987 from a month grid is
 * dozens of clicks, and everyone already knows how to type `07/03/1987`. The field offers both: type
 * it, or open the calendar. This is the typing half, and it lives here because all four editions have
 * to agree character for character. A mask written per edition is four masks.
 *
 * The behaviour is the one a card form has taught people to expect: digits only, separators appear on
 * their own, and nothing is rejected while it is still being typed. Validation happens when the eight
 * digits are there, not before, because a field that turns red at `0` is a field that fights you.
 */
export interface MaskedDate {
    /** What to show in the input: digits with `/` inserted as they are earned. */
    text: string;
    /** `YYYY-MM-DD` once the date is complete **and** real, otherwise empty. */
    iso: string;
    /** Eight digits typed but not a date that exists, such as `31/02/2026`. */
    invalid: boolean;
}
/**
 * Format what has been typed so far, and read a date out of it when there is one.
 *
 * Takes the raw field value rather than a keystroke, so it survives paste, autofill and a deletion in
 * the middle. Everything that is not a digit is dropped first, which is what makes `7/3/87`,
 * `07032026` and `07-03-2026` all land in the same place.
 */
export declare function maskDayFirst(raw: string): MaskedDate;
/** `YYYY-MM-DD` to what the input shows. The inverse of the above, for when the calendar sets it. */
export declare function isoToDayFirst(iso: string): string;
