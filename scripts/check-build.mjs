import assert from "node:assert/strict";
import { readdir, readFile, stat, lstat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../_site/", import.meta.url));
const files = [];
async function walk(directory = "") {
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    const name = path.posix.join(directory, entry.name);
    const info = await lstat(path.join(root, name));
    assert(!info.isSymbolicLink() && (info.isDirectory() || info.nlink <= 1), `Link in build: ${name}`);
    if (entry.isDirectory()) await walk(name);
    else files.push(name);
  }
}
await walk();
const iconFiles = ["favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png", "safari-pinned-tab.svg", "mstile-150x150.png", "manifest.json", "browserconfig.xml"];
const rootFiles = new Set(["index.html", "404.html", "CNAME", ".nojekyll", ...iconFiles]);
for (const file of files) {
  const allowed = rootFiles.has(file)
    || file === "assets/site.css"
    || file === "cv/index.html"
    || file === "kontakt/index.html"
    || file === "image/logotype.png"
    || file === "image/artcomputer-icon.png"
    || /^kurser\/[^/]+\.pdf$/.test(file)
    || /^kurser\/[^/]+\/index\.html$/.test(file);
  assert(allowed, `Unexpected published file: ${file}`);
}
assert.equal((await readFile(path.join(root, "CNAME"), "utf8")).trim(), "artcomputer.se");
assert(files.includes(".nojekyll"));
for (const icon of iconFiles) assert(files.includes(icon), `Missing icon asset: ${icon}`);
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
for (const icon of manifest.icons) {
  assert(files.includes(new URL(icon.src, "https://artcomputer.se").pathname.slice(1)), `Missing manifest icon: ${icon.src}`);
}
const browserConfig = await readFile(path.join(root, "browserconfig.xml"), "utf8");
for (const match of browserConfig.matchAll(/src="([^"]+)"/g)) {
  assert(files.includes(new URL(match[1], "https://artcomputer.se").pathname.slice(1)), `Missing Windows icon: ${match[1]}`);
}
let links = 0;
for (const file of files.filter(name => name.endsWith(".html"))) {
  const html = await readFile(path.join(root, file), "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), `https://artcomputer.se/${file}`);
    if (url.origin !== "https://artcomputer.se") continue;
    let target = decodeURIComponent(url.pathname).slice(1);
    if (!target || target.endsWith("/")) target += "index.html";
    assert(files.includes(target), `Missing local target in ${file}: ${match[1]}`);
    if (url.hash && target.endsWith(".html")) {
      const text = await readFile(path.join(root, target), "utf8");
      assert(text.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor: ${match[1]}`);
    }
    links++;
  }
}
const bytes = (await Promise.all(files.map(file => stat(path.join(root, file))))).reduce((sum, info) => sum + info.size, 0);
console.log(`Verified ${files.length} published files, ${links} local references, CNAME and .nojekyll. Total ${(bytes / 1024 / 1024).toFixed(2)} MiB.`);
