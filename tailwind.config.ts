import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        borderColor: "var(--border)",
        dashboardMainContentColor: "var(--dashboard-main-content-background)",
        mediumGray: "#828FA3",
        darkGrey: "#2B2C37",
        input: "#E4EBFA",
        ring: "#635FC7",
        background: "var(--background)",
        bgHover: "var(--background-hover)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          hover: "var(--destructive-hover)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      backgroundImage: {
        "add-new-column-gradient-dark":
          "linear-gradient(to right, #2B2C37 0%, rgba(43, 44, 55, 0.5) 100%)",
        "add-new-column-gradient-hover-dark":
          "linear-gradient(to right, rgba(43, 44, 55, 0.9) 0%, rgba(43, 44, 55, 0.1) 100%)",

        "add-new-column-gradient-light":
          "linear-gradient(to right, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
        "add-new-column-gradient-hover-light":
          "linear-gradient(to right, #DFE7F5 0%, rgba(223, 231, 245, 0.6) 100%)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["24px", { lineHeight: "30px" }],
        "heading-l": ["18px", { lineHeight: "23px" }],
        "heading-m": ["15px", { lineHeight: "19px" }],
        "heading-s": ["12px", { lineHeight: "15px", letterSpacing: "0.15em" }],
        "body-l": ["13px", { lineHeight: "23px" }],
        "body-m": ["12px", { lineHeight: "15px" }],
      },
      fontWeight: {
        bold: "700",
        medium: "500",
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
