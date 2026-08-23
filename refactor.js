const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const organismsDir = path.join(componentsDir, 'organisms');
const libAnimations = '@/lib/animations';

const foldersToMove = [
  'about',
  'checkout',
  'contact',
  'menu',
  'orders',
  'organisms/bulk-order',
  'organisms/gallery'
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace animation imports
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']\.\/animations["']/g, `import { $1 } from "${libAnimations}"`);
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']\.\.\/animations["']/g, `import { $1 } from "${libAnimations}"`);

  // Replace type imports
  content = content.replace(/import\s+(type\s+)?\{([^}]+)\}\s+from\s+["']\.\/types["']/g, `import $1{ $2 } from "./CheckoutTypes"`);
  
  // Replace local relative imports with organisms path
  // Since all files are moving to organisms, relative imports of other components in the same folder 
  // will just become `./ComponentName` or they might already be `./ComponentName`.
  // Wait, if they were in the same folder, they were `./ComponentName`. Since they are both moving to `organisms`, 
  // `./ComponentName` is STILL valid! So we don't even need to change it, except if they were importing from a parent.
  // Wait, `app/checkout/CheckoutClient.tsx` imports from `@/components/checkout/...`.
  // We need to update `app/**/*.tsx` to point to `@/components/organisms/...`.

  fs.writeFileSync(filePath, content);
}

// First, handle types files manually to avoid collisions
// For checkout types
if (fs.existsSync(path.join(componentsDir, 'checkout/types.ts'))) {
  fs.copyFileSync(path.join(componentsDir, 'checkout/types.ts'), path.join(organismsDir, 'CheckoutTypes.ts'));
}
// For gallery types
if (fs.existsSync(path.join(componentsDir, 'organisms/gallery/types.ts'))) {
  fs.copyFileSync(path.join(componentsDir, 'organisms/gallery/types.ts'), path.join(organismsDir, 'GalleryTypes.ts'));
}

foldersToMove.forEach(folder => {
  const sourceDir = path.join(componentsDir, folder);
  if (!fs.existsSync(sourceDir)) return;

  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    if (file.endsWith('.tsx') || file === 'SharedUI.tsx') { // include TS/TSX
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(organismsDir, file);
      
      // Move file
      fs.copyFileSync(sourcePath, destPath);
      processFile(destPath);
    }
  });
});

// Update type imports in the newly moved files
const organismsFiles = fs.readdirSync(organismsDir);
organismsFiles.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(path.join(organismsDir, file), 'utf8');
    if (file.startsWith('Checkout')) {
      content = content.replace(/from\s+["']\.\/types["']/g, `from "./CheckoutTypes"`);
    } else if (file.startsWith('Gallery')) {
      content = content.replace(/from\s+["']\.\/types["']/g, `from "./GalleryTypes"`);
    }
    fs.writeFileSync(path.join(organismsDir, file), content);
  }
});

// Update the app directory files to point to the new paths
function updateAppImports(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAppImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/@\/components\/(about|checkout|contact|menu|orders|organisms\/bulk-order|organisms\/gallery)\//g, '@/components/organisms/');
      
      fs.writeFileSync(fullPath, content);
    }
  });
}

updateAppImports(path.join(__dirname, 'app'));
updateAppImports(path.join(__dirname, 'components'));

console.log("Refactoring complete");
