export type InViewOptions = IntersectionObserverInit & {
	/**
	 * When true, the observer disconnects after the element first enters the viewport.
	 * Defaults to `false` so elements can animate when re-entering the viewport.
	 */
	once?: boolean;
};

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

const noop = () => {
	/* no-op */
};

export function inView(node: HTMLElement, options: InViewOptions = {}) {
	if (typeof window === 'undefined') {
		return {
			update: noop,
			destroy: noop
		};
	}

	let currentOptions = options;
	let once = currentOptions.once ?? false;
	let observerOptions: IntersectionObserverInit = {
		root: currentOptions.root ?? null,
		rootMargin: currentOptions.rootMargin ?? '0px',
		threshold: currentOptions.threshold ?? 0.2
	};

	let observer: IntersectionObserver | null = null;
	const mediaQuery = window.matchMedia(MEDIA_QUERY);
	const canUseMediaQueryEvents =
		typeof mediaQuery.addEventListener === 'function' ||
		typeof mediaQuery.addListener === 'function';

	const canObserve = 'IntersectionObserver' in window;

	const setInView = () => {
		node.dataset.inView = 'true';
	};

	const resetInView = () => {
		node.dataset.inView = 'false';
	};

	const cleanupObserver = () => {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	};

	const handleEntries = (entries: IntersectionObserverEntry[]) => {
		for (const entry of entries) {
			if (entry.target !== node) continue;

			if (entry.isIntersecting) {
				setInView();
				if (once) {
					cleanupObserver();
				}
			} else if (!once) {
				resetInView();
			}
		}
	};

	const startObserving = () => {
		if (!canObserve) {
			setInView();
			return;
		}

		cleanupObserver();
		observer = new IntersectionObserver(handleEntries, observerOptions);
		observer.observe(node);
	};

	const applyPreferences = () => {
		once = currentOptions.once ?? false;
		observerOptions = {
			root: currentOptions.root ?? null,
			rootMargin: currentOptions.rootMargin ?? '0px',
			threshold: currentOptions.threshold ?? 0.2
		};

		if (mediaQuery.matches) {
			cleanupObserver();
			setInView();
			return;
		}

		resetInView();
		startObserving();
	};

	const handleMediaChange = (event: MediaQueryListEvent) => {
		if (event.matches) {
			cleanupObserver();
			setInView();
		} else {
			resetInView();
			startObserving();
		}
	};

	if (canUseMediaQueryEvents) {
		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleMediaChange);
		} else {
			mediaQuery.addListener(handleMediaChange);
		}
	}
	applyPreferences();

	return {
		update(newOptions: InViewOptions = {}) {
			currentOptions = newOptions;
			applyPreferences();
		},
		destroy() {
			cleanupObserver();
			if (canUseMediaQueryEvents) {
				if (typeof mediaQuery.removeEventListener === 'function') {
					mediaQuery.removeEventListener('change', handleMediaChange);
				} else {
					mediaQuery.removeListener(handleMediaChange);
				}
			}
		}
	};
}
