/**
 * Scroll Utilities
 * Shared utilities for handling scroll events and observers
 */

import { onMount } from 'svelte';

/**
 * Creates a scroll event observer with automatic cleanup
 * @param callback - Function to call on scroll with current scrollY position
 * @returns Cleanup function (automatically called on component unmount)
 */
export function createScrollObserver(callback: (scrollY: number) => void) {
	onMount(() => {
		// Handler function to call callback with current scroll position
		const handleScroll = () => {
			callback(window.scrollY);
		};

		// Initial call to set initial state
		handleScroll();

		// Add passive listener for better performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Cleanup function (called on component unmount)
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
}

/**
 * Throttles a function to execute at most once per delay period
 * Useful for optimizing scroll event handlers
 * @param func - Function to throttle
 * @param delay - Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<Args extends unknown[], R>(
	func: (...args: Args) => R,
	delay: number
): (...args: Args) => void {
	let lastCall = 0;
	return (...args: Args) => {
		const now = Date.now();
		if (now - lastCall >= delay) {
			lastCall = now;
			func(...args);
		}
	};
}
