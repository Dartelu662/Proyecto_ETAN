const fs = require('fs');
const path = require('path');

const distBrowser = path.join(__dirname, '..', 'dist', 'proyecto-portal-etan', 'browser');
const src = path.join(distBrowser, 'index.csr.html');
const dest = path.join(distBrowser, 'index.html');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied index.csr.html to index.html');
  } else {
    console.log('Source file not found:', src);
    process.exit(0);
  }
} catch (err) {
  console.error('Error copying index file:', err);
  process.exit(1);
}
