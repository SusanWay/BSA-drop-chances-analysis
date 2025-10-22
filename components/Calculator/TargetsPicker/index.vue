<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCalculatorStore, MOD_META, MAX_TARGETS } from "@/stores/CalculatorStore";

const { t } = useI18n();
const store = useCalculatorStore();
</script>

<template>
  <div class="mt-6 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-5">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-amber-400">{{ t("calculator.targets.title") }}</h3>
      <span
          class="inline-flex items-center rounded-full border border-amber-300/60 bg-surface-light px-2 py-0.5 text[11px] font-medium text-amber-400"
      >
        t = {{ store.tCount }} / {{ MAX_TARGETS }}
      </span>
    </div>

    <div class="mt-3 flex flex-wrap gap-2">
      <button
          v-for="m in store.pool"
          :key="m"
          @click="store.togglePicked(m)"
          :disabled="!store.hasPicked(m) && store.reachedLimit"
          class="rounded-2xl border px-3 py-1.5 text-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
          :class="store.hasPicked(m)
          ? 'border-amber-300 bg-amber-100/40 text-text'
          : 'border-surface/40 bg-surface hover:bg-surface-light'"
          :title="$t(MOD_META[m].descKey)"
      >
        <span
            class="mr-2 inline-block h-2 w-2 rounded-full"
            :class="store.hasPicked(m) ? 'bg-amber-400' : 'bg-surface/60'"
        ></span>
        {{ $t(MOD_META[m].nameKey) }}
      </button>
    </div>

    <p class="mt-2 text-xs text-text-muted">
      {{ store.reachedLimit ? t("calculator.targets.limit") : t("calculator.targets.hint") }}
    </p>
  </div>
</template>
