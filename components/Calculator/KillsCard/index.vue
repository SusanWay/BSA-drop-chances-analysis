<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCalculatorStore } from "@/stores/CalculatorStore";

const { t } = useI18n();
const store = useCalculatorStore();
</script>

<template>
  <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
    <h3 class="text-lg font-semibold text-primary">{{ t("calculator.results.killsCalc") }}</h3>
    <ul class="mt-3 space-y-2 text-sm">
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.n50") }}</span>
        <strong class="font-mono text-text">{{ store.fmtNum(store.n50) }}</strong>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.n90") }}</span>
        <strong class="font-mono text-text">{{ store.fmtNum(store.n90) }}</strong>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.n99") }}</span>
        <strong class="font-mono text-text">{{ store.fmtNum(store.n99) }}</strong>
      </li>
    </ul>
    <p class="mt-2 text-xs text-text-muted leading-relaxed">
      {{ t("calculator.results.trialsNote") }}
    </p>
  </div>
</template>
