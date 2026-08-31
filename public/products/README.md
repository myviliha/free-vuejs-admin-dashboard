# Product thumbnails

`recent-orders.tsx` looks for `macbook.webp`, `watch.webp`, `iphone.webp`, `ipad.webp` and
`airpods.webp` here, at 100 by 100. The whole set is under four kilobytes.

**Nothing breaks if they are absent.** `AvatarImage` removes itself when a `src` fails and the
product's initials show through, so the table renders either way. That is deliberate rather than
convenient: these are product photographs, so unlike MIT-licensed code they carry third-party rights
into anything built on this download. A buyer who deletes this folder should get a table that still
looks finished, not five broken-image glyphs.
