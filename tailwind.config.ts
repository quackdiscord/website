import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./comps/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            }
        }
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                primary: {
                    primary: "#feb032",
                    secondary: "#3261a5",
                    accent: "#8b008b",
                    "base-100": "#191919",
                    "base-200": "#0f0f0f",
                    "base-300": "#050505",
                    neutral: "#403d3d",
                    info: "#43b7fb",
                    success: "#00980d",
                    warning: "#fbe843",
                    error: "#fb4343",
                    gold: "#f7c02c"
                }
            }
        ]
    }
};
export default config;
