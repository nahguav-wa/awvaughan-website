/**
 * Image optimization pipeline.
 *
 * Reads the untouched source photographs from `static/` and writes web-ready
 * derivatives to `static/images/`, plus a correctly framed Open Graph card.
 * Sources are never modified, so re-running is lossless rather than
 * re-compressing already-compressed output.
 *
 * AVIF plus a mozjpeg fallback, measured on these photographs:
 *   mozjpeg q78  172KB   (fallback for Safari < 16.4)
 *   webp q78     205KB   (larger than the fallback — not generated)
 *   avif q55     126KB   (served first)
 *
 * Run with: npm run images
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'static';
const OUTPUT_DIR = 'static/images';

/** Photographs to process, by basename in SOURCE_DIR. */
const PHOTOS = ['hero-image', 'about-image', 'work-example-2', 'work-example-3', 'work-example-4'];

/** Narrow width generated for phones alongside each photo's native width. */
const MOBILE_WIDTH = 480;

/** Open Graph cards must be 1.91:1; 1200x630 is the size every platform accepts. */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function buildPhoto(name) {
	const source = path.join(SOURCE_DIR, `${name}.jpg`);
	const { width, height } = await sharp(source).metadata();
	const widths = width > MOBILE_WIDTH ? [MOBILE_WIDTH, width] : [width];

	for (const w of widths) {
		const suffix = w === width ? '' : `-${w}`;
		const resized = sharp(source).resize({ width: w, withoutEnlargement: true });

		await resized
			.clone()
			.avif({ quality: 55 })
			.toFile(path.join(OUTPUT_DIR, `${name}${suffix}.avif`));

		await resized
			.clone()
			.jpeg({ quality: 78, progressive: true, mozjpeg: true })
			.toFile(path.join(OUTPUT_DIR, `${name}${suffix}.jpg`));
	}

	return { name, width, height, widths };
}

/**
 * Build the Open Graph card from the hero photograph.
 *
 * The source is portrait, so a 1.91:1 crop is taken from the upper portion —
 * matching the hero's `object-top` framing — and scaled to the required size.
 */
async function buildOgImage() {
	const source = path.join(SOURCE_DIR, 'hero-image.jpg');
	const buffer = await sharp(source)
		.resize({
			width: OG_WIDTH,
			height: OG_HEIGHT,
			fit: 'cover',
			position: 'top'
		})
		.jpeg({ quality: 82, progressive: true, mozjpeg: true })
		.toBuffer();

	await writeFile(path.join(SOURCE_DIR, 'og-image.jpg'), buffer);
	return buffer.length;
}

await mkdir(OUTPUT_DIR, { recursive: true });

const results = [];
for (const name of PHOTOS) {
	results.push(await buildPhoto(name));
}

const ogBytes = await buildOgImage();

for (const { name, width, height, widths } of results) {
	console.log(`${name}: source ${width}x${height} -> widths ${widths.join(', ')}`);
}
console.log(`og-image.jpg: ${OG_WIDTH}x${OG_HEIGHT}, ${(ogBytes / 1024).toFixed(0)}KB`);
