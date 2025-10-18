<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="flex flex-col items-center justify-center py-12 text-center">
    <img
        src="/Lancer.webp"
        alt="Lancer"
        class="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]
             rounded-3xl object-cover border-2 border-primary mb-4 shadow-md"
    />
    <p class="text-lg text-text-muted">
      {{ t("common.madeByPrefix") }}
      <span class="text-primary font-semibold">Lancer</span>
    </p>
  </section>
</template>
