/**
 * The support desk: its tickets, its vocabulary and its two filters (`PD-037`).
 *
 * A ticket queue is fixtures plus a handful of rules, and both are what diverge when two editions
 * are typed out separately: whether "urgent" is red or orange, whether the search looks at the
 * reference as well as the subject, what "pending" means after a reply. None of that is layout.
 *
 * **The badge and dot classes are raw palette classes, deliberately and not happily.** `theme.css`
 * has one state colour, `destructive`, so success, warning and informational states have no token to
 * read: that gap is written up in `odin/AGENTS.md` § Known thin spots. Sharing the strings at least
 * means both editions are wrong in the same way, which is the difference between one bug and two.
 */
export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export interface TicketComment {
    id: number;
    author: string;
    role: "agent" | "customer";
    text: string;
    time: string;
}
export interface Ticket {
    id: number;
    ref: string;
    subject: string;
    requester: string;
    assignee: string;
    status: TicketStatus;
    priority: TicketPriority;
    updated: string;
    description: string;
    comments: TicketComment[];
}
export declare const TICKET_STATUS_BADGE: Record<TicketStatus, string>;
export declare const TICKET_PRIORITY_DOT: Record<TicketPriority, string>;
export declare const TICKET_STATUS_OPTIONS: readonly [{
    readonly value: "open";
    readonly label: "Open";
}, {
    readonly value: "pending";
    readonly label: "Pending";
}, {
    readonly value: "resolved";
    readonly label: "Resolved";
}];
export declare const TICKET_PRIORITY_OPTIONS: readonly [{
    readonly value: "low";
    readonly label: "Low";
}, {
    readonly value: "medium";
    readonly label: "Medium";
}, {
    readonly value: "high";
    readonly label: "High";
}, {
    readonly value: "urgent";
    readonly label: "Urgent";
}];
/** The ticket both editions open on, so a screenshot of one is a screenshot of the other. */
export declare const FIRST_TICKET: Ticket;
export declare const TICKETS: readonly Ticket[];
/**
 * Subject, reference or requester, and a status that is `all` or one of the three.
 *
 * Shared because it is the rule a reader tests by typing: an edition that searched the subject only
 * would look identical and behave differently.
 */
export declare function filterTickets(rows: readonly Ticket[], query: string, status: string): readonly Ticket[];
/** A reply must say something. Five characters is React's rule, verbatim. */
export declare const replyRule: (value: string) => "A reply must be at least 5 characters." | undefined;
/** What a reply does to the ticket: it becomes pending, and it was updated just now. */
export declare const REPLY_EFFECT: {
    readonly status: "pending";
    readonly updated: "just now";
};
export declare const SUPPORT_COPY: {
    readonly title: "Support";
    readonly searchPlaceholder: "Search tickets…";
    readonly allStatuses: "All statuses";
    readonly empty: "No tickets found.";
    readonly opened: "Opened this ticket";
    readonly replyLabel: "Your reply";
    readonly replyPlaceholder: "Write a reply…";
    readonly send: "Send reply";
    readonly props: {
        readonly status: "Status";
        readonly priority: "Priority";
        readonly requester: "Requester";
        readonly assignee: "Assignee";
        readonly updated: "Last updated";
    };
};
