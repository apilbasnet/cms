import type { Config } from 'tailwindcss';
import twedge from '@edge-ui/react/tailwind-plugin';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    twedge.getContentPath(),
  ],
  theme: {
    extend: {},
  },
  plugins: [twedge()],
};

export default config;
