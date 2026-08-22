import type { Config } from 'tailwindcss';
const config: Config = { 
  content:['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme:{
    extend:{
      colors:{
        primary: '#123B2A',
        secondary: '#1D5A40',
        tertiary: '#C9A24A',
        neutral: '#171A17',
        ovow:{green:'#123B2A',dark:'#0B2118',gold:'#C9A24A',cream:'#F8F4EA',ink:'#171A17'}
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-manrope)', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    }
  },
  plugins: [],
};
export default config;
