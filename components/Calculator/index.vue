<script setup lang="ts">
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const MAX_TARGETS = 4;

// ===== МЕТАДАННЫЕ МОДОВ =====
type ModKey =
    | "desolator" | "magic_desolator" | "reflect" | "lifesteal" | "magic_lifesteal"
    | "mjolnir" | "mjolnir_armor" | "mkb" | "hp_regen" | "hp_regen_amp"
    | "damage_block" | "manacost" | "crit" | "multicast";

const MOD_META: Record<ModKey, { nameKey: string; descKey: string }> = {
  desolator:       { nameKey: "mods.desolator.name",       descKey: "mods.desolator.desc" },
  magic_desolator: { nameKey: "mods.magic_desolator.name", descKey: "mods.magic_desolator.desc" },
  reflect:         { nameKey: "mods.reflect.name",         descKey: "mods.reflect.desc" },
  lifesteal:       { nameKey: "mods.lifesteal.name",       descKey: "mods.lifesteal.desc" },
  magic_lifesteal: { nameKey: "mods.magic_lifesteal.name", descKey: "mods.magic_lifesteal.desc" },
  mjolnir:         { nameKey: "mods.mjolnir.name",         descKey: "mods.mjolnir.desc" },
  mjolnir_armor:   { nameKey: "mods.mjolnir_armor.name",   descKey: "mods.mjolnir_armor.desc" },
  mkb:             { nameKey: "mods.mkb.name",             descKey: "mods.mkb.desc" },
  hp_regen:        { nameKey: "mods.hp_regen.name",        descKey: "mods.hp_regen.desc" },
  hp_regen_amp:    { nameKey: "mods.hp_regen_amp.name",    descKey: "mods.hp_regen_amp.desc" },
  damage_block:    { nameKey: "mods.damage_block.name",    descKey: "mods.damage_block.desc" },
  manacost:        { nameKey: "mods.manacost.name",        descKey: "mods.manacost.desc" },
  crit:            { nameKey: "mods.crit.name",            descKey: "mods.crit.desc" },
  multicast:       { nameKey: "mods.multicast.name",       descKey: "mods.multicast.desc" },
};

const allMods = Object.keys(MOD_META) as ModKey[];

function modName(key: ModKey) {
  return t(MOD_META[key]?.nameKey ?? "");
}
function modDesc(key: ModKey) {
  return t(MOD_META[key]?.descKey ?? "");
}

const state = reactive({
  pool: [...allMods] as ModKey[],
  picked: new Set<ModKey>(),
  weights: { k0: 0.8218, k1: 0.1089, k2: 0.0396, k3: 0.0198, k4: 0.0099 },
});

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - r + i)) / i;
  return res;
}

const weightsNorm = computed(() => {
  const w = [state.weights.k0, state.weights.k1, state.weights.k2, state.weights.k3, state.weights.k4];
  const sum = w.reduce((a, b) => a + b, 0) || 1;
  return w.map(x => x / sum);
});

const M = computed(() => state.pool.length);
const tCount = computed(() => state.picked.size);
const reachedLimit = computed(() => tCount.value >= MAX_TARGETS);

// --- Вероятности ---
const pAllPicked = computed(() => {
  const w = weightsNorm.value;
  let s = 0;
  for (let k = 0; k <= 4; k++) {
    if (k >= tCount.value && M.value >= k) {
      const den = nCr(M.value, k);
      const num = nCr(M.value - tCount.value, k - tCount.value);
      s += w[k] * (den > 0 ? num / den : 0);
    }
  }
  return s;
});

const pExactPicked = computed(() => {
  const w = weightsNorm.value;
  const tSel = tCount.value;
  if (tSel >= 0 && tSel <= 4 && M.value >= tSel) {
    const den = nCr(M.value, tSel);
    return w[tSel] * (den > 0 ? 1 / den : 0);
  }
  return 0;
});

const pAtLeastOne = computed(() => {
  const w = weightsNorm.value;
  let s = 0;
  for (let k = 0; k <= 4; k++) {
    if (k <= M.value) {
      const den = nCr(M.value, k);
      const none = nCr(M.value - tCount.value, k);
      s += w[k] * (den > 0 ? 1 - none / den : 0);
    }
  }
  return s;
});

// --- Формула количества убийств для заданной вероятности ---
function killsFor(P: number, p: number): number | null {
  if (p <= 0) return null;
  if (p >= 1) return 1;
  const n = Math.log(1 - P) / Math.log(1 - p);
  if (!isFinite(n) || n <= 0) return null;
  return Math.ceil(n);
}

const n50  = computed(() => killsFor(0.5,  pAllPicked.value));
const n90  = computed(() => killsFor(0.9,  pAllPicked.value));
const n99  = computed(() => killsFor(0.99, pAllPicked.value));

function togglePicked(mod: ModKey) {
  if (state.picked.has(mod)) {
    state.picked.delete(mod);
    return;
  }
  if (state.picked.size >= MAX_TARGETS) return;
  state.picked.add(mod);
}

