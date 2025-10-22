<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCalculatorStore, ALL_MODS, MOD_META } from "@/stores/CalculatorStore";

const { t } = useI18n();
const store = useCalculatorStore();
</script>

<template>
  <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-primary">{{ t("calculator.pool.title") }}</h3>
      <span
          class="inline-flex items-center rounded-full border border-primary/30 bg-surface-light px-2 py-0.5 text-[11px] font-medium text-primary/80"
      >
        M = {{ store.M }}
      </span>
    </div>

    <div class="mt-3 flex flex-wrap gap-2">
      <button
          v-for="m in ALL_MODS"
          :key="m"
          @click="store.togglePool(m)"
          class="rounded-full border border-surface/50 bg-surface-light px-3 py-1 text-xs text-text transition hover:border-primary/30"
          :class="store.inPool(m) ? 'opacity-100' : 'opacity-60 line-through'"
          :title="t(MOD_META[m].descKey)"
      >
        {{ t(MOD_META[m].nameKey) }}
      </button>
    </div>
    <p class="mt-2 text-xs text-text-muted">{{ t("calculator.pool.hint") }}</p>
  </div>
</template>
