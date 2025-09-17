import type { Action } from 'svelte/action';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const DEFAULT_OPTIONS: IntersectionObserverInit = { threshold: 0.25 };

export const inView: Action<HTMLElement, IntersectionObserverInit | undefined> = (
        node,
        options
) => {
        let observer: IntersectionObserver | null = null;
        let mediaQuery: MediaQueryList | null = null;
        let currentOptions: IntersectionObserverInit = { ...DEFAULT_OPTIONS, ...(options ?? {}) };
        let supportsObserver = false;

        const setInView = () => {
                node.setAttribute('data-in-view', 'true');
        };

        const disconnectObserver = () => {
                if (observer) {
                        observer.disconnect();
                        observer = null;
                }
        };

        const observe = () => {
                if (node.dataset.inView === 'true') {
                        return;
                }

                if (!supportsObserver) {
                        setInView();
                        return;
                }

                disconnectObserver();

                observer = new IntersectionObserver((entries) => {
                        for (const entry of entries) {
                                if (entry.isIntersecting) {
                                        setInView();
                                        disconnectObserver();
                                        break;
                                }
                        }
                }, currentOptions);

                observer.observe(node);
        };

        const handlePreferenceChange = (event: MediaQueryListEvent) => {
                if (event.matches) {
                        setInView();
                        disconnectObserver();
                } else {
                        observe();
                }
        };

        if (typeof window === 'undefined') {
                setInView();
                return {
                        update(newOptions) {
                                currentOptions = { ...DEFAULT_OPTIONS, ...(newOptions ?? {}) };
                        },
                        destroy() {
                                /* noop on the server */
                        }
                };
        }

        supportsObserver = 'IntersectionObserver' in window;
        if ('matchMedia' in window) {
                mediaQuery = window.matchMedia(MEDIA_QUERY);
        }

        if (mediaQuery?.matches || !supportsObserver) {
                setInView();
        } else {
                observe();
        }

        mediaQuery?.addEventListener('change', handlePreferenceChange);

        return {
                update(newOptions) {
                        currentOptions = { ...DEFAULT_OPTIONS, ...(newOptions ?? {}) };

                        if (node.dataset.inView === 'true') {
                                return;
                        }

                        if (mediaQuery?.matches) {
                                setInView();
                                disconnectObserver();
                                return;
                        }

                        observe();
                },
                destroy() {
                        disconnectObserver();
                        mediaQuery?.removeEventListener('change', handlePreferenceChange);
                }
        };
};
