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

| Term                                            | Page                            |
| ----------------------------------------------- | ------------------------------- |
| landscape maintenance Williamsburg VA           | /services/maintenance-solutions |
| landscape management Williamsburg VA            | /services/maintenance-solutions |
| commercial landscape maintenance Virginia       | /services/maintenance-solutions |
| grounds maintenance Williamsburg VA             | /services/maintenance-solutions |
| landscape maintenance contract Yorktown VA      | /services/maintenance-solutions |
| property maintenance program Virginia           | /services/maintenance-solutions |
| turf care Williamsburg VA                       | /services/turf-care             |
| lawn care Williamsburg VA                       | /services/turf-care             |
| lawn fertilization Williamsburg VA              | /services/turf-care             |
| weed control Williamsburg VA                    | /services/turf-care             |
| lawn aeration and overseeding Virginia          | /services/turf-care             |
| lawn care Toano VA                              | /services/turf-care             |
| lawn mowing service Yorktown VA                 | /services/turf-care             |
| tree and shrub care Williamsburg VA             | /services/tree-and-shrub-care   |
| shrub pruning Williamsburg VA                   | /services/tree-and-shrub-care   |
| ornamental tree pruning Virginia                | /services/tree-and-shrub-care   |
| shrub fertilization Virginia                    | /services/tree-and-shrub-care   |
| bed mulching Williamsburg VA                    | /services/tree-and-shrub-care   |
| tree and shrub insect treatment Virginia        | /services/tree-and-shrub-care   |
| spring clean up Williamsburg VA                 | /services/seasonal-cleanup      |
| fall clean up Williamsburg VA                   | /services/seasonal-cleanup      |
| leaf removal Williamsburg VA                    | /services/seasonal-cleanup      |
| seasonal clean up Virginia                      | /services/seasonal-cleanup      |
| yard clean up Yorktown VA                       | /services/seasonal-cleanup      |
| storm debris cleanup Gloucester VA              | /services/seasonal-cleanup      |
| landscape maintenance Historic Triangle         | /services                       |
| landscape management Middle Peninsula           | /services                       |
| landscaping company Williamsburg VA             | /services                       |
| lawn care James City County VA                  | /service-area                   |
| landscape maintenance York County VA            | /service-area                   |
| lawn care New Kent County VA                    | /service-area                   |
| landscape maintenance Gloucester County VA      | /service-area                   |
| lawn care King William County VA                | /service-area                   |
| landscaping Middlesex County VA                 | /service-area                   |
| landscape maintenance service area Williamsburg | /service-area                   |

## Secondary terms

Problem-focused, question-shaped searches. These are the ones worth answering
with real content — an FAQ section or a short article earns these, a meta tag
never did.

- when to aerate and overseed fescue in Virginia
- best mowing height for tall fescue
- how much does a landscape maintenance contract cost
- when to prune crape myrtles in Virginia
- how deep should mulch be around a tree
- why is my lawn thinning out in August
- how to get rid of crabgrass and nutsedge
- do leaves left on the lawn kill grass
- when should a spring clean up be done
- what is included in a landscape maintenance program

## Content the copy already leans on

These are genuine differentiators and should keep appearing in body copy,
because they are what separates this company from a man with a tractor:

- **A managed program, not a weekly visit.** The written maintenance plan, the
  budget prepared ahead of the year, the photo documentation, and the monthly
  quality inspection are the positioning for the whole business. They are what
  separate this from a mowing route, and they are what a property manager or an
  absentee owner is actually shopping for.
- **Drainage carries over.** The company came up doing grading and drainage.
  Compacted ground sheds a summer storm instead of taking it in, beds wash out,
  and turf drowns in the low corner. Reading a site that way first is the most
  defensible thing on the site, and almost no maintenance competitor says it.
- **Turf care is not cutting grass.** Soil test, fertility on the right
  calendar, pre-emergent timing, aeration and overseeding. Saying plainly that
  mowing is one line in a program — not the program — earns the "vs" and "why is
  my lawn" searches above.
- **Pruning is horticultural, not cosmetic.** Topped crape myrtles, hollies
  sheared hollow, and mulch volcanoes are specific, recognisable mistakes.
  Naming them is what makes that page read as written by someone who has been on
  these properties rather than assembled from a template.
- **The gap this business fills.** Larger residential lots, rural property and
  small commercial grounds are too much ground for a tight suburban route and
  too fine to be treated as rough cutting.

**Keep the four service pages distinct.** Comprehensive maintenance is the
program and the reporting around it; turf care is the stand of grass; tree and
shrub care is the plantings; seasonal clean-up is the two resets that make the
rest of it work. It would be easy to let all four drift into "we maintain your
property", which would leave four pages competing for one term.

## Notes

- The four service pages are generated from `src/lib/data/services.ts`. Edit the
  copy there; the page template is `src/routes/services/[slug]/+page.svelte`.
- The "We Provide" list on `/services` names five commitments but there are four
  pages: spring and fall clean-up **is** the seasonal clean-up page. A fifth
  near-identical page would split its own ranking and read as filler.
- Two rounds of services are retired, and every one of their URLs is 301'd in
  `_redirects` at the project root. **Do not write copy targeting these terms** —
  ranking for work the company no longer does produces calls it has to turn
  down:
  - gravel driveway repair, drainage solutions, shed pad preparation, small
    excavation (retired 2026-09-13)
  - land clearing, bush hogging, forestry mulching, trail systems, pasture
    reclamation, stump removal, ATV and hunting trail cutting (retired
    2026-09-21, when the business moved to landscape maintenance and management)
  - The grading and drainage **background** is still fair to mention, and the
    copy does: it explains how the company reads a site. Selling drainage work,
    clearing or trail cutting is what is retired, not the history.
- `/contact` and `/about` target brand and intent terms ("contact A.W. Vaughan",
  "free landscape maintenance quote Williamsburg") rather than service terms.
- Adding a service to `src/lib/data/services.ts` automatically creates its page,
  adds it to the services listing and homepage grid, and includes it in
  `/sitemap.xml`. Add its target terms to the table above at the same time.
- Off-site geography is not in this repository and still has to be moved by
  hand: the Google Business Profile address and service area, the Nextdoor page
  (its URL still spells `virginia-beach`), and the location fields on Facebook,
  Instagram and YouTube. A local pack ranking follows the Business Profile, not
  the site, so that one matters most.
