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
County, Middlesex County.

## How to use this

When writing or revising a page, check that its primary term appears naturally
in the `<h1>`, the first paragraph, and the `<title>` (set in the page's
`+page.ts`, or in `src/lib/data/services.ts` for a service page). Do not force
the secondary terms in; they are there to suggest content worth writing, such as
an FAQ entry or a short explainer section.

## Primary terms

Geographic plus core service — these are what the money pages target.

| Term                                     | Page                             |
| ---------------------------------------- | -------------------------------- |
| gravel driveway repair Williamsburg VA   | /services/gravel-driveway-repair |
| gravel driveway grading Williamsburg     | /services/gravel-driveway-repair |
| driveway crown restoration               | /services/gravel-driveway-repair |
| gravel driveway potholes repair          | /services/gravel-driveway-repair |
| gravel driveway repair Toano VA          | /services/gravel-driveway-repair |
| gravel driveway washout repair           | /services/gravel-driveway-repair |
| driveway repair Yorktown VA              | /services/gravel-driveway-repair |
| drainage solutions Williamsburg VA       | /services/drainage-solutions     |
| yard drainage Yorktown VA                | /services/drainage-solutions     |
| ditch and swale repair Williamsburg      | /services/drainage-solutions     |
| French drain installation Williamsburg   | /services/drainage-solutions     |
| standing water driveway fix              | /services/drainage-solutions     |
| drainage contractor Gloucester VA        | /services/drainage-solutions     |
| shed pad preparation Williamsburg VA     | /services/shed-pad-preparation   |
| shed foundation prep                     | /services/shed-pad-preparation   |
| gravel shed pad Yorktown VA              | /services/shed-pad-preparation   |
| small building foundation Williamsburg   | /services/shed-pad-preparation   |
| small excavation contractor Williamsburg | /services/excavation             |
| culvert repair Williamsburg VA           | /services/excavation             |
| rural property drainage solutions        | /services/excavation             |
| lot clearing New Kent VA                 | /services/excavation             |
| trenching services Williamsburg VA       | /services/excavation             |
| excavation contractor West Point VA      | /services/excavation             |
| excavation services Historic Triangle    | /services                        |
| excavation contractor Middle Peninsula   | /services                        |

## Secondary terms

Problem-focused, question-shaped searches. These are the ones worth answering
with real content — an FAQ section or a short article earns these, a meta tag
never did.

- how to fix standing water in driveway
- gravel driveway potholes repair cost
- why does my driveway wash out
- fixing muddy driveway
- driveway crown repair
- small site prep contractor
- driveway drainage for clay soil
- how much gravel for a shed pad

## Notes

- The four service pages are generated from `src/lib/data/services.ts`. Edit the
  copy there; the page template is `src/routes/services/[slug]/+page.svelte`.
- `/contact` and `/about` target brand and intent terms ("contact A.W. Vaughan",
  "free excavation quote Williamsburg") rather than service terms.
- Adding a service to `src/lib/data/services.ts` automatically creates its page,
  adds it to the services listing and homepage grid, and includes it in
  `/sitemap.xml`. Add its target terms to the table above at the same time.
- Off-site geography is not in this repository and still has to be moved by
  hand: the Google Business Profile address and service area, the Nextdoor page
  (its URL still spells `virginia-beach`), and the location fields on Facebook,
  Instagram and YouTube. A local pack ranking follows the Business Profile, not
  the site, so that one matters most.
