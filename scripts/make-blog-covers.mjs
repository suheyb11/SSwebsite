// Builds article covers out of the wide slider banners.
//
// The banners are 8000x2421 — roughly 3.3:1 — and they are laid out for a hero
// strip: a flat field of brand colour on the left, the subject standing in the
// right quarter. Dropped into a 16:9 card with object-cover, the centre crop
// lands entirely on the empty colour and you get a yellow rectangle with a
// headless shoulder at one edge, which is what the blog was showing.
//
// So rather than crop the middle, crop the subject: measure where the
// non-background pixels actually are, centre a 16:9 window on them, and slide
// that window back inside the frame if it runs off the edge.
//
// Run with: node scripts/make-blog-covers.mjs

import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT_DIR = "public/assets/images/blog";
const WIDTH = 1600;

const sources = [
  { file: "public/assets/images/slider/int.jpg", out: "fibre-coverage.jpg" },
  { file: "public/assets/images/slider/edhb1.jpg", out: "edahab-milestone.jpg" },
];

/**
 * Where the subject sits, as a fraction across the image.
 *
 * Found by detail, not by colour. Matching "the background colour" needs a rule
 * per image and gets it wrong the moment the field is a gradient rather than
 * flat — which is how the green banner is built, and it pulled the crop onto the
 * empty side. Detail has no such problem: a flat or smoothly graded field has
 * almost no vertical change from one row to the next, while a person is full of
 * it. Summing that change per column finds the subject on any background.
 */
async function subjectCentre(file) {
  const W = 400;
  const H = 121;

  const { data } = await sharp(file)
    .resize(W, H, { fit: "fill" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const columns = new Array(W).fill(0);

  for (let y = 0; y < H - 1; y++) {
    for (let x = 0; x < W; x++) {
      columns[x] += Math.abs(data[(y + 1) * W + x] - data[y * W + x]);
    }
  }

  // Keep the columns carrying real detail, relative to the busiest one, so the
  // threshold suits the image instead of being a number picked in advance.
  const peak = Math.max(...columns);
  const busy = columns.map((n, x) => ({ x, n })).filter(({ n }) => n > peak * 0.18);
  if (busy.length === 0) return 0.5;

  return (busy[0].x + busy[busy.length - 1].x) / 2 / W;
}

await mkdir(OUT_DIR, { recursive: true });

for (const { file, out } of sources) {
  const { width, height } = await sharp(file).metadata();
  const centre = await subjectCentre(file);

  const cropWidth = Math.round((height * 16) / 9);
  const left = Math.max(0, Math.min(width - cropWidth, Math.round(centre * width - cropWidth / 2)));

  await sharp(file)
    .extract({ left, top: 0, width: cropWidth, height })
    .resize(WIDTH, Math.round((WIDTH * 9) / 16))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT_DIR}/${out}`);

  console.log(
    `${out}: subject at ${(centre * 100).toFixed(0)}% — cropped ${cropWidth}x${height} from x=${left}`
  );
}
