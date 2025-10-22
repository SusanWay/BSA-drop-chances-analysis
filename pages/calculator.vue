<script setup lang="ts">
useHead({
  title: "BSA — калькулятор модов",
  meta: [
    {
      name: "description",
      content:
          "Калькулятор модов в кастомке Dota 2: Boss Survival Adventure.",
    },
    {
      property: "og:title",
      content: "BSA — калькулятор модов",
    },
    {
      property: "og:description",
      content:
          "Калькулятор модов в кастомке Dota 2: Boss Survival Adventure.",
    },
  ],
})
</script>

<template>
  <section class="py-10">
    <Calculator />
  </section>
</template>
