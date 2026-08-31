/**
 * The authentication contract, framework-free.
 *
 * **The contract is the family.** Its own documentation tells a host to "pass an adapter that
 * implements `AuthContract`", and if each edition declared its own, an adapter written for one would
 * not type-check against the other: two declarations quietly become two contracts. Sharing it is what
 * makes "one design system, two editions" true for the piece a host actually implements.
 *
 * Nothing here touches a framework, so it moves unchanged.
 */
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
/** The minimal user shape the screens/chrome need. Extend in your adapter. */
export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    image?: string;
}
export interface Credentials {
    email: string;
    password: string;
    /**
     * Whether the session survives closing the browser. Optional, and off when absent, because a
     * checkbox that must be ticked is not a checkbox.
     *
     * It does **not** extend the session's lifetime, which is the server's to decide. An adapter
     * whose provider has no such concept ignores it, which is why this is optional rather than a
     * second method.
     */
    rememberMe?: boolean;
}
export interface SignUpInput {
    email: string;
    password: string;
    name?: string;
}
/** What every adapter implements. Optional methods are capability flags — a
 *  screen shows the matching UI only when the adapter provides them. */
export interface AuthContract {
    user: AuthUser | null;
    status: AuthStatus;
    /** Email + password sign-in. Reject (throw) on failure with a user-facing message. */
    signIn(creds: Credentials): Promise<void>;
    /** Email + password sign-up. Omit if your flow is invite/magic-link only. */
    signUp?(input: SignUpInput): Promise<void>;
    /** OAuth / social sign-in (e.g. "google", "github"). Omit to hide the buttons. */
    signInSocial?(provider: string): Promise<void>;
    signOut(): Promise<void>;
}
