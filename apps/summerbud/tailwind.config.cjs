module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.gray.300"),
						h1: {
							fontWeight: "800",
							fontSize: "48px",
							letterSpacing: theme("letterSpacing.wide"),
							color: theme("colors.gray.100"),
							lineHeight: theme("lineHeight.normal"),
						},
						h2: {
							fontWeight: "700",
							fontSize: "40px",
							letterSpacing: theme("letterSpacing.wide"),
							color: theme("colors.gray.200"),
						},
						h3: {
							fontWeight: "700",
							fontSize: "32px",
							color: theme("colors.gray.300"),
						},
						"h4, h5, h6": {
							fontWeight: "500",
							fontSize: "28px",
							color: theme("colors.gray.300"),
						},
						ol: {
							li: {
								"&:before": { color: theme("colors.gray.300") },
								color: theme("colors.gray.300"),
								fontSize: "20px",
							},
						},
						ul: {
							li: {
								"&:before": { backgroundColor: theme("colors.gray.300") },
								color: theme("colors.gray.300"),
								fontSize: "20px",
							},
						},
						strong: {
							fontWeight: 800,
							color: theme("colors.gray.200"),
						},
						code: {
							fontSize: "18px",
							fontWeight: 300,
							color: theme("colors.gray.300"),
							backgroundColor: theme("colors.gray.700"),
							borderRadius: "0.25rem",
							paddingLeft: "0.5rem",
							paddingRight: "0.5rem",
							paddingTop: "0.25rem",
							paddingBottom: "0.25rem",
							wordBreak: "break-word",
						},
						p: {
							color: theme("colors.sd-brcyan"),
							fontSize: "20px",
						},
						a: {
							color: theme("colors.indigo.400"),
							fontWeight: 600,
							wordBreak: "break-word",
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
							color: theme("colors.gray.300"),
							borderLeftColor: theme("colors.gray.300"),
							backgroundColor: theme("colors.gray.800"),
							borderRadius: "0.25rem",
							paddingLeft: "0.5rem",
							paddingRight: "0.5rem",
							paddingTop: "0.25rem",
							paddingBottom: "0.25rem",
						},
						hr: {
							borderColor: theme("colors.sd-brgreen"),
						},
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
