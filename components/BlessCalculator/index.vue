<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const players = ref(1);    // 1..5
const difficulty = ref(1); // 1..20

// Формула дропа в BSA:
// random = RandomInt(0, 20000 - 500*difficulty); drop если random < 5
// => p_team = 5 / ( (20000 - 500*difficulty) + 1 )
const maxRoll = computed(() => 20000 - 500 * difficulty.value);
const pTeam   = computed(() => 5 / (maxRoll.value + 1));
const pYou    = computed(() => pTeam.value / players.value);

// Ожидаемое число убийств (геометрическое распределение)
const expTeam = computed(() => 1 / pTeam.value);
const expYou  = computed(() => 1 / pYou.value);

// Сколько убийств нужно для вероятности P при шансе p за одно убийство
function killsFor(P: number, p: number): number | null {
  if (p <= 0) return null;
  if (p >= 1) return 1;
  const n = Math.log(1 - P) / Math.log(1 - p);
  if (!isFinite(n) || n <= 0) return null;
  return Math.ceil(n);
}

// Команда
const n50Team = computed(() => killsFor(0.5,  pTeam.value));
const n90Team = computed(() => killsFor(0.9,  pTeam.value));
const n99Team = computed(() => killsFor(0.99, pTeam.value));
// Ты лично (зависит от players)
const n50You  = computed(() => killsFor(0.5,  pYou.value));
const n90You  = computed(() => killsFor(0.9,  pYou.value));
const n99You  = computed(() => killsFor(0.99, pYou.value));

function pct(p: number) {
  return (p * 100).toFixed(4) + "%";
}
function fmt(n: number) {
  const loc = locale.value === "ru" ? "ru-RU" : "en-US";
  return n < 1000 ? n.toFixed(2) : Math.round(n).toLocaleString(loc);
}
function fmtKills(n: number | null) {
  const loc = locale.value === "ru" ? "ru-RU" : "en-US";
  return n == null ? "—" : n.toLocaleString(loc);
}
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-6 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold text-primary mb-5">
        {{ t("calc.bless.title") }}
      </h2>

      <!-- controls -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 rounded-xl border border-surface/40 bg-surface">
          <label class="block text-sm text-text-muted mb-2">
            {{ t("calc.bless.players.label") }}
          </label>
          <input type="range" min="1" max="5" v-model.number="players" class="w-full" />
          <div class="mt-2 text-sm">
            <span class="text-text-muted">{{ t("calc.bless.players.value") }}:</span>
            <span class="ml-2 font-medium">{{ players }}</span>
          </div>
          <p class="mt-2 text-xs text-text-muted">
            {{ t("calc.bless.players.hint") }}
          </p>
        </div>

        <div class="p-4 rounded-xl border border-surface/40 bg-surface">
          <label class="block text-sm text-text-muted mb-2">
            {{ t("calc.bless.difficulty.label") }}
          </label>
          <input type="range" min="1" max="20" v-model.number="difficulty" class="w-full" />
          <div class="mt-2 text-sm">
            <span class="text-text-muted">{{ t("calc.bless.difficulty.value") }}:</span>
            <span class="ml-2 font-medium">{{ difficulty }}</span>
          </div>
          <p class="mt-2 text-xs text-text-muted">
            {{ t("calc.bless.difficulty.hint") }}
          </p>
        </div>
      </div>

      <!-- results -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Расчёт количества убийств: команда + ты лично -->
        <div class="p-5 rounded-xl border border-primary/30 bg-surface">
          <h3 class="font-semibold text-primary mb-2">{{ t("calc.bless.killsCalc") }}</h3>

          <div class="grid grid-cols-1 gap-4">
            <!-- Команда -->
            <div>
              <div class="text-xs font-medium text-text-muted mb-2">{{ t("calc.bless.team.title") }}</div>
              <ul class="space-y-2 text-sm text-text-muted">
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n50") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n50Team) }}</span>
                </li>
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n90") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n90Team) }}</span>
                </li>
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n99") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n99Team) }}</span>
                </li>
              </ul>
            </div>

            <!-- Ты лично -->
            <div>
              <div class="text-xs font-medium text-text-muted mb-2">{{ t("calc.bless.you.title") }}</div>
              <ul class="space-y-2 text-sm text-text-muted">
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n50") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n50You) }}</span>
                </li>
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n90") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n90You) }}</span>
                </li>
                <li class="flex items-baseline justify-between">
                  <span>{{ t("calc.bless.n99") }}</span>
                  <span class="font-mono font-medium text-text">{{ fmtKills(n99You) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <p class="mt-3 text-xs text-text-muted">
            {{ t("calc.bless.trialsNote") }}
          </p>
        </div>

        <!-- Для тебя лично (шанс/ожидание) -->
        <div class="p-5 rounded-xl border border-primary/30 bg-surface">
          <h3 class="font-semibold text-primary mb-2">{{ t("calc.bless.you.title") }}</h3>
          <div class="text-sm text-text-muted">
            <div class="flex items-baseline justify-between">
              <span>{{ t("calc.bless.prob") }}</span>
              <span class="font-medium">{{ pct(pYou) }}</span>
            </div>
            <div class="flex items-baseline justify-between mt-1">
              <span>{{ t("calc.bless.expectedKills") }}</span>
              <span class="font-medium">{{ fmt(expYou) }}</span>
            </div>
          </div>
          <p class="mt-3 text-xs text-text-muted">
            {{ t("calc.bless.note") }}
          </p>
        </div>
      </div>

      <!-- warning -->
      <div class="mt-6 rounded-xl border border-amber-300/40 bg-amber-200/10 p-4">
        <p class="text-sm">
          <span class="font-medium text-amber-400">⚠ {{ t("calc.bless.warning.title") }}:</span>
          <span class="text-text-muted"> {{ t("calc.bless.warning.body") }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
