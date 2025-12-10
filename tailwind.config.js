/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sustainability Nature Colors - Olive Green (Leaves) & Soil Brown (Earth)
        'brand': {
          50: '#f5f7f0',   // Very light olive tint
          100: '#e8ecd8',  // Light sage
          200: '#d4dcb8',  // Soft olive
          300: '#b8c98a',  // Light olive green
          400: '#8fbc5a',  // Medium olive
          500: '#6b8e23',  // Olive drab - primary leaf color
          600: '#556b2f',  // Dark olive green
          700: '#4a5d28',  // Deep olive
          800: '#3d4a21',  // Forest olive
          900: '#2d3718',  // Dark forest
        },
        
        // Olive Green - Plant Leaf Colors
        'olive': {
          50: '#f5f7f0',
          100: '#e8ecd8',
          200: '#d4dcb8',
          300: '#b8c98a',
          400: '#8fbc5a',
          500: '#6b8e23',  // Classic olive drab
          600: '#556b2f',  // Dark olive green
          700: '#4a5d28',
          800: '#3d4a21',
          900: '#2d3718',
        },
        
        // Soil Brown - Earth Colors
        'soil': {
          50: '#faf7f4',
          100: '#f0e6db',
          200: '#e0ccb8',
          300: '#c9a882',
          400: '#b08b5c',
          500: '#8b7355',  // Medium soil brown
          600: '#6b5642',  // Rich earth
          700: '#5c4033',  // Dark earth
          800: '#4a3328',
          900: '#3d2a20',
        },
        
        // Legacy support - mapped to olive
        'green-primary': '#556b2f',   // Dark olive
        'green-secondary': '#6b8e23', // Olive drab
        'green-accent': '#8fbc5a',    // Light olive
        'green-light': '#e8ecd8',     // Very light olive
        'green-subtle': '#f5f7f0',    // Olive tint
        
        // Eco colors - Nature sustainability palette
        'eco-primary': '#556b2f',     // Dark olive (leaves)
        'eco-secondary': '#6b8e23',   // Olive drab
        'eco-accent': '#8fbc5a',      // Light olive
        'eco-light': '#e8ecd8',       // Soft sage
        'eco-subtle': '#f5f7f0',      // Olive tint
        'carbon-neutral': '#3d4a21',  // Deep forest
        'organic': '#8b7355',         // Soil brown
        'renewable': '#b8c98a',       // Light leaf green
        
        // Semantic colors
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'info': 'var(--color-info)',
        
        // Modern surface colors
        'background': '#f9fafb', // gray-50
        'surface': '#ffffff', // white
        'surface-elevated': '#f3f4f6', // gray-100
        
        // Modern text colors
        'text-primary': '#111827', // gray-900
        'text-secondary': '#374151', // gray-700
        'text-tertiary': '#6b7280', // gray-500
        
        // Neutral scale
        'neutral': {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        }
      },
      fontFamily: {
        'sans': 'var(--font-sans)',
        'mono': 'var(--font-mono)',
        'eb-garamond': 'var(--font-eb-garamond)',
        'reem': ["var(--font-reemkufi)", "sans-serif"],
        'poppins': ["var(--font-poppins)", "sans-serif"],
        'inter': ["Inter", "sans-serif"],
        'nunito': ["Nunito Sans", "sans-serif"],
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      lineHeight: {
        'none': 'var(--leading-none)',
        'tight': 'var(--leading-tight)',
        'snug': 'var(--leading-snug)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
      },
      spacing: {
        '0': 'var(--spacing-0)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.06)",
        'card-hover': "0 12px 32px rgba(0,0,0,0.10)",
      },
      backgroundImage: {
        'gradient-moss': 'linear-gradient(135deg, #6b8e23 0%, #556b2f 100%)',     // Olive gradient
        'gradient-olive': 'linear-gradient(135deg, #8fbc5a 0%, #6b8e23 100%)',    // Light to medium olive
        'gradient-earth': 'linear-gradient(135deg, #8b7355 0%, #5c4033 100%)',    // Soil brown gradient
        'gradient-nature': 'linear-gradient(135deg, #6b8e23 0%, #8b7355 100%)',   // Olive to soil
        'gradient-brand': 'linear-gradient(135deg, #f5f7f0 0%, #e8ecd8 100%)',    // Light olive tint
        'gradient-sustainability': 'linear-gradient(135deg, #556b2f 0%, #6b8e23 50%, #8b7355 100%)', // Full nature palette
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(10px, -10px) scale(1.05)' },
          '66%': { transform: 'translate(-10px, 10px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-in-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slideInUp': {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 12s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'slide-in-up': 'slide-in-up 300ms ease-out both',
        'slideInUp': 'slideInUp 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
};
