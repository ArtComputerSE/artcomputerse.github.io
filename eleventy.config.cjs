module.exports = function (eleventyConfig) {
  const fs = require("node:fs");
  const path = require("node:path");
  eleventyConfig.addPassthroughCopy({ "web/kurser/*.pdf": "kurser" });
  eleventyConfig.addWatchTarget("web/kurser/*.pdf");
  eleventyConfig.addFilter("courseDescriptionPdf", (inputPath) => {
    const pdfPath = inputPath.replace(/\.md$/, ".pdf");
    return pdfPath !== inputPath && fs.existsSync(pdfPath)
      ? `/kurser/${encodeURIComponent(path.basename(pdfPath))}`
      : null;
  });
  eleventyConfig.addPassthroughCopy({ "web/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");
  for (const icon of [
    "favicon.ico", "favicon-16x16.png", "favicon-32x32.png",
    "apple-touch-icon.png", "android-chrome-192x192.png",
    "android-chrome-512x512.png", "safari-pinned-tab.svg",
    "mstile-150x150.png", "manifest.json", "browserconfig.xml",
  ]) {
    eleventyConfig.addPassthroughCopy(icon);
  }
  eleventyConfig.addPassthroughCopy({ "image/logotype.png": "image/logotype.png" });
  eleventyConfig.addPassthroughCopy({ "image/artcomputer-icon.png": "image/artcomputer-icon.png" });
  eleventyConfig.addCollection("courses", (api) =>
    api
      .getFilteredByTag("course")
      .sort((a, b) => a.data.title.localeCompare(b.data.title, "sv")),
  );
  return {
    dir: { input: "web", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
