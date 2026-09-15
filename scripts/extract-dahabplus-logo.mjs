// Pulls a usable DahabPlus logo out of the one asset that contains it.
//
// There is no logo file for the app anywhere in the project — only
// "Dahab plus.png", a 2375x2710 promotional cut-out of a man leaning on a giant
// phone. The app's own wordmark is inside that phone's screen, so this crops it
// out and drops the white screen behind it, giving a mark that can sit on the
// navy strip without carrying a white box around with it.
//
// Run with: node scripts/extract-dahabplus-logo.mjs

import sharp from "sharp";

const SRC = "public/assets/images/Dahab plus.png";
const OUT = "public/assets/images/dahabplus-logo.png";

// Measured against the source: below the phone's notch, around the wordmark.
const box = { left: 676, top: 710, width: 356, height: 94 };

const cropped = await sharp(SRC).extract(box).toBuffer();
const { data, info } = await sharp(cropped).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  // Near-white is the screen, not the logo. The mark itself is green and gold,
  // so nothing in it is anywhere near this bright.
  if (data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232) data[i + 3] = 0;
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(OUT);

console.log(`${OUT} — ${info.width}x${info.height}`);
