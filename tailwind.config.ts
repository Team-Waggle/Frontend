// tailwind.config.ts
import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // Base font size for rem calculations
        root: '10px',
        // Headings
        'heading-34_Sb600': [
          '3.4rem',
          { fontWeight: 600, lineHeight: '5.1rem', letterSpacing: '0.1rem' },
        ],
        'heading-32_R400': [
          '3.2rem',
          { fontWeight: 400, lineHeight: '150%', letterSpacing: '0.1rem' },
        ],
        'heading-26_B700': [
          '2.6rem',
          { fontWeight: 700, lineHeight: '150%', letterSpacing: '0.1rem' },
        ],
        // Title text
        'title-24_Sb600': [
          '2.4rem',
          { fontWeight: 600, lineHeight: '3.6rem', letterSpacing: '0' },
        ],
        'title-20_Sb600': [
          '2rem',
          { fontWeight: 700, lineHeight: '3rem', letterSpacing: '0' },
        ],
        'title-18_Sb600': [
          '1.8rem',
          { fontWeight: 600, lineHeight: '2.7rem', letterSpacing: '0' },
        ],
        // Sub Title text
        'subtitle-18_R400': [
          '1.8rem',
          { fontWeight: 400, lineHeight: '150%', letterSpacing: '0' },
        ],
        'subtitle-16_Sb600': [
          '1.6rem',
          { fontWeight: 600, lineHeight: '2.4rem', letterSpacing: '0' },
        ],
        'subtitle-14_Sb600': [
          '1.4rem',
          { fontWeight: 600, lineHeight: '2.1rem', letterSpacing: '0' },
        ],
        // Body text
        'body-16_M500': [
          '1.6rem',
          { fontWeight: 500, lineHeight: '2.64rem', letterSpacing: '0' },
        ],
        'body-16_R400': [
          '1.6rem',
          { fontWeight: 400, lineHeight: '165%', letterSpacing: '0' },
        ],
        'body-14_M500': [
          '1.4rem',
          { fontWeight: 500, lineHeight: '2.352rem', letterSpacing: '0' },
        ],
        'body-14_R400': [
          '1.4rem',
          { fontWeight: 400, lineHeight: '2.352rem', letterSpacing: '0' },
        ],
        'body-13_M500': [
          '1.3rem',
          { fontWeight: 500, lineHeight: '168%', letterSpacing: '0' },
        ],
        'body-13_R400': [
          '1.3rem',
          { fontWeight: 400, lineHeight: '168%', letterSpacing: '0' },
        ],
        // Caption text
        'caption-16_M500': [
          '1.6rem',
          { fontWeight: 500, lineHeight: '2.4rem', letterSpacing: '0' },
        ],
        'caption-14_M500': [
          '1.4rem',
          { fontWeight: 500, lineHeight: '150%', letterSpacing: '0' },
        ],
        'caption-13_Sb600': [
          '1.3rem',
          { fontWeight: 600, lineHeight: '1.95rem', letterSpacing: '0' },
        ],
        'caption-13_M500': [
          '1.3rem',
          { fontWeight: 500, lineHeight: '1.95rem', letterSpacing: '0' },
        ],
        'caption-13_R400': [
          '1.3rem',
          { fontWeight: 400, lineHeight: '1.95rem', letterSpacing: '0' },
        ],
        'caption-12_Sb600': [
          '1.2rem',
          { fontWeight: 600, lineHeight: '1.8rem', letterSpacing: '0' },
        ],
        'caption-12_M500': [
          '1.2rem',
          { fontWeight: 500, lineHeight: '1.8rem', letterSpacing: '0' },
        ],
        'caption-12_R400': [
          '1.2rem',
          { fontWeight: 400, lineHeight: '1.8rem', letterSpacing: '0' },
        ],
        'caption-11_R400': [
          '1.4rem',
          { fontWeight: 400, lineHeight: '150%', letterSpacing: '0' },
        ],
        'caption-10_Sb600': [
          '1.0rem',
          { fontWeight: 600, lineHeight: '150%', letterSpacing: '0' },
        ],
        'caption-10_M500': [
          '1.0rem',
          { fontWeight: 500, lineHeight: '150%', letterSpacing: '0' },
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          10: '#F2F7FF',
          20: '#D9E8FF',
          30: '#BFD8FF',
          40: '#A6CAFF',
          50: '#66A3FF',
          60: '#3385FF',
          70: '#0066FF',
          80: '#0657D2',
          90: '#0C49A5',
          100: '#113A79',
        },
        black: {
          DEFAULT: '#949598',
          10: '#FFFFFF',
          20: '#FDFDFD',
          30: '#F6F6F6',
          40: '#F1F1F1',
          50: '#DBDCDD',
          60: '#C4C4C6',
          70: '#949598',
          80: '#65666A',
          90: '#525358',
          100: '#36373C',
          110: '#2E3035',
          120: '#25272C',
          130: '#12141A',
        },
        orange: {
          DEFAULT: '#FF8820',
          10: '#FFF7F0',
          20: '#FFF3E9',
          30: '#FFE2C9',
          40: '#FFCC9F',
          50: '#FFB473',
          60: '#FF9D48',
          70: '#FF8820',
          80: '#D9741B',
          90: '#B56117',
          100: '#914E12',
          110: '#733D0E',
        },
        yellow: {
          DEFAULT: '#FFE100',
          10: '#FFFDEB',
          20: '#FFFCE6',
          30: '#FFF8C2',
          40: '#FFF291',
          50: '#FFEC5E',
          60: '#FFE62E',
          70: '#FFE100',
          80: '#D9BF00',
          90: '#B5A000',
          100: '#918000',
          110: '#736500',
        },
        green: {
          DEFAULT: '#1AB415',
          10: '#F3FBF3',
          20: '#E8F8E8',
          30: '#C8EDC7',
          40: '#9DDF9A',
          50: '#6FD06C',
          60: '#43C23F',
          70: '#1AB415',
          80: '#169912',
          90: '#12800F',
          100: '#0F670C',
          110: '#0C5109',
        },
        error: { DEFAULT: '#F5552D' },
      },
      boxShadow: {
        dropbox: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
        applicant:
          '1px 1px 5px 0px rgba(23,23,27,0.3), -1px -1px 5px 0px rgba(23,23,27,0.3)',
        pop: '0px 0px 1px 0px rgba(0,0,0,0.08), 0px 1px 4px 0px rgba(0,0,0,0.08), 0px 2px 8px 0px rgba(0,0,0,0.12)',
        push: '-1px -2px 2px 0px rgba(255, 255, 255, 0.25) inset, 1px 1px 2px 0px rgba(23, 23, 27, 0.1) inset',
      },
      blur: { DEFAULT: '2px' },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};

export default config;
