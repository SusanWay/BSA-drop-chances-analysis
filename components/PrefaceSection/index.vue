<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="mt-10">
    <div
        class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10"
    >
      <h2 class="text-3xl font-bold text-primary mb-5">
        {{ t("article.preface.title") }}
      </h2>

      <div
          class="text-text-muted leading-relaxed mb-3"
          v-html="t('article.preface.p1')"
      />
      <div
          class="text-text-muted leading-relaxed"
          v-html="t('article.preface.p2')"
      />
    </div>
  </section>
</template>
