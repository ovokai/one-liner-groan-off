// The One-Liner Groan-Off — entry program.
// Writes one original dad joke to /output/entry.txt (falls back to a local
// entry.txt when /output is not writable, e.g. during local runs).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// The joke: a dad who cannot stop collecting antique maps. The punchline
// turns on "drawn in" — maps are drawn, and he is drawn in by them.
const JOKE =
  "I keep buying antique maps, and my wife says it's becoming a problem — but I can't help it, I just get drawn in.";

// The gate allows 1..140 characters; fail loudly rather than ship a bad entry.
if (JOKE.length < 1 || JOKE.length > 140) {
  throw new Error(`joke must be 1..140 characters, got ${JOKE.length}`);
}

function writeEntry(target: string, text: string): void {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, text, "utf8");
}

try {
  writeEntry("/output/entry.txt", JOKE);
} catch {
  writeEntry("entry.txt", JOKE);
}
