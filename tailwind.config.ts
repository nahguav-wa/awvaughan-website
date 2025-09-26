import type { Config } from 'tailwindcss';

const config = {
        theme: {
                extend: {
                        colors: {
                                background: 'var(--surface-base)',
                                foreground: 'var(--text-dark)',
                                muted: {
                                        DEFAULT: 'var(--surface-muted)',
                                        foreground: 'var(--text-muted)'
                                },
                                brand: {
                                        blue: 'var(--brand-blue)',
                                        'blue-soft': 'var(--brand-blue-soft)',
                                        orange: 'var(--brand-orange)'
                                },
                                surface: {
                                        base: 'var(--surface-base)',
                                        muted: 'var(--surface-muted)',
                                        soft: 'var(--surface-soft)'
                                },
                                border: {
                                        soft: 'var(--border-soft)'
                                }
                        }
                }
        }

} satisfies Config;

export default config;
