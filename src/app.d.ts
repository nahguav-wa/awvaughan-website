// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				MS365_TENANT_ID?: string;
				MS365_CLIENT_ID?: string;
				MS365_CLIENT_SECRET?: string;
				MS365_EMAIL?: string;
				/** Recipient for contact form submissions. */
				CONTACT_RECIPIENT_EMAIL?: string;
				/** Public Turnstile site key, rendered into the contact page. */
				TURNSTILE_SITE_KEY?: string;
				TURNSTILE_SECRET_KEY?: string;
				META_PIXEL_TOKEN?: string;
				META_TEST_EVENT_CODE?: string;
				META_AGENT_NAME?: string;
				META_EMQ_ADMIN_SECRET?: string;
				/**
				 * Estimated value of one lead, in META_LEAD_CURRENCY. Omitted from
				 * the Lead event when unset, so value-based bidding is not fed a
				 * fabricated zero.
				 */
				META_LEAD_VALUE?: string;
				/** Shared secret for /api/health. */
				HEALTH_CHECK_SECRET?: string;
				/**
				 * KV namespace used as the fallback store for submissions whose
				 * email delivery failed. Optional: when it is not bound, a
				 * delivery failure is reported to the caller instead of being
				 * quietly dropped.
				 *
				 * Typed structurally to avoid depending on @cloudflare/workers-types.
				 */
				LEADS?: {
					put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
				};
			};
			/**
			 * Cloudflare execution context. Named `ctx` by current versions of
			 * adapter-cloudflare and `context` by older Pages builds, so both are
			 * declared and the app reads whichever is present.
			 */
			ctx?: { waitUntil(promise: Promise<unknown>): void };
			context?: { waitUntil(promise: Promise<unknown>): void };
		}
	}
}

export {};
