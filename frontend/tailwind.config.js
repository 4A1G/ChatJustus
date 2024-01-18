import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--my-font-sans)'],
        serif: ['var(--my-font-serif)'],
        mono: ['var(--my-font-mono)'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#11181C',
            default: {
              50: '#fafafa80',
              100: '#f4f4f580',
              200: '#e4e4e780',
              300: '#d4d4d880',
              400: '#a1a1aa80',
              500: '#71717a80',
              600: '#52525b80',
              700: '#3f3f4680',
              800: '#27272a80',
              900: '#18181b80',
              DEFAULT: "#d4d4d880",
              foreground: "#11181C",
            },
            primary: {
              50: '#e5f0ff80',
              100: '#c1d2f380',
              200: '#9bb5e580',
              300: '#7497d780',
              400: '#4e79cb80',
              500: '#3460b180',
              600: '#274a8b80',
              700: '#1a356480',
              800: '#0b203f80',
              900: '#000b1c80',
              DEFAULT: "#5C84CF80",
              foreground: "#11181C",
            },
            secondary:
            {
              50: '#fff6df80',
              100: '#ffe4b380',
              200: '#fed28380',
              300: '#fec05280',
              400: '#fdaf2580',
              500: '#e4961380',
              600: '#b2740b80',
              700: '#7f530480',
              800: '#4d320080',
              900: '#1c110080',
              DEFAULT: "#ffebc680",
              foreground: "#11181C",
            },
            focus: "#5C84CF",
            success: "#0ca04f80",
            warning: "#db8b0a80",
            danger: "#e5051080",
          },
        },

        dark: {
          colors: {
            success: {
              foreground: "#ECEDEE"
            },
            warning: {
              foreground: "#ECEDEE"
            },
            // background: '#00000055',
            // foreground: '#ECEDEE',

            // default: '#3f3f4655',
            // primary: "#1C9B9155",
            // focus: "#7FA1FF55",
            // secondary: "#ffebc655",

            // success: "#17c96480",
            // warning: "#f5a52480",
            // danger: "#ff3c4980",
          },
        },
      },
    })],
}
