/**
 * Typography System
 * Standardized font configuration for consistent design
 */

/**
 * Font Configuration
 * Single font family with 4 sizes and 2 weights
 */
export const TYPOGRAPHY = {
	/**
	 * Font Family
	 * Primary: Inter (modern, highly legible sans-serif)
	 * Fallbacks: System fonts for fast loading
	 */
	fontFamily:
		'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',

	/**
	 * Font Sizes (4 standardized sizes)
	 */
	sizes: {
		sm: 'text-sm', // 0.875rem (14px) - Small text, captions
		base: 'text-base', // 1rem (16px) - Body text, default
		lg: 'text-lg', // 1.125rem (18px) - Emphasized text
		xl: 'text-xl' // 1.25rem (20px) - Headings, titles
	},

	/**
	 * Font Weights (2 standardized weights)
	 */
	weights: {
		regular: 'font-normal', // 400 - Regular body text
		bold: 'font-bold' // 700 - Headings, emphasis
	}
} as const;

/**
 * Typography Presets
 * Common text style combinations for quick application
 */
export const TYPOGRAPHY_PRESETS = {
	// Body text
	body: `${TYPOGRAPHY.sizes.base} ${TYPOGRAPHY.weights.regular}`,
	bodySmall: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.regular}`,
	bodyLarge: `${TYPOGRAPHY.sizes.lg} ${TYPOGRAPHY.weights.regular}`,

	// Headings
	heading: `${TYPOGRAPHY.sizes.xl} ${TYPOGRAPHY.weights.bold}`,
	headingLarge: `${TYPOGRAPHY.sizes.xl} ${TYPOGRAPHY.weights.bold}`,

	// Emphasized text
	emphasis: `${TYPOGRAPHY.sizes.base} ${TYPOGRAPHY.weights.bold}`,
	emphasisLarge: `${TYPOGRAPHY.sizes.lg} ${TYPOGRAPHY.weights.bold}`
} as const;
