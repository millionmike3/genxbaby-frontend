const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith("route.ts")) continue;

    let src = fs.readFileSync(full, "utf8");

    // Remove duplicate NextResponse-only import
    src = src.replace(
      /import\s*\{\s*NextResponse\s*\}\s*from\s*["']next\/server["'];?/g,
      ""
    );

    // Clean up extra blank lines
    src = src.replace(/\n{3,}/g, "\n\n");

    fs.writeFileSync(full, src, "utf8");
    console.log("✔ Cleaned:", full);
  }
}

walk(path.join(process.cwd(), "app", "api"));
console.log("✨ Duplicate import cleanup complete.");
