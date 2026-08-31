/**
 * The calendar screen's configuration, shared by every edition that draws one.
 *
 * **The HTML edition had no calendar at all.** `check:parity` carried an allowance saying FullCalendar
 * builds its entire DOM at runtime and a static export therefore contains an empty container, which
 * was true and was still an empty page where the other two editions show a month (`PD-149`). The dev's
 * ruling on the charts settled the principle: the reference edition we are held against bundles this
 * library, so ours draws a real calendar and the exemption goes.
 *
 * These values were written twice, identically, in `apps/web/free-react/app/(shell)/calendar/page.tsx`
 * and `apps/web/free-vue/src/screens/CalendarScreen.vue`. A third copy in a browser script is what
 * finally made them worth hoisting: the same reason the chart options live in `apex-core.ts`
 * (`PD-128`).
 *
 * The callbacks stay at the call sites. Opening a dialog to add an event is behaviour each edition
 * wires its own way, and the static one cannot do it at all, because the dialog is a portal that never
 * reaches the exported markup.
 */
/** The toolbar, the view names and the sizing. Everything here is a value, so a script can use it. */
export const FULLCALENDAR_BASE = {
    initialView: "dayGridMonth",
    headerToolbar: {
        left: "prev,next addEventButton",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    /*
     * Title Case, which is the house standard for any visible label. FullCalendar's own defaults are
     * lowercase ("month", "week", "day"), and a control's label is a proper noun in this product's
     * voice: "Month" sits beside "Add Event" and "Today" without one of them looking like a variable.
     */
    buttonText: { dayGridMonth: "Month", timeGridWeek: "Week", timeGridDay: "Day" },
    selectable: true,
    height: "auto",
};
/** "Add Event", not "Add Event +". The plus is what a button does, not part of its name. */
export const FULLCALENDAR_ADD_LABEL = "Add Event";
/**
 * The three demo events, dated from whenever this is called.
 *
 * **Called at runtime, never at module load.** Evaluated while a module loads, "today" is baked into
 * a static build, so an exported demo shows the week it was built rather than the week it is opened.
 * Every edition asks for these after mount for that reason (`PD-135`).
 */
export function calendarSeedEvents() {
    const day = (offset) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return date.toISOString().slice(0, 10);
    };
    return [
        { id: "1", title: "Event Conf.", start: day(0), extendedProps: { calendar: "Danger" } },
        { id: "2", title: "Meeting", start: day(1), extendedProps: { calendar: "Success" } },
        {
            id: "3",
            title: "Workshop",
            start: day(2),
            end: day(3),
            extendedProps: { calendar: "Primary" },
        },
    ];
}
/** The pill's wrapper class, which `fullcalendar.css` colours from the level. */
export const fullcalendarEventClass = (level) => `event-fc-color fc-event-main flex fc-bg-${String(level).toLowerCase()}`;
