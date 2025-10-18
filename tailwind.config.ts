// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./components/**/*.{vue,js,ts}",
        "./layouts/**/*.{vue,js,ts}",
        "./pages/**/*.{vue,js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // 🎨 Deep Blue Sea
                primary: {
                    DEFAULT: "#5BC0BE", // основной акцент (бирюзовый)
                    light: "#6FFFE9",   // подсветка / hover
                    dark: "#3A506B",    // насыщенный для кнопок / границ
                },
                surface: {
                    DEFAULT: "#0B132B", // главный фон
                    light: "#1C2541",   // карточки / панели
                },
                text: {
                    DEFAULT: "#E5E7EB", // светлый текст на тёмном фоне
                    muted: "#9CA3AF",   // второстепенный
                },
            },
            fontFamily: {
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
            },
            container: {
                center: true,
                padding: "1rem",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
