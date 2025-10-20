<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t, tm } = useI18n();

const howSteps = computed(() => (tm("article.attrs.how.steps") as string[]) || []);
const tips = computed(() => (tm("article.attrs.tips.items") as string[]) || []);
const soloRows = computed(
    () => (tm("article.attrs.tables.solo.rows") as Array<Record<string, string>>) || []
);
const guildRows = computed(
    () => (tm("article.attrs.tables.guild.rows") as Array<Record<string, string>>) || []
);
// 🔹 новая таблица — распределение при удачном переролле
const rerollRows = computed(
    () => (tm("article.attrs.tables.reroll.rows") as Array<Record<string, string>>) || []
);
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10">
      <!-- Заголовок -->
      <h2 class="text-3xl font-bold text-primary mb-5">
        {{ t("article.attrs.title") }}
      </h2>

      <!-- Обзор -->
      <div class="text-text-muted leading-relaxed mb-6" v-html="t('article.attrs.overview')" />

      <!-- Как это работает -->
      <h3 class="text-xl font-semibold text-primary mt-6 mb-3">
        {{ t("article.attrs.how.title") }}
      </h3>
      <ol class="list-decimal pl-5 space-y-2 text-text-muted">
        <li v-for="(s, i) in howSteps" :key="i">{{ s }}</li>
      </ol>

      <!-- Советы -->
      <div class="mt-8 rounded-xl border border-primary/30 bg-surface p-5">
        <p class="font-medium text-primary">
          {{ t("article.attrs.tips.title") }}
        </p>
        <ul class="mt-2 list-disc pl-5 space-y-1 text-text-muted">
          <li v-for="(s, i) in tips" :key="i">{{ s }}</li>
        </ul>
      </div>

      <!-- Таблица SOLO -->
      <h3 class="text-xl font-semibold text-primary mt-8 mb-3">
        {{ t("article.attrs.tables.solo.title") }}
      </h3>

      <div
          class="overflow-x-auto rounded-xl border border-surface/50 shadow-[0_0_12px_rgba(255,255,255,0.04)]
               ring-1 ring-white/5 transition hover:ring-white/10"
      >
        <table class="min-w-full text-sm tabular-nums">
          <thead
              class="bg-surface/70 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-surface/60
                   text-text-muted/90 text-xs uppercase tracking-wide"
          >
          <tr
              class="[&>th]:font-medium [&>th]:p-3 [&>th]:whitespace-nowrap [&>th]:border-b [&>th]:border-surface/50"
          >
            <th class="text-left">{{ t("article.attrs.tables.headers.bonus") }}</th>
            <th class="text-right">{{ t("article.attrs.tables.headers.ge1") }}</th>
            <th class="text-right">4</th>
            <th class="text-right">3</th>
            <th class="text-right">2</th>
            <th class="text-right">1</th>
            <th class="text-right">0</th>
          </tr>
          </thead>

          <tbody
              class="[&>tr:nth-child(even)]:bg-surface/30 [&>tr:hover]:bg-primary/5
                   [&>tr]:border-t [&>tr]:border-surface/30"
          >
          <tr v-for="(r, i) in soloRows" :key="'solo-' + i">
            <td class="p-3 text-text-muted whitespace-nowrap">{{ r.bonus }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.ge1 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a4 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a3 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a2 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a1 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a0 }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Таблица GUILD -->
      <h3 class="text-xl font-semibold text-primary mt-8 mb-3">
        {{ t("article.attrs.tables.guild.title") }}
      </h3>

      <div
          class="overflow-x-auto rounded-xl border border-surface/50 shadow-[0_0_12px_rgba(255,255,255,0.04)]
               ring-1 ring-white/5 transition hover:ring-white/10"
      >
        <table class="min-w-full text-sm tabular-nums">
          <thead
              class="bg-surface/70 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-surface/60
                   text-text-muted/90 text-xs uppercase tracking-wide"
          >
          <tr
              class="[&>th]:font-medium [&>th]:p-3 [&>th]:whitespace-nowrap [&>th]:border-b [&>th]:border-surface/50"
          >
            <th class="text-left">{{ t("article.attrs.tables.headers.bonus") }}</th>
            <th class="text-right">{{ t("article.attrs.tables.headers.ge1") }}</th>
            <th class="text-right">4</th>
            <th class="text-right">3</th>
            <th class="text-right">2</th>
            <th class="text-right">1</th>
            <th class="text-right">0</th>
          </tr>
          </thead>

          <tbody
              class="[&>tr:nth-child(even)]:bg-surface/30 [&>tr:hover]:bg-primary/5
                   [&>tr]:border-t [&>tr]:border-surface/30"
          >
          <tr v-for="(r, i) in guildRows" :key="'guild-' + i">
            <td class="p-3 text-text-muted whitespace-nowrap">{{ r.bonus }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.ge1 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a4 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a3 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a2 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a1 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a0 }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 🔹 Таблица REROLL -->
      <h3 class="text-xl font-semibold text-primary mt-8 mb-3">
        {{ t("article.attrs.tables.reroll.title") }}
      </h3>

      <div
          class="overflow-x-auto rounded-xl border border-surface/50 shadow-[0_0_12px_rgba(255,255,255,0.04)]
               ring-1 ring-white/5 transition hover:ring-white/10"
      >
        <table class="min-w-full text-sm tabular-nums">
          <thead
              class="bg-surface/70 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-surface/60
                   text-text-muted/90 text-xs uppercase tracking-wide"
          >
          <tr class="[&>th]:font-medium [&>th]:p-3 [&>th]:whitespace-nowrap [&>th]:border-b [&>th]:border-surface/50">
            <th class="text-left">{{ t("article.attrs.tables.reroll.header") }}</th>
            <th class="text-right">4</th>
            <th class="text-right">3</th>
            <th class="text-right">2</th>
            <th class="text-right">1</th>
            <th class="text-right">0</th>
          </tr>
          </thead>
          <tbody class="[&>tr:nth-child(even)]:bg-surface/30 [&>tr:hover]:bg-primary/5 [&>tr]:border-t [&>tr]:border-surface/30">
          <tr v-for="(r, i) in rerollRows" :key="'reroll-' + i">
            <td class="p-3 text-text-muted whitespace-nowrap">{{ r.title }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a4 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a3 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a2 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a1 }}</td>
            <td class="p-3 text-right font-mono whitespace-nowrap">{{ r.a0 }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Сноска -->
      <p class="mt-4 text-xs text-text-muted">
        {{ t("article.attrs.note") }}
      </p>
    </div>
  </section>
</template>
