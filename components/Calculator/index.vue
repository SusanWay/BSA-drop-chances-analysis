<script setup lang="ts">
import { useI18n } from "vue-i18n";
import WeightsForm from "./WeightsForm/index.vue";
import PoolSelector from "./PoolSelector/index.vue";
import TargetsPicker from "./TargetsPicker/index.vue";
import ProbabilitiesCard from "./ProbabilitiesCard/index.vue";
import KillsCard from "./KillsCard/index.vue";

const { t } = useI18n();
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-5xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10">
      <h2 class="text-3xl md:text-4xl font-bold text-primary">{{ t("calculator.title") }}</h2>
      <p class="mt-3 text-text-muted/90">{{ t("calculator.subtitle") }}</p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <WeightsForm />
        <PoolSelector />
      </div>

      <TargetsPicker />

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <ProbabilitiesCard />
        <KillsCard />
      </div>
    </div>
  </section>
</template>
