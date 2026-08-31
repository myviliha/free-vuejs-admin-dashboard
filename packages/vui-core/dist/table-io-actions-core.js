/**
 * The Import and Export menus the theme ships, built from the same {@link IoAction} type a host uses.
 * That is the point: the defaults are not a special case in the component, they are one particular
 * list, so replacing them or adding to them is the same API rather than a different one.
 *
 * They do the work in the browser: read the file the person picked, write the file they asked for. That
 * is right for a demo and for small lists, and wrong as soon as the data outgrows the page someone is
 * looking at, because the browser only has that page. When that happens, point the actions at your API
 * and use `ctx.query` to ask for everything that matches.
 *
 * **The four icons are injected**, which is the only reason this could live here: everything else in the
 * file was already framework-free. Each edition passes its own components, and an edition whose menu
 * takes the glyph as a slot passes none. The ids, the labels, the accepts and the handlers are then one
 * list rather than two that agree today.
 *
 * Lifted out of `table-io-actions.tsx` on 2026-08-20 for wave 6 of the Vue parity epic.
 */
import { downloadFile, parseCSV, printTable, rowsToCSV, rowsToTableHTML, } from "./table-io.js";
const fileBase = (title) => title.toLowerCase().replace(/\s+/g, "-") || "export";
/** Export: CSV, Excel, JSON, and PDF via the print dialog. */
export function defaultExportActions(icons = {}) {
    const rows = (ctx) => ctx.rows;
    const cols = (ctx) => ctx.columns;
    return [
        {
            id: "csv",
            label: "CSV",
            icon: icons.csv,
            onAct: (ctx) => downloadFile(`${fileBase(ctx.title)}.csv`, rowsToCSV(cols(ctx), rows(ctx)), "text/csv;charset=utf-8"),
        },
        {
            id: "excel",
            label: "Excel",
            icon: icons.excel,
            onAct: (ctx) => downloadFile(`${fileBase(ctx.title)}.xls`, rowsToTableHTML(cols(ctx), rows(ctx)), "application/vnd.ms-excel"),
        },
        {
            id: "json",
            label: "JSON",
            icon: icons.json,
            onAct: (ctx) => downloadFile(`${fileBase(ctx.title)}.json`, JSON.stringify(rows(ctx), null, 2), "application/json"),
        },
        {
            id: "pdf",
            label: "PDF",
            icon: icons.pdf,
            onAct: (ctx) => printTable(ctx.title, rowsToTableHTML(cols(ctx), rows(ctx))),
        },
    ];
}
/**
 * Import: read a CSV or JSON file in the browser and put the rows into the table. Values are matched to
 * fields by key first, then by label, so a spreadsheet exported from this table imports back into it.
 */
export function defaultImportActions(makeEmptyRow, nextId, icons = {}) {
    if (!makeEmptyRow)
        return []; // read-only list: nothing to import into
    const read = async (ctx) => {
        const file = ctx.file;
        if (!file)
            return;
        const text = await file.text();
        let records = [];
        try {
            if (file.name.toLowerCase().endsWith(".json")) {
                const parsed = JSON.parse(text);
                records = Array.isArray(parsed) ? parsed : [];
            }
            else {
                records = parseCSV(text);
            }
        }
        catch {
            return; // malformed file: nothing imported, table untouched
        }
        const byKey = new Map(ctx.columns.map((c) => [c.key.toLowerCase(), c.key]));
        const byLabel = new Map(ctx.columns.map((c) => [c.label.toLowerCase(), c.key]));
        const rows = records.map((record) => {
            const row = { ...makeEmptyRow(), id: nextId() };
            for (const [name, value] of Object.entries(record)) {
                const key = byKey.get(name.toLowerCase()) ?? byLabel.get(name.toLowerCase());
                if (key)
                    row[key] = value;
            }
            return row;
        });
        if (rows.length)
            ctx.applyRows(rows);
    };
    return [
        { id: "csv", label: "CSV", icon: icons.csv, pickFile: true, accept: ".csv", onAct: read },
        { id: "json", label: "JSON", icon: icons.json, pickFile: true, accept: ".json", onAct: read },
        {
            id: "excel",
            label: "Excel",
            icon: icons.excel,
            pickFile: true,
            // Excel exports as CSV; a real .xls is a binary format the browser can't read without a parser,
            // and this package doesn't ship one.
            accept: ".csv",
            onAct: read,
        },
    ];
}
/** Apply a host's config to a shipped list: an array replaces, a function edits. */
export function resolveIoActions(defaults, config) {
    if (!config)
        return defaults;
    return typeof config === "function" ? config(defaults) : config;
}
