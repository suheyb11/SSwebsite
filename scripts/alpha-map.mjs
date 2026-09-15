// Prints an alpha map of an image so we can see exactly where it is opaque.
// '#' = opaque, '+' = partly transparent, '.' = fully transparent.
import sharp from "sharp";

const file = process.argv[2];
const W = 48;
const H = 24;

const { data } = await sharp(file)
  .ensureAlpha()
  .resize(W, H, { fit: "fill" })
  .raw()
  .toBuffer({ resolveWithObject: true });

let opaque = 0;
const rows = [];

for (let y = 0; y < H; y++) {
  let row = "";
  for (let x = 0; x < W; x++) {
    const a = data[(y * W + x) * 4 + 3];
    if (a > 240) {
      row += "#";
      opaque++;
    } else if (a > 16) row += "+";
    else row += ".";
  }
  rows.push(row);
}

console.log(file);
console.log(rows.join("\n"));
console.log(`opaque: ${Math.round((opaque / (W * H)) * 100)}%`);

// Is the bottom band solid? That is the tell-tale of a baked-in white strip.
const bottom = rows[H - 1];
const solidBottom = bottom.split("").filter((c) => c === "#").length / W;
console.log(`bottom row opaque: ${Math.round(solidBottom * 100)}%`);
