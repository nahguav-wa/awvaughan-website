/* eslint-disable @typescript-eslint/no-unused-expressions -- vendor snippet, kept verbatim */
/*
 * Meta Pixel bootstrap.
 *
 * Served as a file rather than inlined into app.html so that `script-src` does
 * not need 'unsafe-inline', which would defeat most of the CSP's value.
 *
 * The pixel ID is public. It is duplicated from META_PIXEL_ID in
 * src/lib/config/constants.ts because a static asset cannot import from the
 * app; a test asserts the two values stay in sync.
 */
(function (f, b, e, v, n, t, s) {
	if (f.fbq) return;
	n = f.fbq = function () {
		n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
	};
	if (!f._fbq) f._fbq = n;
	n.push = n;
	n.loaded = !0;
	n.version = '2.0';
	n.queue = [];
	t = b.createElement(e);
	t.async = !0;
	t.src = v;
	s = b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2682287902136321');
fbq('track', 'PageView');
