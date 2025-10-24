<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const players = ref(1);
const difficulty = ref(1);

// Формула Boss Survival Adventure
const maxRoll = computed(() => 20000 - 500 * difficulty.value);
const pTeam = computed(() => 5 / (maxRoll.value + 1));
const pYou = computed(() => pTeam.value / players.value);

function killsFor(P: number, p: number): number | null {
  if (p <= 0) return null;
  if (p >= 1) return 1;
  const n = Math.log(1 - P) / Math.log(1 - p);
  if (!isFinite(n) || n <= 0) return null;
  return Math.ceil(n);
}

const n50Team = computed(() => killsFor(0.5, pTeam.value));
const n90Team = computed(() => killsFor(0.9, pTeam.value));
const n99Team = computed(() => killsFor(0.99, pTeam.value));

const n50You = computed(() => killsFor(0.5, pYou.value));
const n90You = computed(() => killsFor(0.9, pYou.value));
const n99You = computed(() => killsFor(0.99, pYou.value));

function fmtKills(n: number | null) {
  const loc = locale.value === "ru" ? "ru-RU" : "en-US";
  return n == null ? "—" : n.toLocaleString(loc);
}
function fmtPct(p: number) {
  return (p * 100).toFixed(4) + "%";
}
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-4xl rounded-2xl border border-surface/40 bg-surface-light p-6 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold text-primary mb-5">
        {{ t("calc.bless.title") }}
      </h2>

      <!-- Controls -->
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

      <!-- Results -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Для команды -->
        <div class="p-5 rounded-xl border border-primary/30 bg-surface">
          <h3 class="font-semibold text-primary mb-2">{{ t("calc.bless.team.title") }}</h3>

          <div class="flex items-baseline justify-between mb-2 text-sm text-text-muted">
            <span>{{ t("calc.bless.probLabel") }}</span>
            <span class="font-mono font-medium text-text">{{ fmtPct(pTeam) }}</span>
          </div>

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

          <p class="mt-3 text-xs text-text-muted">
            {{ t("calc.bless.trialsNote") }}
          </p>
        </div>

        <!-- Для тебя лично -->
        <div class="p-5 rounded-xl border border-primary/30 bg-surface">
          <h3 class="font-semibold text-primary mb-2">{{ t("calc.bless.you.title") }}</h3>

          <div class="flex items-baseline justify-between mb-2 text-sm text-text-muted">
            <span>{{ t("calc.bless.probLabel") }}</span>
            <span class="font-mono font-medium text-text">{{ fmtPct(pYou) }}</span>
          </div>

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

          <p class="mt-3 text-xs text-text-muted">
            {{ t("calc.bless.note") }}
          </p>
        </div>
      </div>

      <!-- warning -->
      <div class="mt-6 rounded-xl border border-red-400/60 bg-red-500/10 p-5">
        <p class="text-sm leading-relaxed">
          <span class="font-semibold text-red-500">
            ⚠ {{ t("calc.bless.warning.title") }}
          </span>
          <br />
          <span class="text-text font-medium">
            {{ t("calc.bless.warning.line1") }}
          </span>
          <br />
          <span class="text-text font-medium">
            {{ t("calc.bless.warning.line2Prefix") }}
            <span class="font-semibold text-primary">vishnya_net_chereshnya</span>.
          </span>
        </p>
      </div>
    </div>
  </section>
</template>
