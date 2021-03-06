module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "sd-brblack": "#002B36",
        "sd-black": "#073642",
        "sd-brgreen": "#586e75",
        "sd-bryellow": "#657b83",
        "sd-brblue": "#839496",
        "sd-brcyan": "#93a1a1",
        "sd-white": "#eee8d5",
        "sd-brwhite": "#fdf6e3",
        "sd-yellow": "#b58900",
        "sd-orange": "#cb4b16",
        "sd-red": "#d30102",
        "sd-magenta": "#d33682",
        "sd-violet": "#6c71c4",
        "sd-blue": "#268bd2",
        "sd-cyan": "#2aa198",
        "sd-green": "#859900",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.sd-black"),
            h1: {
              fontWeight: "800",
              fontSize: theme("fontSize.4xl"),
              letterSpacing: theme("letterSpacing.wide"),
              color: theme("colors.sd-brblack"),
              lineHeight: theme("lineHeight.normal"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.wide"),
              color: theme("colors.sd-brblack"),
            },
            h3: {
              fontWeight: "700",
              color: theme("colors.sd-brblack"),
            },
            "h4, h5, h6": {
              fontWeight: "500",
              color: theme("colors.sd-brblack"),
            },
            ol: {
              li: {
                "&:before": { color: theme("colors.sd-black") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.sd-black") },
              },
            },
            strong: {
              fontWeight: 800,
              color: theme("colors.sd-brblack"),
            },
            code: {
              fontSize: theme("fontSize.sm"),
              fontWeight: 300,
              color: theme("colors.red.800"),
              backgroundColor: theme("colors.sd-white"),
              borderRadius: "0.1rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.125rem",
              paddingBottom: "0.125rem",
              wordBreak: "break-word",
            },
            a: {
              color: theme("colors.indigo.800"),
              fontWeight: 600,
            },
            pre: {
              // backgroundColor: theme("colors.sd-black"),
              code: {
                fontSize: theme("fontSize.base"),
                fontWeight: 300,
                color: theme("colors.sd-white"),
                // backgroundColor: theme("colors.sd-black"),
                paddingLeft: "0rem",
                paddingRight: "0rem",
                paddingTop: "0rem",
                paddingBottom: "0rem",
              },
            },
            blockquote: {
              color: theme("colors.sd-brblack"),
              borderLeftColor: theme("colors.sd-black"),
              backgroundColor: theme("colors.sd-white"),
              paddingBottom: "1px",
              paddingTop: "1px",
            },
            hr: {
              borderColor: theme("colors.sd-brcyan"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.sd-white"),
            h1: {
              fontWeight: "800",
              fontSize: theme("fontSize.4xl"),
              letterSpacing: theme("letterSpacing.wide"),
              color: theme("colors.sd-white"),
              lineHeight: theme("lineHeight.normal"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.wide"),
              color: theme("colors.sd-brwhite"),
            },
            h3: {
              fontWeight: "700",
              color: theme("colors.sd-brwhite"),
            },
            "h4, h5, h6": {
              fontWeight: "500",
              color: theme("colors.sd-brwhite"),
            },
            ol: {
              li: {
                "&:before": { color: theme("colors.sd-white") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.sd-white") },
              },
            },
            strong: {
              fontWeight: 800,
              color: theme("colors.sd-brwhite"),
            },
            code: {
              fontSize: theme("fontSize.sm"),
              fontWeight: 300,
              color: theme("colors.red.600"),
              backgroundColor: theme("colors.sd-black"),
              borderRadius: "0.1rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              paddingTop: "0.125rem",
              paddingBottom: "0.125rem",
              wordBreak: "break-word",
            },
            a: {
              color: theme("colors.indigo.400"),
              fontWeight: 600,
            },
            pre: {
              backgroundColor: theme("colors.sd-black"),
              code: {
                fontWeight: 300,
                fontSize: theme("fontSize.base"),
                color: theme("colors.sd-brwhite"),
                backgroundColor: theme("colors.sd-black"),
                paddingLeft: "0rem",
                paddingRight: "0rem",
                paddingTop: "0rem",
                paddingBottom: "0rem",
              },
            },
            blockquote: {
              color: theme("colors.sd-brwhite"),
              borderLeftColor: theme("colors.sd-brwhite"),
              backgroundColor: theme("colors.sd-black"),
            },
            hr: {
              borderColor: theme("colors.sd-brgreen"),
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontWeight: "800",
              fontSize: theme("fontSize.4xl"),
              letterSpacing: theme("letterSpacing.wide"),
              color: theme("colors.sd-brblack"),
              lineHeight: theme("lineHeight.normal"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
