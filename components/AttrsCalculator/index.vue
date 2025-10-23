<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Диапазоны точь-в-точь как в Lua (max — ИСКЛЮЧИТЕЛЬНОЕ)
type Range = { min: number; max: number; reward: 0 | 1 | 2 | 3 | 4 };
const ranges: Range[] = [
  { min: 0,  max: 1,   reward: 4 }, // 0
  { min: 1,  max: 3,   reward: 3 }, // 1,2
  { min: 4,  max: 8,   reward: 2 }, // 4,5,6,7   (3 и 8 не покрыты)
  { min: 9,  max: 20,  reward: 1 }, // 9..19     (20 не покрыт)
  { min: 21, max: 101, reward: 0 }, // 21..100
];

function rewardFor(n: number): 0 | 1 | 2 | 3 | 4 {
  for (const r of ranges) {
    if (n >= r.min && n < r.max) return r.reward;
  }
  return 0 as const; // "дыры" (3, 8, 20)
}

const BONUS_MAX = 50;
const firstRollSize = 101; // 0..100
const rerollSize = 21;     // 0..20

const guildBonus = ref(0);

// Частоты для первого броска и переролла
const firstRollFreq = computed(() => {
  const f = [0, 0, 0, 0, 0];
  for (let n = 0; n <= 100; n++) f[rewardFor(n)]++;
  return f;
});

const rerollFreq = computed(() => {
  const f = [0, 0, 0, 0, 0];
  for (let n = 0; n <= 20; n++) f[rewardFor(n)]++;
  return f;
});

// Итоговые вероятности с учётом бонуса
const probs = computed(() => {
  const p = guildBonus.value / 100;
  const first = firstRollFreq.value;
  const re = rerollFreq.value;

  const zeroFrom21to100 = 80; // 21..100
  const massReroll = (zeroFrom21to100 / firstRollSize) * p;

  const result = [0, 0, 0, 0, 0];

  // вклад первого броска
  for (let k = 0; k <= 4; k++) result[k] += first[k] / firstRollSize;

  // вычли все 21..100 "нули", вернули не переролленные
  result[0] -= (zeroFrom21to100 / firstRollSize);
  result[0] += (zeroFrom21to100 / firstRollSize) * (1 - p);

  // добавили переролл
  for (let k = 0; k <= 4; k++) {
    result[k] += massReroll * (re[k] / rerollSize);
  }

  return result as [number, number, number, number, number];
});

function pct(x: number) { return (x * 100).toFixed(2) + " %"; }
const ge1 = computed(() => probs.value[1] + probs.value[2] + probs.value[3] + probs.value[4]);
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-6 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold text-primary mb-5">
        {{ t("calc.attrs.title") }}
      </h2>

      <!-- Контрол -->
      <div class="p-4 rounded-xl border border-surface/50 bg-surface">
        <label class="block text-sm text-text-muted mb-2">
          {{ t("calc.attrs.control.label") }}
        </label>
        <input type="range" min="0" :max="BONUS_MAX" v-model.number="guildBonus" class="w-full" />
        <div class="mt-2 text-sm">
          <span class="text-text-muted">{{ t("calc.attrs.control.current") }}:</span>
          <span class="ml-2 font-medium">{{ guildBonus }}%</span>
        </div>
      </div>

      <!-- Таблица -->
      <div class="mt-6 space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-primary mb-3">
            {{ t("calc.attrs.probs.title") }}
          </h3>
          <div
              class="overflow-x-auto rounded-xl border border-surface/50 shadow-[0_0_12px_rgba(255,255,255,0.04)]
                   ring-1 ring-white/5 hover:ring-white/10"
          >
            <table class="min-w-full text-sm tabular-nums">
              <thead
                  class="bg-surface/70 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-surface/60
                       text-text-muted/90 text-xs uppercase tracking-wide"
              >
              <tr class="[&>th]:font-medium [&>th]:p-3 [&>th]:whitespace-nowrap [&>th]:border-b [&>th]:border-surface/50">
                <th class="text-left">{{ t("calc.attrs.table.headers.bonus") }}</th>
                <th class="text-right">{{ t("calc.attrs.table.headers.ge1") }}</th>
                <th class="text-right">4</th>
                <th class="text-right">3</th>
                <th class="text-right">2</th>
                <th class="text-right">1</th>
                <th class="text-right">0</th>
              </tr>
              </thead>
              <tbody class="[&>tr:nth-child(even)]:bg-surface/30 [&>tr:hover]:bg-primary/5 [&>tr]:border-t [&>tr]:border-surface/30">
              <tr>
                <td class="p-3 text-text-muted whitespace-nowrap">{{ guildBonus }} %</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(ge1) }}</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(probs[4]) }}</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(probs[3]) }}</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(probs[2]) }}</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(probs[1]) }}</td>
                <td class="p-3 text-right font-mono whitespace-nowrap">{{ pct(probs[0]) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 🔴 Предупреждение -->
        <div class="rounded-xl border border-red-400/60 bg-red-500/10 p-5 mt-2">
          <p class="text-sm leading-relaxed">
            <span class="font-semibold text-red-500">
              ⚠ {{ t("calc.attrs.warning.title") }}:
            </span>
            <span class="text-text font-medium">
              {{ t("calc.attrs.warning.body") }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
