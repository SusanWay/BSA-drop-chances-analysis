<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCalculatorStore } from "@/stores/CalculatorStore";

const { t } = useI18n();
const store = useCalculatorStore();
</script>

<template>
  <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
    <h3 class="text-lg font-semibold text-primary">{{ t("calculator.results.prob") }}</h3>
    <ul class="mt-3 space-y-2 text-sm">
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.all") }}</span>
        <strong class="font-mono text-text">{{ store.fmtPct(store.pAllPicked) }}</strong>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.exact") }}</span>
        <strong class="font-mono text-text">{{ store.fmtPct(store.pExactPicked) }}</strong>
      </li>
      <li class="flex items-center justify-between">
        <span class="text-text-muted">{{ t("calculator.results.atleast1") }}</span>
        <strong class="font-mono text-text">{{ store.fmtPct(store.pAtLeastOne) }}</strong>
      </li>
    </ul>
  </div>
</template>
