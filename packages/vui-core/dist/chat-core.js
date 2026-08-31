export const CHAT_UNTITLED = "New chat";
export const CHAT_WELCOME = {
    id: 0,
    role: "assistant",
    text: "Hi! I'm your assistant. Ask me anything, or attach an image or file and I'll take a look.",
    attachments: [],
};
/**
 * The canned reply, which says what it is.
 *
 * ponytail: an echo so the composer feels live. Both editions point at the same sentence, so
 * replacing it with a real call is one edit rather than two.
 */
export function cannedReply(attachmentCount) {
    return attachmentCount
        ? `Got your ${attachmentCount} attachment${attachmentCount > 1 ? "s" : ""}. This is a demo response — wire this to the Claude API to make it real.`
        : "This is a demo response — wire this composer to the Claude API to make it real.";
}
/** Bytes, kilobytes to the whole number, megabytes to one place. React's rounding exactly. */
export function humanSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
/**
 * A thread takes its name from the first thing you say to it, to forty characters.
 *
 * Shared because it is what the sidebar shows: an edition truncating at thirty would list the same
 * conversation under a different name.
 */
export function chatTitleFrom(current, firstMessage) {
    return current === CHAT_UNTITLED && firstMessage ? firstMessage.slice(0, 40) : current;
}
/** The composer sends on Enter and newlines on Shift+Enter, in both editions. */
export const sendsOnEnter = (key, shift) => key === "Enter" && !shift;
/** How tall the composer may grow before it scrolls, in pixels. */
export const COMPOSER_MAX_HEIGHT = 160;
export const CHAT_COPY = {
    title: "Chat",
    newChat: "New chat",
    placeholder: "Send a message…",
    send: "Send",
    attach: "Attach files",
    placeholderLong: "Message the assistant…",
    disclaimer: "Demo interface — responses are canned. Attachments stay in your browser.",
    you: "You",
    assistant: "Assistant",
};
