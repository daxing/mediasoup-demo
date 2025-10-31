import qs from 'qs';

// Allow overriding host/port/protocol via query params for local dev.
const url = new URL(window.location.href);
const search = url.searchParams;

// Determine protocol dynamically (defaults to ws for http pages, wss for https).
const protocol =
	search.get('protooProtocol') || (window.location.protocol === 'https:' ? 'wss' : 'ws');

// Hostname defaults to current page host, but can be overridden.
const hostname = search.get('protooHost') || window.location.hostname;

// Default ports keep previous behavior, but allow overrides and special case for test env.
let protooPort = Number(search.get('protooPort')) || 4443;
if (!search.get('protooPort') && window.location.hostname === 'test.mediasoup.org') {
	protooPort = 4444;
}

export function getProtooUrl(params) {
	const query = qs.stringify(params);

	return `${protocol}://${hostname}:${protooPort}/?${query}`;
}
