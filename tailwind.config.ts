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
          orange: 'var(--brand-orange)',
          earth: '#8B4513', // Added for contractor earth tones
          gravel: '#A9A9A9' // Added for modern consistency
        },
        surface: {
          base: 'var(--surface-base)',
          muted: 'var(--surface-muted)',
          soft: 'var(--surface-soft)'
        },
        border: {
          soft: 'var(--border-soft)'
        }
      },
      spacing: {
        'section': '3rem', // Consistent section spacing
        'content': '1.5rem' // Uniform content padding
      }
    }
  }
} satisfies Config;

export default config;