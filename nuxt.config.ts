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

    // 👇 ОБЯЗАТЕЛЬНО для GitHub Pages
    app: {
        baseURL: "/BSA-drop-chances-analysis/", // <-- твой репозиторий
        buildAssetsDir: "assets",               // аккуратные относительные пути
    },
    nitro: {
        preset: "github-pages",                 // корректные статические артефакты
        prerender: {
            crawlLinks: true,
            routes: ["/"],                        // укажи дополнительные маршруты, если нужны
        },
    },
})
