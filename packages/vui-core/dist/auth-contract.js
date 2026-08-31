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
export {};
