import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Perth Coastal Palette
        primary: {
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          200: "#BFDBFE", // blue-200
          300: "#93C5FD", // blue-300
          400: "#60A5FA", // blue-400
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
          800: "#1E40AF", // blue-800 - Deep ocean blue for trust and Perth coastal identity
          900: "#1E3A8A", // blue-900
          DEFAULT: "#1E40AF", // blue-800
        },
        // Secondary Colors
        secondary: {
          50: "#F0F9FF", // sky-50
          100: "#E0F2FE", // sky-100
          200: "#BAE6FD", // sky-200
          300: "#7DD3FC", // sky-300
          400: "#38BDF8", // sky-400
          500: "#0EA5E9", // sky-500 - Lighter blue for interactive elements and freshness cues
          600: "#0284C7", // sky-600
          700: "#0369A1", // sky-700
          800: "#075985", // sky-800
          900: "#0C4A6E", // sky-900
          DEFAULT: "#0EA5E9", // sky-500
        },
        // Accent Colors
        accent: {
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
          200: "#FDE68A", // amber-200
          300: "#FCD34D", // amber-300
          400: "#FBBF24", // amber-400
          500: "#F59E0B", // amber-500 - Golden yellow for appetite appeal and action triggers
          600: "#D97706", // amber-600
          700: "#B45309", // amber-700
          800: "#92400E", // amber-800
          900: "#78350F", // amber-900
          DEFAULT: "#F59E0B", // amber-500
        },
        // Background Colors
        background: "#FEFEFE", // white - Pure white for cleanliness and premium perception
        surface: "#F8FAFC", // slate-50 - Subtle gray for card backgrounds and gentle separation
        
        // Text Colors
        text: {
          primary: "#1F2937", // gray-800 - Dark gray for comfortable extended reading
          secondary: "#6B7280", // gray-500 - Medium gray for supporting information hierarchy
        },
        
        // Status Colors
        success: {
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500 - Fresh green for order confirmations and positive states
          600: "#059669", // emerald-600
          DEFAULT: "#10B981", // emerald-500
        },
        warning: {
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
          500: "#F59E0B", // amber-500 - Warm amber for urgency without creating anxiety
          DEFAULT: "#F59E0B", // amber-500
        },
        error: {
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
          500: "#EF4444", // red-500 - Clear red for helpful error guidance and corrections
          600: "#DC2626", // red-600
          DEFAULT: "#EF4444", // red-500
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        accent: ['var(--font-caveat)', 'Caveat', 'cursive'],
        caveat: ['var(--font-caveat)', 'Caveat', 'cursive'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionDuration: {
        smooth: '300ms',
        micro: '200ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config;