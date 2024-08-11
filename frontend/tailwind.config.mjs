import typographyPlugin from "@tailwindcss/typography";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.green.500"),
              "&:hover": {
                color: theme("colors.green.500"),
              },
            },
            h1: {
              color: theme("colors.gray.300"),
            },
            h2: {
              color: theme("colors.gray.300"),
            },
            h3: {
              color: theme("colors.gray.300"),
            },
            h4: {
              color: theme("colors.gray.300"),
            },
            h5: {
              color: theme("colors.gray.300"),
            },
            h6: {
              color: theme("colors.gray.300"),
            },
            strong: {
              color: theme("colors.gray.300"),
            },
            code: {
              color: theme("colors.gray.300"),
            },
            figcaption: {
              color: theme("colors.gray.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [typographyPlugin, formsPlugin],
};
