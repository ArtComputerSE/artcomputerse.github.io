import { rm, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Eleventy from "@11ty/eleventy";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "_site");
// Refuse to clean an output directory redirected outside this checkout.
const resolvedOutput = await realpath(output).catch((error) => {
  if (error.code === "ENOENT") return output;
  throw error;
});
if (path.relative(root, resolvedOutput) !== "_site") {
  throw new Error(`Unexpected build output: ${resolvedOutput}`);
}
await rm(output, { recursive: true, force: true });
process.chdir(root);
await new Eleventy().write();
