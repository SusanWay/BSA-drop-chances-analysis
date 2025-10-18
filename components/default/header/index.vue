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

<template>
  <header class="bg-surface-light border-b border-surface/40">
    <div class="container flex items-center justify-between py-3">
      <NuxtLink to="/" class="font-semibold tracking-tight text-primary">
        {{ t("common.brand") }}
      </NuxtLink>

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
