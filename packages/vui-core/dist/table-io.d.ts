/**
 * Import/export helpers for RecordView datatables — no external dependencies.
 * CSV/JSON round-trip fully; "Excel" is an HTML table saved as .xls (Excel opens
 * it); PDF is browser print-to-PDF. True .xlsx read/write would need a library.
 */
export type IoColumn = {
    key: string;
    label: string;
};
type Row = Record<string, unknown>;
export declare function rowsToCSV(cols: IoColumn[], rows: Row[]): string;
export declare function rowsToTableHTML(cols: IoColumn[], rows: Row[]): string;
export declare function downloadFile(filename: string, content: string, mime: string): void;
/** Open a print window with the table; the user saves as PDF from the dialog. */
export declare function printTable(title: string, tableHTML: string): void;
/** Minimal CSV parser → objects keyed by header row. Handles quoted fields. */
export declare function parseCSV(text: string): Record<string, string>[];
export {};
