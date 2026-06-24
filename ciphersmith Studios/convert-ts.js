import fs from "fs";
import path from "path";
import ts from "typescript";

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
    if (filePath.endsWith(".d.ts")) {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${filePath}`);
      return;
    }

    const code = fs.readFileSync(filePath, "utf-8");
    const isTSX = filePath.endsWith(".tsx");

    try {
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.Preserve,
          removeComments: false,
        },
        fileName: filePath,
      });

      if (result && result.outputText) {
        let newCode = result.outputText;
        // Simple regex replace for internal import extensions if any
        newCode = newCode.replace(/from\s+['"]([^'"]+)\.tsx?['"]/g, "from '$1'");

        const newExt = isTSX ? ".jsx" : ".js";
        const newPath = filePath.replace(/\.tsx?$/, newExt);
        fs.writeFileSync(newPath, newCode);
        fs.unlinkSync(filePath);
        console.log(`Converted ${filePath} -> ${newPath}`);
      }
    } catch (err) {
      console.error(`Error converting ${filePath}:`, err);
    }
  }
}

// Convert all files in src
walkDir("src", processFile);

// Also convert root files like vite.config.ts if they exist
const rootFiles = ["vite.config.ts", "server.ts"];
rootFiles.forEach((f) => {
  if (fs.existsSync(f)) {
    processFile(f);
  }
});
