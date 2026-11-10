# Project screenshots

Written by `npm run previews`, which captures each deployed project as
`<id>.jpg` (1280×720) and regenerates `src/lib/previews.ts`, the manifest the
project cards read. A card only requests a file the manifest lists.

Regenerate whenever a project's UI changes, then commit both the images and
the manifest.
