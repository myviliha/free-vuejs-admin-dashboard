export type NotificationKind = "mention" | "assignment" | "comment" | "system" | "billing";
export type Notification = {
    id: number;
    kind: NotificationKind;
    /** Who or what caused it. Rendered bold, ahead of the message. */
    actor: string;
    message: string;
    /** ISO timestamp. Formatted for display in the presentation layer. */
    at: string;
    read: boolean;
    /** Where clicking it should go, when there is somewhere to go. */
    href?: string;
    /** Secondary line: "3 comments", "Invoice #1043", and so on. */
    meta?: string;
};
/** Subscribe to changes, so the bell and an open page agree on the count. */
export declare function subscribeNotifications(listener: () => void): () => void;
export declare function listNotifications(): Promise<Notification[]>;
export declare function markRead(id: number): Promise<void>;
export declare function markAllRead(): Promise<void>;
export declare function unreadCount(items: readonly Notification[]): number;
/** The filter chips both editions show, in the order both show them. */
export declare const NOTIFICATION_FILTERS: readonly [{
    readonly id: "all";
    readonly label: "All";
}, {
    readonly id: "mention";
    readonly label: "Mentions";
}, {
    readonly id: "assignment";
    readonly label: "Assigned";
}, {
    readonly id: "system";
    readonly label: "System";
}];
export type NotificationFilter = (typeof NOTIFICATION_FILTERS)[number]["id"];
/** Pure, so the two controllers cannot disagree about what a filter means. */
export declare function filterNotifications(items: readonly Notification[], filter: NotificationFilter): Notification[];
/** "now", "5m", "3h", "2d", "6w". `now` is a parameter so a test can pin it. */
export declare function relativeTime(iso: string, now?: number): string;
