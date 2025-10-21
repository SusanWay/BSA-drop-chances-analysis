<template>
  <header
      class="sticky top-0 z-50 bg-surface-light border-b border-surface/40 backdrop-blur supports-[backdrop-filter]:bg-surface-light/80"
  >
    <div class="container flex items-center justify-between py-3">
      <!-- Левая часть: ссылки -->
      <nav class="flex items-center gap-6">
        <!-- Главная -->
        <NuxtLink
            to="/"
            class="font-semibold tracking-tight transition-colors"
            active-class="text-primary"
            exact-active-class="text-primary"
        >
          {{ t("common.brand") }}
        </NuxtLink>

        <!-- Калькулятор -->
        <NuxtLink
            to="/calculator"
            class="transition-colors"
            active-class="text-primary font-medium"
        >
          {{ t("common.calculator") }}
        </NuxtLink>
      </nav>

      <!-- Правая часть: переключатель языка -->
      <div class="inline-flex rounded-md overflow-hidden border border-surface/50">
        <button
            v-for="l in langs"
            :key="l.code"
            type="button"
            @click="setLang(l.code)"
            class="px-3 py-1.5 text-sm transition-colors"
            :class="[
            locale === l.code
              ? 'bg-primary text-surface font-medium'
              : 'bg-surface-light text-text-muted hover:bg-surface'
          ]"
            :aria-pressed="locale === l.code"
        >
          {{ l.label }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const langs = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

function setLang(code: string) {
  locale.value = code;
}
</script>
