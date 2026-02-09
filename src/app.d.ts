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
			};
		}
	}
}

export {};
