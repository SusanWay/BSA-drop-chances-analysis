<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useCalculatorStore } from "@/stores/CalculatorStore";

const { t } = useI18n();
const store = useCalculatorStore();

const fields = computed(() => [0, 1, 2, 3, 4] as const);
const onInput = (k: number, e: Event) => {
  const v = Number((e.target as HTMLInputElement).value);
  store.setWeight(("k" + k) as keyof typeof store.weights, v);
};
</script>

<template>
  <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
    <h3 class="text-lg font-semibold text-primary">{{ t("calculator.weights.title") }}</h3>
    <div class="mt-3 space-y-3">
      <div v-for="k in fields" :key="k" class="flex items-center gap-3">
        <label class="w-20 text-text-muted">k = {{ k }}</label>
        <input
            :value="store.weights['k' + k]"
            @input="onInput(k, $event)"
            type="number"
            step="0.0001"
            min="0"
            class="w-32 rounded-md border border-surface/50 bg-surface-light px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <p class="text-xs text-text-muted/80">{{ t("calculator.weights.hint") }}</p>
    </div>
  </div>
</template>
