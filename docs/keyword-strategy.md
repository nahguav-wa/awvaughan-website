# Keyword Strategy

Target search terms for The A.W. Vaughan Company, by page.

These used to live in `src/lib/utils/seo.ts` and `src/lib/data/services.ts` and
were rendered into a `<meta name="keywords">` tag. Google has confirmed it
ignores that tag, and publishing the list gave competitors the strategy for
free, so the tag was removed. The lists are kept here because they are a content
planning document: they belong in the copy — headings, body text, image alt
text, and page titles — not in a meta tag.

## Geography

The company was founded in Virginia Beach and has **relocated to
Williamsburg**. Every geographic term below targets the new footprint. Virginia
Beach, Norfolk, Chesapeake and "Hampton Roads" are no longer target terms: the
only place Virginia Beach still appears is the founding story on `/about` and
the Schema.org `foundingLocation`, which deliberately does not compete with the
`address` node.

The footprint has three named layers, in the order copy should reach for them:

1. **Williamsburg** — the primary city. It belongs in the `<h1>`, the `<title>`
   and the first paragraph of every money page.
2. **The named towns** — Toano, Norge, Lightfoot, Yorktown, New Kent,
   Providence Forge, West Point, Gloucester, Gloucester Point, Saluda, Urbanna.
   The canonical list is `COMPANY_INFO.serviceArea.regions` in
   `src/lib/config/constants.ts`; it also drives Schema.org `areaServed` and the
   service-area paragraph on `/about`.
3. **The regions** — "the Historic Triangle" (Williamsburg, Jamestown,
   Yorktown) and "the Middle Peninsula" (West Point, Gloucester, Saluda,
   Urbanna). Use `COMPANY_INFO.serviceArea.region` rather than writing the
   phrase out by hand.

**Do not write "the 757 area" in new copy.** The footprint now straddles two
area codes — Williamsburg, Toano and Yorktown are 757, while West Point,
Gloucester and Saluda are 804 — so it no longer describes where the company
works, and it was only ever a Hampton Roads identifier anyway. The phone number
is still a 757 number and stays as it is.

County-level terms worth working into body copy where they fit naturally: James
City County, York County, New Kent County, King William County, Gloucester
County, Middlesex County. `/service-area` is where these live: it names every
county and city as indexed text beside the map, which is the natural home for
county terms that would read as stuffing anywhere else.

**The map is wider than the marketed geography, and that is deliberate.** The
localities shaded on `/service-area` include Mathews, Charles City, Henrico,
Surry, Isle of Wight, Suffolk, Chesapeake and Virginia Beach, none of which are
target terms. Mathews is the one worth revisiting: it is squarely in the Middle
Peninsula, so if the company markets there, a Mathews town belongs in
`COMPANY_INFO.serviceArea.regions` and the county belongs in the list above
rather than here. They are drawn because the company will travel for the right job; they
are not named in that page's prose, `<title>`, description, or any structured
data, and they must not be. `/service-area` deliberately contributes **no**
Schema.org node at all: the layout's LocalBusiness already carries `areaServed`
from `COMPANY_INFO.serviceArea.regions`, and a second `areaServed` against the
same `@id` merges into it — which is how Virginia Beach briefly found its way
back into the business's serving geography after the relocation.

## How to use this

When writing or revising a page, check that its primary term appears naturally
in the `<h1>`, the first paragraph, and the `<title>` (set in the page's
`+page.ts`, or in `src/lib/data/services.ts` for a service page). Do not force
the secondary terms in; they are there to suggest content worth writing, such as
an FAQ entry or a short explainer section.

## Primary terms

Geographic plus core service — these are what the money pages target.

