<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="mt-10">
    <div
        class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10"
    >
      <!-- Заголовок -->
      <h2 class="text-3xl font-bold text-primary mb-5">
        {{ t("article.bless.title") }}
      </h2>

      <!-- Обзор (HTML с зелёными выделениями и двумя абзацами) -->
      <div
          class="text-text-muted leading-relaxed mb-6"
          v-html="t('article.bless.overview')"
      />

      <!-- Как происходит проверка -->
      <h3 class="text-xl font-semibold text-primary mt-6 mb-3">
        {{ t("article.bless.how.title") }}
      </h3>
      <ol class="list-decimal pl-5 space-y-2 text-text-muted">
        <li>{{ t("article.bless.how.step1") }}</li>
        <li>{{ t("article.bless.how.step2") }}</li>
        <li>{{ t("article.bless.how.step3") }}</li>
      </ol>

      <!-- Почему выгоднее соло -->
      <h3 class="text-xl font-semibold text-primary mt-8 mb-3">
        {{ t("article.bless.solo.title") }}
      </h3>
      <p
          class="text-text-muted leading-relaxed"
          v-html="t('article.bless.solo.body')"
      />

      <!-- Почему важна сложность -->
      <h3 class="text-xl font-semibold text-primary mt-8 mb-3">
        {{ t("article.bless.difficulty.title") }}
      </h3>
      <p class="text-text-muted leading-relaxed">
        {{ t("article.bless.difficulty.body") }}
      </p>

      <!-- Практические советы -->
      <div class="mt-8 rounded-xl border border-primary/30 bg-surface p-5">
        <p class="font-medium text-primary">
          {{ t("article.bless.tip.title") }}
        </p>
        <ul class="mt-2 list-disc pl-5 space-y-1 text-text-muted">
          <li>{{ t("article.bless.tip.t1") }}</li>
          <li>{{ t("article.bless.tip.t2") }}</li>
          <li>{{ t("article.bless.tip.t3") }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
