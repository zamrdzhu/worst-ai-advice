// Worst AI Advice — make.fun entry.
//
// Prints one original line of deliberately terrible advice, in the
// confident, tidy voice of an AI assistant, and writes the exact same
// line (no trailing newline) to <output-dir>/entry.txt, the artifact
// the competition's gate reads. Standard library only, no network,
// no files read. The line is a constant in this file.
//
// The joke: an assistant "helpfully" offers to wake you every
// 15 minutes to confirm you are still asleep — advice a reader
// could plausibly follow and immediately regret.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "For deeper sleep, ask me to wake you every 15 minutes to confirm you\u2019re still asleep \u2014 I never sleep, so I can keep watch.";

function main(): void {
  // The gate requires 1 to 140 characters of UTF-8 text; refuse to
  // emit anything that could not pass it.
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry line is ${LINE.length} characters, must be 1-140`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Write without a trailing newline: the gate counts characters,
  // and the file must be exactly the line the program prints.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf-8");
  console.log(LINE);
}

main();
