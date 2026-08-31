/**
 * The invoice fixture the basic datatable draws, in both editions.
 *
 * Generated rather than written out: 47 rows is enough to page and sort meaningfully, and a
 * generator says what the shape is more clearly than 47 literals would. **Deterministic on
 * purpose** (no `Math.random`, no `Date.now`), so the two editions and any screenshot of either
 * show the same table.
 *
 * It lives here rather than in the React page because that page was the only definition, so a Vue
 * port had to retype it and the two demos would have drifted the first time either changed.
 */
export interface Invoice {
    id: string;
    customer: string;
    status: "paid" | "pending" | "overdue";
    issued: Date;
    amount: number;
}
export declare const INVOICES: Invoice[];
/** Which badge a status wears. Shared so a paid invoice is never green here and grey there. */
export declare const INVOICE_TONE: Record<Invoice["status"], "default" | "secondary" | "destructive">;
/** The two formatters both editions use, so a date and an amount read identically. */
export declare const invoiceMoney: Intl.NumberFormat;
export declare const invoiceDay: Intl.DateTimeFormat;
