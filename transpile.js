import { promises as fs } from "fs";
import path from "path";
import * as babel from "@babel/core";
import prettier from "prettier";

async function run() {
  // We don't use glob module if it's not installed, we can just write a simple recursive function
  const srcDir = path.join(process.cwd(), "src");

  async function walk(dir) {
    let files = [];
    const list = await fs.readdir(dir);
    for (const file of list) {
      const filepath = path.join(dir, file);
      const stat = await fs.stat(filepath);
      if (stat.isDirectory()) {
        files = files.concat(await walk(filepath));
      } else {
        if (filepath.endsWith(".ts") || filepath.endsWith(".tsx")) {
          files.push(filepath);
        }
      }
    }
    return files;
  }

  const files = await walk(srcDir);
  console.log(`Found ${files.length} TypeScript files to transpile.`);

  for (const file of files) {
    console.log(`Processing: ${file}`);
    const code = await fs.readFile(file, "utf8");
    const isTSX = file.endsWith(".tsx");

    // Use Babel to strip types. We only use preset-typescript.
    // To preserve JSX (so it remains .jsx instead of being compiled to React.createElement),
    // we configure the preset to only strip types and NOT compile JSX.
    // wait, preset-typescript doesn't compile JSX anyway, it only strips TS types,
    // except it MIGHT strip JSX if not told it's TSX.
    try {
      const result = await babel.transformAsync(code, {
        filename: file,
        presets: [["@babel/preset-typescript", { isTSX, allExtensions: true }]],
        // retainLines helps debugging but might look weird. We'll format with prettier anyway.
        retainLines: false,
        compact: false,
      });

      if (!result || result.code == null) continue;

      let newCode = result.code;

      // Ensure empty interfaces and type exports don't leave lingering empty blocks that prettier formats weirdly,
      // actually babel handles that nicely.

      // Run prettier using local config
      const prettierConfig = (await prettier.resolveConfig(file)) || {};
      newCode = await prettier.format(newCode, {
        ...prettierConfig,
        filepath: isTSX ? file.replace(/\.tsx$/, ".jsx") : file.replace(/\.ts$/, ".js"),
      });

      const newFile = isTSX ? file.replace(/\.tsx$/, ".jsx") : file.replace(/\.ts$/, ".js");
      await fs.writeFile(newFile, newCode, "utf8");

      // Delete old file
      await fs.unlink(file);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
  console.log("Transpilation complete!");
}

run().catch(console.error);
