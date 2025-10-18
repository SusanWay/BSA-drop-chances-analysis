// nuxt.config.ts
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],

    modules: [
        ["@nuxtjs/tailwindcss", { viewer: false }],
        "@nuxtjs/google-fonts",
    ],

    googleFonts: {
        families: { Roboto: [100, 300, 400, 500, 700] },
        display: "swap",
        download: true,
        inject: true,
    },

    postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },

    // 🧠 Базовые метаданные сайта
    app: {
        head: {
            title: "BSA — Шансы дропа",
            meta: [
                { name: "description", content: "Подробное руководство по шансам дропа и механикам кастомки Dota 2: Boss Survival Adventure." },
                { name: "keywords", content: "Dota 2, BSA, Boss Survival Adventure, шансы дропа, Jewel of Bless, гайд" },
                { property: "og:title", content: "BSA — Шансы дропа" },
                { property: "og:description", content: "Узнай всё о шансах дропа и гильдейских бонусах в Boss Survival Adventure." },
                { property: "og:type", content: "website" },
                { name: "theme-color", content: "#111827" },
            ],
            link: [
                { rel: "icon", type: "image/png", href: "/favicon.png" },
            ],
        },
    },
});