function togglePool(mod: ModKey) {
  const idx = state.pool.indexOf(mod);
  if (idx >= 0) {
    state.pool.splice(idx, 1);
    state.picked.delete(mod);
  } else {
    state.pool.push(mod);
  }
}

function fmtPct(p: number) {
  return (p * 100).toFixed(4) + "%";
}
function fmtNum(n: number | null) {
  return n == null ? "—" : n.toLocaleString("ru-RU");
}
</script>

<template>
  <section class="mt-10">
    <div class="mx-auto max-w-5xl rounded-2xl border border-surface/40 bg-surface-light p-8 md:p-10">
      <h2 class="text-3xl md:text-4xl font-bold text-primary">{{ t("calculator.title") }}</h2>
      <p class="mt-3 text-text-muted/90">{{ t("calculator.subtitle") }}</p>

      <!-- Верхний блок -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <!-- Вероятности числа модов -->
        <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
          <h3 class="text-lg font-semibold text-primary">{{ t("calculator.weights.title") }}</h3>
          <div class="mt-3 space-y-3">
            <div v-for="k in 5" :key="k" class="flex items-center gap-3">
              <label class="w-20 text-text-muted">k = {{ k - 1 }}</label>
              <input
                  v-model.number="state.weights['k' + (k - 1)]"
                  type="number"
                  step="0.0001"
                  min="0"
                  class="w-32 rounded-md border border-surface/50 bg-surface-light px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <p class="text-xs text-text-muted/80">{{ t("calculator.weights.hint") }}</p>
          </div>
        </div>

        <!-- Пул модов -->
        <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-primary">{{ t("calculator.pool.title") }}</h3>
            <span class="inline-flex items-center rounded-full border border-primary/30 bg-surface-light px-2 py-0.5 text-[11px] font-medium text-primary/80">
              M = {{ M }}
            </span>
          </div>

          <div class="mt-3 flex flex-wrap gap-2">
            <button
                v-for="m in allMods"
                :key="m"
                @click="togglePool(m)"
                class="rounded-full border border-surface/50 bg-surface-light px-3 py-1 text-xs text-text transition hover:border-primary/30"
                :class="state.pool.includes(m) ? 'opacity-100' : 'opacity-60 line-through'"
                :title="modDesc(m)"
            >
              {{ modName(m) }}
            </button>
          </div>
          <p class="mt-2 text-xs text-text-muted">{{ t("calculator.pool.hint") }}</p>
        </div>
      </div>

      <!-- Целевые моды -->
      <div class="mt-6 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-amber-400">{{ t("calculator.targets.title") }}</h3>
          <span class="inline-flex items-center rounded-full border border-amber-300/60 bg-surface-light px-2 py-0.5 text-[11px] font-medium text-amber-400">
            t = {{ tCount }} / {{ MAX_TARGETS }}
          </span>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <button
              v-for="m in state.pool"
              :key="m"
              @click="togglePicked(m)"
              :disabled="!state.picked.has(m) && reachedLimit"
              class="rounded-2xl border px-3 py-1.5 text-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
              :class="state.picked.has(m)
              ? 'border-amber-300 bg-amber-100/40 text-text'
              : 'border-surface/40 bg-surface hover:bg-surface-light'"
              :title="modDesc(m)"
          >
            <span class="mr-2 inline-block h-2 w-2 rounded-full" :class="state.picked.has(m) ? 'bg-amber-400' : 'bg-surface/60'"></span>
            {{ modName(m) }}
          </button>
        </div>
        <p class="mt-2 text-xs text-text-muted">
          {{ reachedLimit ? t("calculator.targets.limit") : t("calculator.targets.hint") }}
        </p>
      </div>

      <!-- Результаты -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <!-- Вероятности -->
        <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
          <h3 class="text-lg font-semibold text-primary">{{ t("calculator.results.prob") }}</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.all") }}</span>
              <strong class="font-mono text-text">{{ fmtPct(pAllPicked) }}</strong>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.exact") }}</span>
              <strong class="font-mono text-text">{{ fmtPct(pExactPicked) }}</strong>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.atleast1") }}</span>
              <strong class="font-mono text-text">{{ fmtPct(pAtLeastOne) }}</strong>
            </li>
          </ul>
        </div>

        <!-- Расчёт количества убийств -->
        <div class="rounded-2xl border border-surface/40 bg-surface p-5 shadow-sm">
          <h3 class="text-lg font-semibold text-primary">{{ t("calculator.results.killsCalc") }}</h3>

          <ul class="mt-3 space-y-2 text-sm">
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.n50") }}</span>
              <strong class="font-mono text-text">{{ fmtNum(n50) }}</strong>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.n90") }}</span>
              <strong class="font-mono text-text">{{ fmtNum(n90) }}</strong>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-text-muted">{{ t("calculator.results.n99") }}</span>
              <strong class="font-mono text-text">{{ fmtNum(n99) }}</strong>
            </li>
          </ul>

          <p class="mt-2 text-xs text-text-muted leading-relaxed">
            {{ t("calculator.results.trialsNote") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
