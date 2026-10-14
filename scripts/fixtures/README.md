# Reviewed production imagery

`people-free-images.json` records the visual review of the exact production image files used by the current website. The review found no people in the photography. It covers all 35 default main image sources, all four service-desk states (the initial state overlaps the 35), every responsive candidate, the client logo, and the three award sizes: 78 files total.

This is an explicit visual-review attestation, not an automated claim that software can detect every person. SHA-256 checks only whether the reviewed image bytes have changed. `qa-imagery.mjs` checks both files on disk and bytes returned by the running website. Existing broken-image, descriptive-alt, responsive/provenance, distinct-tab, and no-repeat checks remain active.

When changing imagery:

1. Open and inspect the full source and all responsive crops for people, misleading content, and obvious defects.
2. Check the actual rendered desktop and mobile placement and alternative text.
3. Deliberately update the reviewed description, date, and SHA-256 only after review. Add new paths explicitly.
4. Run `node scripts/qa-imagery.mjs`; set `QA_BASE_URL` to check a production preview.

Do not automatically regenerate hashes to make a failed check pass. Unused legacy assets are intentionally outside this manifest. Decorative code-native SVG drawings are not photographic imagery; the raster logo wrapper is included because it is rendered as an image.
