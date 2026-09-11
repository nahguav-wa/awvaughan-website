/**
 * Meta Dataset Quality API — read-only EMQ (Event Match Quality) diagnostics.
 *
 * Proxies Meta's Dataset Quality API so monitoring tools can poll it without
 * holding the CAPI access token themselves. Gated by the META_EMQ_ADMIN_SECRET
 * env var, passed as the `x-admin-secret` request header.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/guides/dataset-quality-api
 *
 * Required app permissions on the token: ads_read + (ads_management | business_management).
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { META_DATASET_QUALITY_API_VERSION, META_PIXEL_ID } from '$lib/config/constants';
import { timingSafeEqual } from '$lib/utils/meta';

/** Bound the upstream call so a hung request cannot hold the Worker open. */
const REQUEST_TIMEOUT_MS = 8000;

export const GET: RequestHandler = async ({ request, platform }) => {
	const adminSecret = platform?.env?.META_EMQ_ADMIN_SECRET;
	const accessToken = platform?.env?.META_PIXEL_TOKEN;
	const agentName = platform?.env?.META_AGENT_NAME;

	if (!adminSecret || !accessToken || !agentName) {
		throw error(503, 'EMQ endpoint is not configured');
	}

	const providedSecret = request.headers.get('x-admin-secret');
	if (!providedSecret || !timingSafeEqual(providedSecret, adminSecret)) {
		throw error(401, 'Unauthorized');
	}

	const url = new URL(
		`https://graph.facebook.com/${META_DATASET_QUALITY_API_VERSION}/dataset_quality`
	);
	url.searchParams.set('dataset_id', META_PIXEL_ID);
	url.searchParams.set('agent_name', agentName);
	url.searchParams.set('fields', 'web{event_match_quality,event_name}');

	// The token goes in a Bearer header rather than a query parameter so it does
	// not land in proxy, CDN, or error logs.
	const response = await fetch(url.toString(), {
		headers: { Authorization: `Bearer ${accessToken}` },
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
	});
	const data = await response.json().catch(() => null);

	if (!response.ok) {
		// Meta's status and message are logged but not reflected to the caller: a
		// relayed 401 is indistinguishable from this endpoint's own auth failure,
		// and the upstream message can name app and token details.
		console.error(
			'Dataset Quality API request failed:',
			response.status,
			data?.error?.message ?? '(no message)'
		);
		throw error(502, 'Dataset Quality API request failed');
	}

	return json(data);
};
