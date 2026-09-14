/**
 * Service area map pipeline.
 *
 * Projects locality boundaries into SVG paths and writes them to
 * `src/lib/data/service-area.ts`, which the /service-area page renders inline.
 * Nothing about this runs in the browser: the output is plain path data, so the
 * map needs no mapping library, no tile server, and no CSP changes.
 *
 * Source: `scripts/data/localities.geojson`, extracted from the US Census
 * Bureau's 2023 cartographic boundary file for county-equivalents
 * (cb_2023_us_county_500k, public domain). Cartographic boundaries are clipped
 * to the shoreline; the legal boundaries in the TIGER files run out into the
 * Chesapeake Bay and the Atlantic, which renders as a coastline nobody
 * recognises. The extract keeps the localities served plus a ring of
 * neighbours for context, thinned to ~100 m, which is below one rendered pixel
 * at this map's scale.
 *
 * To change which localities are served, edit SERVED below and re-run. To
 * refresh the boundaries themselves — they change about once a decade — re-cut
 * the extract from a newer Census file.
 *
 * Run with: npm run service-area-map
 */

import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const SOURCE = 'scripts/data/localities.geojson';
const OUTPUT = 'src/lib/data/service-area.ts';

/**
 * The localities served, by Census GEOID, in the order they are listed on the
 * page. Grouped geographically so the list beside the map reads as a route
 * rather than an alphabetical jumble.
 *
 * Williamsburg and Poquoson are independent cities entirely enclosed by James
 * City and York counties. They are included deliberately: leaving them out
 * renders them as holes punched through the middle of the shaded area, which
 * reads as a rendering fault rather than a boundary.
 *
 * Middlesex is here because Saluda and Urbanna are both in it, and both are
 * named in `COMPANY_INFO.serviceArea.regions` and in docs/keyword-strategy.md.
 * Leaving it out had the map contradicting the rest of the site: /about said we
 * work in Saluda while the map showed its county unshaded.
 */
const SERVED = [
	'51810', // Virginia Beach city
	'51550', // Chesapeake city
	'51800', // Suffolk city
	'51093', // Isle of Wight County
	'51181', // Surry County
	'51036', // Charles City County
	'51087', // Henrico County
	'51127', // New Kent County
	'51095', // James City County
	'51830', // Williamsburg city
	'51199', // York County
	'51735', // Poquoson city
	'51073', // Gloucester County
	'51119', // Middlesex County
	'51101', // King William County
	'51097' // King and Queen County
];

/** Width of the SVG user-coordinate space. Height follows from the aspect. */
const VIEWBOX_WIDTH = 1000;

/** Padding inside the viewBox, in user units, so strokes are not clipped. */
const PADDING = 8;

/**
 * Simplification tolerance in user units, applied after projection.
 *
 * Tolerance is far more meaningful here than in degrees: a shape is thinned
 * relative to the size it is actually drawn at, so coastline detail finer than
 * half a pixel is dropped whatever the latitude.
 */
const TOLERANCE = 1.2;

/** Web Mercator, normalised to degrees of longitude so x is simply the longitude. */
function project([lon, lat]) {
	const y = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
	return [lon, (y * 180) / Math.PI];
}

