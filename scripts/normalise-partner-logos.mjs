// Puts every partner logo on the same canvas.
//
// The strip used to render each file at a fixed height with the width left to
// follow, which suits a wide wordmark and leaves a round or square mark looking
// half the size beside it — there was a hand-maintained list of exceptions
// (SMALLER) trying to patch that up one name at a time.
//
// Instead each logo is centred on one transparent canvas of the same size. A
// wide wordmark fills it edge to edge, a square mark sits in the middle of it,
// and both occupy exactly the same space in the row. No exceptions list.
//
//   node scripts/normalise-partner-logos.mjs
//
// Re-running is safe: a file already at the canvas size is left alone.

import sharp from "sharp";
import { statSync } from "node:fs";

const DIR = "public/assets/images/brand";

// The box every logo gets, whatever its own shape.
//
// These range from square (Huawei, eDahab, DBI at 1:1) to a long wordmark
// (Dahabshiil Motors at 4.4:1), and one box has to hold both. 2:1 is the
// compromise that treats them evenly: a square mark fills the height and half
// the width, a long wordmark fills the width at about half the height. Wider
// than this and the square marks are marooned in empty space.
const W = 400;
const H = 200;

// The files the partner rows actually point at. The rest of the folder is
// leftovers — stock logo templates and blank images.
const IN_USE = [
  "bluecom.png",
  "bluesky.png",
  "huwei.png",
  "edahab.png",
  "dbi.png",
  "dmt.png",
  "geeye.png",
  "dahab-motors.png",
  "dahab-realestate.png",
];

for (const file of IN_USE) {
  const path = `${DIR}/${file}`;

  let meta;
  try {
    meta = await sharp(path).metadata();
  } catch {
    console.log(`  ${file.padEnd(22)} missing, skipped`);
    continue;
  }

  if (meta.width === W && meta.height === H) {
    console.log(`  ${file.padEnd(22)} already ${W}x${H}`);
    continue;
  }

  const before = statSync(path).size;

  // Trim first. Several of these files carry a wide empty border baked into
  // the image — dbi and dmt are 225x225 with the mark sitting small in the
  // middle — and scaling that to fit only scales the emptiness with it, so the
  // logo lands in the row looking half the size of its neighbours. Trimming to
  // the ink means every logo is measured by the mark itself.
  const buf = await sharp(path)
    .trim({ threshold: 10 })
    .resize(W - 24, H - 24, { fit: "inside", withoutEnlargement: false })
    .extend({
      top: 0, bottom: 0, left: 0, right: 0,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const out = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: buf, gravity: "centre" }])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  await sharp(out).toFile(path);

  const after = statSync(path).size;
  console.log(
    `  ${file.padEnd(22)} ${meta.width}x${meta.height} -> ${W}x${H}   ` +
      `${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB`
  );
}

console.log(`\nEvery logo is now ${W}x${H}. The strip can render them all at one size.`);
