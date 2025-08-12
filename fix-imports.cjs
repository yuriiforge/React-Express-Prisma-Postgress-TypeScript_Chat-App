const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'backend', 'dist');

// Simplified regex patterns
const importExportRegex =
  /(from\s+['"]|import\s*\(\s*['"]|export\s+.*\s+from\s+['"])(\.\.?\/[^'"\)]+?)(?<!\.js)(['"]\)?)/g;
const sideEffectImportRegex =
  /(import\s+['"])(\.\.?\/[^'"\)]+?)(?<!\.js)(['"])/g;

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  let newContent = content
    .replace(importExportRegex, '$1$2.js$3')
    .replace(sideEffectImportRegex, '$1$2.js$3');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed imports in: ${path.relative(process.cwd(), filePath)}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  }
}

// Run the fixer
walkDir(directory);
console.log('Import fixes complete.');
