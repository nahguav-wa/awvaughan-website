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

export const GET: RequestHandler = async ({ request, platform }) => {
	const adminSecret = platform?.env?.META_EMQ_ADMIN_SECRET;
	const accessToken = platform?.env?.META_PIXEL_TOKEN;
	const agentName = platform?.env?.META_AGENT_NAME;

	if (!adminSecret || !accessToken || !agentName) {
		throw error(503, 'EMQ endpoint is not configured');
	}

	if (request.headers.get('x-admin-secret') !== adminSecret) {
		throw error(401, 'Unauthorized');
	}

	const url = new URL(
		`https://graph.facebook.com/${META_DATASET_QUALITY_API_VERSION}/dataset_quality`
	);
	url.searchParams.set('dataset_id', META_PIXEL_ID);
	url.searchParams.set('agent_name', agentName);
	url.searchParams.set('access_token', accessToken);
	url.searchParams.set('fields', 'web{event_match_quality,event_name}');

	const response = await fetch(url.toString());
	const data = await response.json();

	if (!response.ok) {
		throw error(response.status, data?.error?.message ?? 'Dataset Quality API request failed');
	}

	return json(data);
};
