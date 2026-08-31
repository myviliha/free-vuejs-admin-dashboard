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
/** Days in a month, honouring leap years, so `29/02` is right in 2028 and wrong in 2027. */
function daysIn(month, year) {
    return new Date(year, month, 0).getDate();
}
/**
 * Format what has been typed so far, and read a date out of it when there is one.
 *
 * Takes the raw field value rather than a keystroke, so it survives paste, autofill and a deletion in
 * the middle. Everything that is not a digit is dropped first, which is what makes `7/3/87`,
 * `07032026` and `07-03-2026` all land in the same place.
 */
export function maskDayFirst(raw) {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    let text = day;
    if (digits.length > 2)
        text += `/${month}`;
    if (digits.length > 4)
        text += `/${year}`;
    if (digits.length < 8)
        return { text, iso: "", invalid: false };
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    const real = m >= 1 && m <= 12 && d >= 1 && d <= daysIn(m, y) && y >= 1000;
    return { text, iso: real ? `${year}-${month}-${day}` : "", invalid: !real };
}
/** `YYYY-MM-DD` to what the input shows. The inverse of the above, for when the calendar sets it. */
export function isoToDayFirst(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso))
        return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
}
