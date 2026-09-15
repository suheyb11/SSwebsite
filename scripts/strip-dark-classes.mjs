/**
 * Removes the dead `dark:` utilities left behind when dark mode was dropped.
 *
 * Nothing adds the `dark` class to <html> any more, so every one of these is
 * inert. They are worth removing rather than ignoring: they roughly double the
 * length of the longer className strings, and they are a trap — if anything ever
 * re-introduces the class, the site would half-switch into a theme nobody
 * maintains.
 *
 * Tailwind arbitrary values never contain a literal space (they use `_`), so a
 * `dark:` token always ends at the next whitespace or quote.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "src";
const EXT = /\.(tsx|ts|css)$/;

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXT.test(name)) out.push(full);
  }
  return out;
}

let files = 0;
let removed = 0;

for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");

  let after = before
    // A `dark:` utility plus the whitespace in front of it.
    .replace(/\s+dark:[^\s"'`]+/g, "")
    // The same at the very start of a class string.
    .replace(/(["'`])dark:[^\s"'`]+\s*/g, "$1");

  // Collapse the double spaces the removals leave inside class strings.
  after = after.replace(/(className=(?:"|'|\{`))([^"'`]*?)(\s{2,})/g, (m, head, body) =>
    head + body + " "
  );

  if (after === before) continue;

  removed += (before.match(/dark:/g) || []).length - (after.match(/dark:/g) || []).length;
  fs.writeFileSync(file, after);
  files += 1;
}

console.log(`removed ${removed} dead dark: utilities from ${files} files`);
