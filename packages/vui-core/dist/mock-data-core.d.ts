/**
 * The record screens' fixture data, shared by every edition.
 *
 * Moved from `apps/web/reactjs/lib/mock-data.ts` when the Vue demo started building the same screens.
 * Same argument as `demo-data-core.ts`: a demo whose branch list reads differently in two editions looks
 * like two products, and this file had **zero imports**, so moving it cost nothing.
 */
export interface Branch {
    id: number;
    organization: string;
    name: string;
    code: string;
    email: string;
    phone: string;
    city: string;
    isHeadquarters: boolean;
}
export declare const branches: Branch[];
export interface Department {
    id: number;
    organization: string;
    title: string;
    code: string;
    employees: number;
}
export declare const departments: Department[];
export interface Market {
    id: number;
    organization: string;
    name: string;
    centerLatitude: number | null;
    centerLongitude: number | null;
    radiusMiles: number | null;
    /** Attached post codes (M2M) — the set the market serves. */
    postCodes: string[];
}
export declare const markets: Market[];
export interface Business {
    id: number;
    title: string;
    code: string;
    description: string;
}
export declare const businesses: Business[];
export interface Region {
    id: number;
    name: string;
    code: string;
}
export declare const regions: Region[];
export interface Country {
    id: number;
    name: string;
    code: string;
    region: string;
}
export declare const countries: Country[];
export interface City {
    id: number;
    name: string;
    state: string;
    country: string;
}
export declare const cities: City[];
export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
}
export declare const currencies: Currency[];
export interface Language {
    id: number;
    name: string;
    code: string;
}
export declare const languages: Language[];
