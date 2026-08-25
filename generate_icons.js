const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImagePath = path.join(__dirname, 'public/logo/ovow-foods-logo.png');
const outputDir = path.join(__dirname, 'public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    await sharp(inputImagePath)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-192x192.png'));
    
    await sharp(inputImagePath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-512x512.png'));
      
    await sharp(inputImagePath)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(__dirname, 'app', 'apple-icon.png'));

    console.log('Successfully generated PWA icons!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
