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
				TURNSTILE_SECRET_KEY?: string;
				META_PIXEL_TOKEN?: string;
				META_TEST_EVENT_CODE?: string;
				META_AGENT_NAME?: string;
				META_EMQ_ADMIN_SECRET?: string;
			};
		}
	}
}

export {};
