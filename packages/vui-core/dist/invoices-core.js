const CUSTOMERS = [
    "Northwind Traders",
    "Contoso",
    "Fabrikam",
    "Adventure Works",
    "Tailspin Toys",
    "Wide World Importers",
    "Proseware",
];
const STATUSES = ["paid", "pending", "overdue"];
export const INVOICES = Array.from({ length: 47 }, (_, i) => ({
    id: `INV-${String(1041 + i)}`,
    customer: CUSTOMERS[i % CUSTOMERS.length],
    status: STATUSES[i % STATUSES.length],
    issued: new Date(2026, i % 12, ((i * 7) % 27) + 1),
    amount: 250 + ((i * 137) % 8400),
}));
/** Which badge a status wears. Shared so a paid invoice is never green here and grey there. */
export const INVOICE_TONE = {
    paid: "default",
    pending: "secondary",
    overdue: "destructive",
};
/** The two formatters both editions use, so a date and an amount read identically. */
export const invoiceMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const invoiceDay = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
