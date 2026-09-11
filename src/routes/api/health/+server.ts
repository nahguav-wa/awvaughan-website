/**
 * Configuration health check.
 *
 * Reports which integrations are actually wired up, so a mistyped or missing
 * environment variable is something you can see rather than something you
 * discover weeks later from the absence of leads.
 *
 * Gated by HEALTH_CHECK_SECRET in the `x-health-secret` header. It reports only
 * whether each value is present — never any value itself — but which
 * integrations exist is still information worth keeping private.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { timingSafeEqual } from '$lib/utils/meta';

export const GET: RequestHandler = ({ request, platform }) => {
	const healthSecret = platform?.env?.HEALTH_CHECK_SECRET;
	if (!healthSecret) {
		throw error(503, 'Health endpoint is not configured');
	}

	const provided = request.headers.get('x-health-secret');
	if (!provided || !timingSafeEqual(provided, healthSecret)) {
		throw error(401, 'Unauthorized');
	}

	const env = platform?.env;
	const configured = (value: unknown) => Boolean(value);

	const email = {
		tenantId: configured(env?.MS365_TENANT_ID),
		clientId: configured(env?.MS365_CLIENT_ID),
		clientSecret: configured(env?.MS365_CLIENT_SECRET),
		fromAddress: configured(env?.MS365_EMAIL)
	};
	const emailReady = Object.values(email).every(Boolean);

	const turnstile = {
		siteKey: configured(env?.TURNSTILE_SITE_KEY),
		secretKey: configured(env?.TURNSTILE_SECRET_KEY)
	};

	return json({
		// The form can accept a submission at all.
		contactFormReady: emailReady || configured(env?.LEADS),
		email: { ...email, ready: emailReady },
		// A secret with no site key means the widget cannot issue a token and
		// every submission is rejected.
		turnstile: {
			...turnstile,
			misconfigured: turnstile.secretKey && !turnstile.siteKey
		},
		leadFallbackStore: configured(env?.LEADS),
		meta: {
			capiToken: configured(env?.META_PIXEL_TOKEN),
			leadValue: configured(env?.META_LEAD_VALUE),
			testEventCode: configured(env?.META_TEST_EVENT_CODE),
			emqAgentName: configured(env?.META_AGENT_NAME),
			emqAdminSecret: configured(env?.META_EMQ_ADMIN_SECRET)
		}
	});
};
