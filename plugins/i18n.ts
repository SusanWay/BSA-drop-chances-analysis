// plugins/i18n.ts
import { createI18n } from "vue-i18n";
import messages from "@/locales/messages";

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = createI18n({
        legacy: false,
        locale: "ru",
        fallbackLocale: "en",
        messages,
    });

    nuxtApp.vueApp.use(i18n);
});
