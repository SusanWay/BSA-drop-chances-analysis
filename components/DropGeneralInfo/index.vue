<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

// массивы из локалей
const tierRows   = computed(() => tm("article.drop.tiers.rows") || []);
const steps      = computed(() => tm("article.drop.golden.steps") || []);
const appearList = computed(() => tm("article.drop.appear.items") || []);
const goldenMobs = computed(
    () =>
        (tm("article.drop.goldenMobs.items") as Array<{
          id: string;
          name: string;
          drop: string;
          desc: string;
        }>) || []
);

// строки, которые могут быть пустыми — рендерим только если есть текст
const overviewP1 = computed(() => t("article.drop.overview_p1"));
const note       = computed(() => t("article.drop.note"));

// простые эмодзи для визуального отличия
const mobIcon: Record<string, string> = {
  monkey: "🐒",
  sealion: "🦭",
  queen: "👑",
  wyvern: "🐲",
  dragon: "🐉",
  skeleton: "💀",
};
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-5xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10">
      <!-- Заголовок -->
      <h2 class="text-3xl md:text-4xl font-bold text-primary">
        {{ t("article.drop.title") }}
      </h2>

      <!-- (раньше была «Начнём блок…») -->
      <p v-if="overviewP1" class="mt-3 text-text-muted/90">
        {{ overviewP1 }}
      </p>

      <!-- Тиры -->
      <h3 class="text-xl font-semibold text-primary mt-6">
        {{ t("article.drop.overview_p2") }}
      </h3>
      <div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="(row, i) in tierRows"
            :key="i"
            class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm transition hover:shadow-md hover:border-primary/30"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-primary/80">Tier {{ i + 1 }}</span>
            <span
                class="inline-flex items-center rounded-full border border-primary/30 px-2 py-0.5 text-[11px] font-medium text-primary/80"
            >
              {{ row.name }}
            </span>
          </div>
          <p class="mt-2 text-text-muted">{{ row.range }}</p>
        </div>
      </div>

      <!-- Как появляются золотые боссы -->
      <div class="mt-10 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 p-5">
        <h3 class="text-lg font-semibold text-emerald-400">
          {{ t("article.drop.golden.title") }}
        </h3>
        <p class="mt-2 text-sm text-text-muted">
          {{ t("article.drop.golden.body") }}
        </p>
        <ul class="mt-3 flex flex-col gap-2 text-sm">
          <li v-for="(s, idx) in steps" :key="idx" class="flex items-center gap-2">
            <span
                class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 text-xs"
            >
              {{ idx + 1 }}
            </span>
            <span class="text-text-muted">{{ s }}</span>
          </li>
        </ul>
      </div>

      <!-- После каких боссов появляются золотые -->
      <div class="mt-10">
        <h3 class="text-xl font-semibold text-primary">
          {{ t("article.drop.appear.title") }}
        </h3>
        <ul class="mt-3 flex flex-wrap gap-2">
          <li
              v-for="(name, i) in appearList"
              :key="i"
              class="rounded-full border border-surface/40 bg-surface px-3 py-1 text-sm text-text-muted"
          >
            {{ name }}
          </li>
        </ul>
      </div>

      <!-- Золотые боссы и их дроп -->
      <div class="mt-10">
        <h3 class="text-xl font-semibold text-primary">
          {{ t("article.drop.goldenMobs.title") }}
        </h3>

        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <article
              v-for="mob in goldenMobs"
              :key="mob.id"
              class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm transition hover:shadow-md hover:border-primary/30"
          >
            <div class="flex items-start gap-3">
              <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl"
              >
                {{ mobIcon[mob.id] ?? "⭐" }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h4 class="text-base font-semibold text-text">
                    {{ mob.name }}
                  </h4>
                  <span
                      class="inline-flex items-center rounded-full border border-primary/30 bg-surface-light px-2 py-0.5 text-[11px] font-medium text-primary/80"
                  >
                    {{ t("article.drop.goldenMobs.drop") }}: {{ mob.drop }}
                  </span>
                </div>
                <p class="mt-1 text-sm text-text-muted leading-relaxed">
                  {{ mob.desc }}
                </p>
              </div>
            </div>
          </article>
        </div>

        <!-- нижняя приписка удалена; выводим только если есть текст -->
        <p v-if="note" class="mt-4 text-xs text-text-muted">
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
