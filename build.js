const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

// Copy top-level static files
const filesToCopy = [
  'index.html',
  '_headers',
  'manifest.json',
  'robots.txt',
  'sitemap.xml'
];

filesToCopy.forEach(f => {
  const src = path.join(__dirname, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, f));
  }
});

// Recursively copy assets folder
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const assetsSrc = path.join(__dirname, 'assets');
if (fs.existsSync(assetsSrc)) {
  copyDir(assetsSrc, path.join(dist, 'assets'));
}

console.log('Static site build complete! Files ready in root and dist/');