/** Perpendicular distance from p to the segment ab. */
function perpendicular(p, a, b) {
	const [px, py] = p;
	const [ax, ay] = a;
	const dx = b[0] - ax;
	const dy = b[1] - ay;
	if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
	const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Ramer-Douglas-Peucker, iterative so a long coastline cannot blow the stack. */
function simplify(points, tolerance) {
	if (points.length < 3) return points;
	const keep = new Array(points.length).fill(false);
	keep[0] = keep[points.length - 1] = true;
	const stack = [[0, points.length - 1]];

	while (stack.length > 0) {
		const [start, end] = stack.pop();
		let furthest = 0;
		let index = -1;
		for (let i = start + 1; i < end; i++) {
			const distance = perpendicular(points[i], points[start], points[end]);
			if (distance > furthest) {
				furthest = distance;
				index = i;
			}
		}
		if (furthest > tolerance && index !== -1) {
			keep[index] = true;
			stack.push([start, index], [index, end]);
		}
	}

	return points.filter((_, i) => keep[i]);
}

/**
 * One ring as an SVG subpath, or '' if rounding left it with no area.
 *
 * Coordinates are integers and every point after the first is a relative delta.
 * The viewBox is 1000 units wide and the map is never rendered wider than that,
 * so one unit is always under a pixel — precision finer than that is bytes on
 * the wire for detail no display can resolve. Deltas between neighbouring
 * points then run to one or two digits where absolute coordinates run to three
 * or four, which roughly halves the payload. That matters more here than it
 * looks: the paths are inlined into the prerendered HTML *and* bundled into the
 * client chunk that hydrates the map, so every byte is paid for twice.
 *
 * Rings are closed with `Z` rather than by repeating the first point, and the
 * winding direction the Census file uses is preserved — holes (Williamsburg
 * inside James City, before it was served) are wound the opposite way from
 * outer rings, which is exactly what the default nonzero fill rule needs.
 */
function toSubpath(ring) {
	// Rounded to absolutes first, then differenced, so the error stays at half a
	// unit everywhere instead of accumulating around the ring.
	const points = ring.map(([x, y]) => [Math.round(x), Math.round(y)]);
	const deltas = [];
	let [previousX, previousY] = points[0];

	for (const [x, y] of points.slice(1)) {
		const dx = x - previousX;
		const dy = y - previousY;
		// Rounding can land neighbouring points on the same pixel.
		if (dx === 0 && dy === 0) continue;
		deltas.push(`${dx},${dy}`);
		previousX = x;
		previousY = y;
	}

	if (deltas.length < 3) return '';
	return `M${points[0][0]},${points[0][1]}l${deltas.join(' ')}Z`;
}

const { features } = JSON.parse(await readFile(SOURCE, 'utf8'));

// Project first, then fit every shape to one viewBox, so the served set and the
// context ring share a coordinate space and line up.
const projected = features.map((feature) => ({
	geoid: feature.properties.geoid,
	name: feature.properties.name,
	// `namelsad` is the full legal name: "York County", "Suffolk city". The
	// suffix is the only thing that distinguishes a Virginia county from an
	// independent city, and the distinction is not cosmetic — an independent
	// city sits outside any county, so calling Suffolk a county is simply wrong.
	kind: feature.properties.namelsad.endsWith(' County') ? 'county' : 'city',
	served: SERVED.includes(feature.properties.geoid),
	rings: feature.geometry.coordinates.map((ring) => ring.map(project))
}));

const missing = SERVED.filter((geoid) => !projected.some((f) => f.geoid === geoid));
if (missing.length > 0) {
	throw new Error(`SERVED lists GEOIDs absent from ${SOURCE}: ${missing.join(', ')}`);
}

// The viewBox frames the served localities. Context localities are drawn at the
// same scale and simply run off the edge, which is what makes the served area
// read as part of a larger map rather than a shape floating in white space.
const servedPoints = projected.filter((f) => f.served).flatMap((f) => f.rings.flat());
const minX = Math.min(...servedPoints.map((p) => p[0]));
const maxX = Math.max(...servedPoints.map((p) => p[0]));
const minY = Math.min(...servedPoints.map((p) => p[1]));
const maxY = Math.max(...servedPoints.map((p) => p[1]));

const scale = (VIEWBOX_WIDTH - PADDING * 2) / (maxX - minX);
const viewBoxHeight = Math.round((maxY - minY) * scale + PADDING * 2);

/** Project to viewBox space. SVG y grows downward, so latitude is flipped. */
const toViewBox = ([x, y]) => [(x - minX) * scale + PADDING, (maxY - y) * scale + PADDING];

let kept = 0;
let total = 0;

function buildPath(feature) {
	const subpaths = [];
	for (const ring of feature.rings) {
		total += ring.length;
		const simplified = simplify(ring.map(toViewBox), TOLERANCE);
		const subpath = toSubpath(simplified);
		// A ring reduced below a triangle has no area left to draw.
		if (!subpath) continue;
		kept += simplified.length;
		subpaths.push(subpath);
	}
	return subpaths.join('');
}

const served = SERVED.map((geoid) => {
	const feature = projected.find((f) => f.geoid === geoid);
	return {
		geoid,
		name: feature.name,
		kind: feature.kind,
		path: buildPath(feature)
	};
});

// Every context locality collapses into one path. They are never interactive
// and never labelled, so nothing is gained by keeping them as separate nodes.
const context = projected
	.filter((f) => !f.served)
	.map(buildPath)
	.join('');

const counties = served.filter((l) => l.kind === 'county').length;
const cities = served.length - counties;

const file = `/**
 * Service area map data.
 *
 * GENERATED by scripts/build-service-area-map.mjs — do not edit by hand. To
 * change which localities are served, edit SERVED in that script and run
 * \`npm run service-area-map\`.
 *
 * Boundaries: US Census Bureau 2023 cartographic boundary file for
 * county-equivalents (public domain), projected to Web Mercator and simplified
 * to this map's rendered scale.
 */

import type { ServiceAreaLocality } from '$lib/types';

/** SVG user-coordinate space the paths below are drawn in. */
export const SERVICE_AREA_VIEWBOX = '0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}';

/**
 * Neighbouring localities, drawn once as an unlabelled backdrop.
 *
 * Without it the served localities float in white space and the gap left by
 * Norfolk, Portsmouth, Hampton and Newport News — which are not served — looks
 * like a hole in the map rather than four cities we do not cover.
 */
export const SERVICE_AREA_CONTEXT_PATH =
	'${context}';

/** The ${served.length} localities served: ${counties} counties and ${cities} independent cities. */
export const serviceAreaLocalities: ServiceAreaLocality[] = [
${served
	.map(
		(l) => `	{
		geoid: '${l.geoid}',
		name: '${l.name}',
		kind: '${l.kind}',
		path:
			'${l.path}'
	}`
	)
	.join(',\n')}
];
`;

await writeFile(OUTPUT, file);

console.log(`localities: ${served.length} served (${counties} counties, ${cities} cities)`);
console.log(`context:    ${projected.length - served.length} neighbouring localities`);
console.log(`points:     ${total} -> ${kept}`);
console.log(`viewBox:    0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}`);
console.log(
	`${OUTPUT}: ${(file.length / 1024).toFixed(0)}KB, ` +
		`${(gzipSync(file).length / 1024).toFixed(0)}KB gzipped`
);
