import localFont from 'next/font/local';

export const myFont = localFont({
  src: '../public/fonts/Anton-Regular.woff2',
  display: 'swap',
  variable: '--font-my', // To use it with Tailwind
});
