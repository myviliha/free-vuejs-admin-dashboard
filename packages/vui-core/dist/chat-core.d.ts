/**
 * The chat demo's types, its canned replies and its two small rules (`PD-038`).
 *
 * **The reply text is the part that matters here.** It says, in as many words, that this is a demo
 * and where to wire a real model. Two editions typing that sentence separately is two different
 * promises to a buyer about what they just bought, and the version that drifts is always the one
 * nobody reread.
 *
 * `humanSize` and the title rule are shared for the ordinary reason: an attachment reading `1.2 MB`
 * in one edition and `1229 KB` in the other is a difference with no cause anyone can defend.
 */
export interface ChatAttachment {
    id: number;
    name: string;
    size: number;
    url: string;
    isImage: boolean;
}
export interface ChatMessage {
    id: number;
    role: "user" | "assistant";
    text: string;
    attachments: ChatAttachment[];
}
export interface ChatThread {
    id: number;
    title: string;
    messages: ChatMessage[];
}
export declare const CHAT_UNTITLED = "New chat";
export declare const CHAT_WELCOME: ChatMessage;
/**
 * The canned reply, which says what it is.
 *
 * ponytail: an echo so the composer feels live. Both editions point at the same sentence, so
 * replacing it with a real call is one edit rather than two.
 */
export declare function cannedReply(attachmentCount: number): string;
/** Bytes, kilobytes to the whole number, megabytes to one place. React's rounding exactly. */
export declare function humanSize(bytes: number): string;
/**
 * A thread takes its name from the first thing you say to it, to forty characters.
 *
 * Shared because it is what the sidebar shows: an edition truncating at thirty would list the same
 * conversation under a different name.
 */
export declare function chatTitleFrom(current: string, firstMessage: string): string;
/** The composer sends on Enter and newlines on Shift+Enter, in both editions. */
export declare const sendsOnEnter: (key: string, shift: boolean) => boolean;
/** How tall the composer may grow before it scrolls, in pixels. */
export declare const COMPOSER_MAX_HEIGHT = 160;
export declare const CHAT_COPY: {
    readonly title: "Chat";
    readonly newChat: "New chat";
    readonly placeholder: "Send a message…";
    readonly send: "Send";
    readonly attach: "Attach files";
    readonly placeholderLong: "Message the assistant…";
    readonly disclaimer: "Demo interface — responses are canned. Attachments stay in your browser.";
    readonly you: "You";
    readonly assistant: "Assistant";
};
