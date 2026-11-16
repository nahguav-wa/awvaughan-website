/**
 * Site-wide "under construction" switch.
 *
 * While true, every page renders only the under construction notice — no
 * navigation, services, phone number, email or contact form — and
 * `/api/contact` refuses submissions, so the site generates no leads while the
 * business is on hold. Page titles, descriptions and canonicals are left as they
 * are, so search listings recover as soon as this is turned back off.
 *
 * Set to false, then commit and push to `main`, to bring the full site back.
 */
export const UNDER_CONSTRUCTION = true;
