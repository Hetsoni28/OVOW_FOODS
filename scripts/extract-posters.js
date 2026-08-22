#!/usr/bin/env node
/**
 * extract-posters.js
 * Extracts the first frame from every video in public/videos/
 * and saves it as a JPEG in public/images/ with matching name.
 *
 * Usage: node scripts/extract-posters.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const VIDEOS_DIR = path.join(__dirname, "../public/videos");
const IMAGES_DIR = path.join(__dirname, "../public/images");

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const videoFiles = fs
  .readdirSync(VIDEOS_DIR)
  .filter((f) => f.endsWith(".mp4"));

console.log(`\n🎬 Found ${videoFiles.length} videos to extract posters from:\n`);

let success = 0;
let failed = 0;

for (const file of videoFiles) {
  const name = path.basename(file, ".mp4");
  const inputPath = path.join(VIDEOS_DIR, file);
  const outputPath = path.join(IMAGES_DIR, `${name}-poster.jpg`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  ✅ ${name}-poster.jpg already exists, skipping.`);
    success++;
    continue;
  }

  try {
    // Extract frame at t=0.001s to avoid pure-black first frame on some encodings
    // -q:v 2  = high quality JPEG (2 is near-lossless, 31 is worst)
    // -vf scale=1280:-1 = resize to max 1280px width, keep aspect ratio
    execSync(
      `ffmpeg -ss 0.001 -i "${inputPath}" -frames:v 1 -q:v 2 -vf "scale=1280:-1" "${outputPath}" -y`,
      { stdio: "pipe" }
    );
    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`  ✅ ${name}-poster.jpg (${sizeKB} KB)`);
    success++;
  } catch (err) {
    console.error(`  ❌ Failed for ${file}: ${err.message}`);
    failed++;
  }
}

console.log(`\n📦 Done! ${success} posters created, ${failed} failed.`);
console.log(`📁 Saved to: ${IMAGES_DIR}\n`);
