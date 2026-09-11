# Keyword Strategy

Target search terms for The A.W. Vaughan Company, by page.

These used to live in `src/lib/utils/seo.ts` and `src/lib/data/services.ts` and
were rendered into a `<meta name="keywords">` tag. Google has confirmed it
ignores that tag, and publishing the list gave competitors the strategy for
free, so the tag was removed. The lists are kept here because they are a content
planning document: they belong in the copy — headings, body text, image alt
text, and page titles — not in a meta tag.

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
| gravel driveway repair Virginia Beach    | /services/gravel-driveway-repair |
| gravel driveway repair 757               | /services/gravel-driveway-repair |
| driveway crown restoration               | /services/gravel-driveway-repair |
| gravel driveway potholes repair          | /services/gravel-driveway-repair |
| driveway grading Virginia Beach          | /services/gravel-driveway-repair |
| gravel driveway washout repair           | /services/gravel-driveway-repair |
| drainage solutions Norfolk VA            | /services/drainage-solutions     |
| drainage solutions Virginia Beach        | /services/drainage-solutions     |
| driveway grading 757                     | /services/drainage-solutions     |
| ditch and swale repair Virginia Beach    | /services/drainage-solutions     |
| French drain installation Virginia Beach | /services/drainage-solutions     |
| standing water driveway fix              | /services/drainage-solutions     |
| shed pad preparation Virginia Beach      | /services/shed-pad-preparation   |
| shed foundation prep                     | /services/shed-pad-preparation   |
| shed base preparation 757                | /services/shed-pad-preparation   |
| small building foundation Virginia Beach | /services/shed-pad-preparation   |
| small excavation contractor 757          | /services/excavation             |
| culvert repair Virginia Beach            | /services/excavation             |
| rural property drainage solutions        | /services/excavation             |
| lot clearing Virginia Beach              | /services/excavation             |
| trenching services 757                   | /services/excavation             |
| excavation services Hampton Roads        | /services                        |

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

## Notes

- The four service pages are generated from `src/lib/data/services.ts`. Edit the
  copy there; the page template is `src/routes/services/[slug]/+page.svelte`.
- `/contact` and `/about` target brand and intent terms ("contact A.W. Vaughan",
  "free excavation quote Virginia Beach") rather than service terms.
- Adding a service to `src/lib/data/services.ts` automatically creates its page,
  adds it to the services listing and homepage grid, and includes it in
  `/sitemap.xml`. Add its target terms to the table above at the same time.