| Term                                    | Page                           |
| --------------------------------------- | ------------------------------ |
| land clearing Williamsburg VA           | /services/land-clearing        |
| land clearing services near me          | /services/land-clearing        |
| lot clearing Williamsburg VA            | /services/land-clearing        |
| pasture reclamation Virginia            | /services/land-clearing        |
| stump removal Williamsburg VA           | /services/land-clearing        |
| land clearing New Kent VA               | /services/land-clearing        |
| bush hogging Williamsburg VA            | /services/bush-hogging         |
| bush hogging near me                    | /services/bush-hogging         |
| field mowing Williamsburg VA            | /services/bush-hogging         |
| brush hog services Gloucester VA        | /services/bush-hogging         |
| overgrown field mowing Virginia         | /services/bush-hogging         |
| bush hogging West Point VA              | /services/bush-hogging         |
| forestry mulching Williamsburg VA       | /services/forestry-mulching    |
| forestry mulching near me               | /services/forestry-mulching    |
| underbrush clearing Virginia            | /services/forestry-mulching    |
| mulching head clearing Yorktown VA      | /services/forestry-mulching    |
| invasive species removal Virginia       | /services/forestry-mulching    |
| fence line clearing Williamsburg        | /services/forestry-mulching    |
| trail clearing Williamsburg VA          | /services/trail-systems        |
| ATV trail building Virginia             | /services/trail-systems        |
| hunting trail cutting Virginia          | /services/trail-systems        |
| walking trail construction Williamsburg | /services/trail-systems        |
| firebreak cutting Virginia              | /services/trail-systems        |
| property maintenance Williamsburg VA    | /services/property-maintenance |
| grass cutting Williamsburg VA           | /services/property-maintenance |
| lawn maintenance Williamsburg VA        | /services/property-maintenance |
| lawn care Toano VA                      | /services/property-maintenance |
| acreage mowing Virginia                 | /services/property-maintenance |
| absentee property maintenance Virginia  | /services/property-maintenance |
| land management Williamsburg VA         | /services                      |
| land clearing Historic Triangle         | /services                      |
| land management Middle Peninsula        | /services                      |
| land clearing James City County VA      | /service-area                  |
| land clearing York County VA            | /service-area                  |
| bush hogging New Kent County VA         | /service-area                  |
| bush hogging King William County VA     | /service-area                  |
| land clearing Gloucester County VA      | /service-area                  |
| brush clearing Middlesex County VA      | /service-area                  |
| land clearing service area Williamsburg | /service-area                  |

## Secondary terms

Problem-focused, question-shaped searches. These are the ones worth answering
with real content — an FAQ section or a short article earns these, a meta tag
never did.

- bush hogging vs mowing
- forestry mulching vs land clearing
- how much does land clearing cost per acre
- how often should a field be bush hogged
- what size trees can a forestry mulcher handle
- do you need a permit to clear land in Virginia
- how to get rid of privet / autumn olive
- reclaiming a field that has grown up
- why do my trails wash out

## Content the copy already leans on

These are genuine differentiators and should keep appearing in body copy,
because they are what separates this company from a man with a tractor:

- **Drainage carries over.** The company came up doing grading and drainage.
  Clearing changes where water goes, and a trail cut straight up a slope becomes
  a gully. That is on `/services/trail-systems` and `/about`, and it is the most
  defensible thing on the site.
- **Naming the right method.** Mowing, mulching and full clearing solve
  different problems at different prices. Saying so plainly — including the
  honest limits, roughly two inches for a rotary cutter and roughly eight for a
  mulching head — earns the "vs" searches above.
- **Equipment that fits.** Machines that get through a farm gate and down a
  narrow lane matter to exactly the rural properties this business serves.
- **The gap property maintenance fills.** Lots of an acre to five acres are too
  much ground for a suburban lawn route and too fine for a rotary cutter, so the
  edges get skipped. Naming those edges specifically — well heads, culvert ends,
  fence posts, propane tanks, the creeping wood line — is what makes that page
  read as written by someone who has actually been on these properties.

**Keep bush hogging and property maintenance distinct.** They are both mowing
and it would be easy to let the copy blur them, but they are different jobs for
different customers: rough cutting reclaims ground that got away, property
maintenance keeps ground that has not. Each page says so explicitly, which also
earns the "bush hogging vs mowing" search above.

## Notes

- The four service pages are generated from `src/lib/data/services.ts`. Edit the
  copy there; the page template is `src/routes/services/[slug]/+page.svelte`.
- The company previously sold gravel driveway repair, drainage solutions, shed
  pads and small excavation. Those services are retired; their URLs are 301'd in
  `_redirects` at the project root. Do not write copy targeting those terms —
  ranking for work the company no longer does produces calls it has to turn
  down.
- `/contact` and `/about` target brand and intent terms ("contact A.W. Vaughan",
  "free land clearing quote Williamsburg") rather than service terms.
- Adding a service to `src/lib/data/services.ts` automatically creates its page,
  adds it to the services listing and homepage grid, and includes it in
  `/sitemap.xml`. Add its target terms to the table above at the same time.
- Off-site geography is not in this repository and still has to be moved by
  hand: the Google Business Profile address and service area, the Nextdoor page
  (its URL still spells `virginia-beach`), and the location fields on Facebook,
  Instagram and YouTube. A local pack ranking follows the Business Profile, not
  the site, so that one matters most.
