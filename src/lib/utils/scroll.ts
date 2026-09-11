/**
 * Scroll Utilities
 * Shared utilities for handling scroll events and observers
 */

import { onMount } from 'svelte';

/**
 * Creates a scroll event observer with automatic cleanup.
 *
 * Reads are coalesced with requestAnimationFrame so the callback runs at most
 * once per frame. The listener previously wrote reactive state on every scroll
 * event, which re-rendered the header far more often than the display could
 * show.
 *
 * @param callback - Function to call with the current scrollY position
 */
export function createScrollObserver(callback: (scrollY: number) => void) {
	onMount(() => {
		let frame = 0;

		const handleScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				callback(window.scrollY);
			});
		};

		// Initial call to set initial state
		callback(window.scrollY);

		// Add passive listener for better performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', handleScroll);
		};
	});
}
