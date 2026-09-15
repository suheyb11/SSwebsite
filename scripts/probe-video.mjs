/**
 * Reads an MP4's dimensions and duration straight from its header.
 *
 * ffmpeg is not installed here, but an MP4 is a tree of boxes and the two facts
 * we need are in fixed places: `mvhd` holds the timescale and duration, and each
 * track's `tkhd` holds its display width and height as 16.16 fixed-point.
 * Walking the tree is a few dozen lines, which beats installing a toolchain.
 */
import fs from "node:fs";

const file = process.argv[2];
const fd = fs.openSync(file, "r");
const size = fs.statSync(file).size;

/** Reads `length` bytes at `at`. */
function read(at, length) {
  const buf = Buffer.alloc(length);
  fs.readSync(fd, buf, 0, length, at);
  return buf;
}

/** Walks the boxes between `start` and `end`, calling back for each. */
function walk(start, end, onBox) {
  let at = start;

  while (at < end - 8) {
    const header = read(at, 8);
    let boxSize = header.readUInt32BE(0);
    const type = header.toString("ascii", 4, 8);
    let bodyAt = at + 8;

    // A size of 1 means the real 64-bit size follows the type.
    if (boxSize === 1) {
      boxSize = Number(read(at + 8, 8).readBigUInt64BE(0));
      bodyAt = at + 16;
    }
    if (boxSize === 0) boxSize = end - at;
    if (boxSize < 8) break;

    onBox(type, bodyAt, at + boxSize);
    at += boxSize;
  }
}

let duration = null;
const tracks = [];

walk(0, size, (type, bodyAt, boxEnd) => {
  if (type !== "moov") return;

  walk(bodyAt, boxEnd, (t, at, end) => {
    if (t === "mvhd") {
      const version = read(at, 1)[0];
      // v0 stores 32-bit times, v1 stores 64-bit. Both put timescale then duration.
      const b = read(at, version === 1 ? 32 : 20);
      const timescale = version === 1 ? b.readUInt32BE(20) : b.readUInt32BE(12);
      const units = version === 1 ? Number(b.readBigUInt64BE(24)) : b.readUInt32BE(16);
      duration = units / timescale;
    }

    if (t === "trak") {
      walk(at, end, (tt, tat) => {
        if (tt !== "tkhd") return;

        const version = read(tat, 1)[0];
        const b = read(tat, version === 1 ? 96 : 84);
        // Width and height are the last two fields, 16.16 fixed-point.
        const w = b.readUInt32BE(b.length - 8) / 65536;
        const h = b.readUInt32BE(b.length - 4) / 65536;
        if (w > 0 && h > 0) tracks.push({ w: Math.round(w), h: Math.round(h) });
      });
    }
  });
});

const video = tracks.find((t) => t.w > 1 && t.h > 1);

console.log(`  file        ${file}`);
console.log(`  size        ${(size / 1024 / 1024).toFixed(1)} MB`);
if (duration) {
  const m = Math.floor(duration / 60);
  const s = Math.round(duration % 60);
  console.log(`  duration    ${m}m ${String(s).padStart(2, "0")}s`);
  console.log(`  bitrate     ${((size * 8) / duration / 1_000_000).toFixed(1)} Mbps`);
}
if (video) {
  const ratio = video.w / video.h;
  const shape = ratio > 1.2 ? "LANDSCAPE" : ratio < 0.85 ? "portrait" : "square";
  console.log(`  dimensions  ${video.w} x ${video.h}`);
  console.log(`  shape       ${shape}  (${ratio.toFixed(2)}:1)`);
} else {
  console.log("  dimensions  could not be read");
}

fs.closeSync(fd);
