<!-- pages/index.vue -->
<template>
  <main class="container py-4">
    <WelcomeSection />

    <PrefaceSection />

    <!-- Секция про Jewel of Bless -->
    <BlessExplanation />

    <!-- Калькулятор -->
    <BlessCalculator />

    <!-- общая информация о дропе предметов -->
    <DropGeneralInfo />

    <!-- модификаторы предметов -->
    <AttrsExplanation />

    <!-- калькулятор шансов -->
    <AttrsCalculator />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "BSA — Шансы дропа",
  meta: [
    {
      name: "description",
      content:
          "Подробное руководство по шансам дропа и механикам кастомки Dota 2: Boss Survival Adventure.",
    },
    {
      property: "og:title",
      content: "BSA — Шансы дропа",
    },
    {
      property: "og:description",
      content:
          "Узнай всё о шансах дропа и гильдейских бонусах в Boss Survival Adventure.",
    },
  ],
})
</script>
