// DATA LAYER — a large remote reference list of US post codes, the kind you
// pick from but never eager-load. `loadOptions` (debounced server search) and
// `resolveOptions` (batch label resolve for already-selected codes) map 1:1 onto
// a real API; nothing above this file changes when you swap the bodies for
// `fetch(url, { signal })`.
//
// **It lives here so both editions' Markets screen picks from the same list.**
// It was `apps/web/reactjs/lib/api/post-codes.ts` and it had exactly one
// consumer, so `MARKETS_SCREEN` could not carry its own `loadOptions` while it
// stayed in the app. It never imported React, so the move is a move.
// Generate a few thousand codes deterministically (no Math.random) so search has
// something to chew on. Real data lives in your DB.
const CITIES = [
    ["Seattle", "981"],
    ["Portland", "972"],
    ["San Francisco", "941"],
    ["Austin", "787"],
    ["Denver", "802"],
    ["Chicago", "606"],
    ["New York", "100"],
    ["Miami", "331"],
    ["Boston", "021"],
    ["Phoenix", "850"],
    ["Atlanta", "303"],
    ["Dallas", "752"],
];
const ALL = CITIES.flatMap(([city, prefix]) => Array.from({ length: 100 }, (_, i) => {
    const code = `${prefix}${String(i).padStart(2, "0")}`;
    return { value: code, label: `${code} · ${city}` };
}));
const BY_CODE = new Map(ALL.map((o) => [o.value, o]));
// ponytail: simulated latency so the picker's loading state shows; a real
// fetch() has its own.
function wait(signal) {
    return new Promise((resolve, reject) => {
        const t = setTimeout(resolve, 250);
        signal.addEventListener("abort", () => {
            clearTimeout(t);
            reject(new DOMException("Aborted", "AbortError"));
        });
    });
}
/** Debounced server search: match a code or its city, cap the page. */
export async function searchPostCodes({ search, signal, }) {
    await wait(signal);
    const q = search.trim().toLowerCase();
    const hits = q ? ALL.filter((o) => o.label.toLowerCase().includes(q)) : ALL;
    return hits.slice(0, 50);
}
/** Batch-resolve the labels for already-selected codes — never the whole list. */
export async function resolvePostCodes(values) {
    return values.map((v) => BY_CODE.get(v) ?? { value: v, label: v });
}
