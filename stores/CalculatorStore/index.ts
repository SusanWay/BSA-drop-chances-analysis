// src/stores/CalculatorStore.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

// ===== Константы =====
export const MAX_TARGETS = 4 as const;
const MAX_K = 4 as const; // k = 0..4

// ===== Метаданные модов (сначала объект, потом тип ключа) =====
export const MOD_META = {
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
} as const;

export type ModKey = keyof typeof MOD_META;
export type ModMeta = (typeof MOD_META)[ModKey];

export const ALL_MODS = Object.keys(MOD_META) as ModKey[];

// ===== Веса как кортеж фиксированной длины =====
export type Weights5 = readonly [number, number, number, number, number];

// значения по умолчанию (используются в сторах и UI)
export const DEFAULT_WEIGHTS: Weights5 = [0.8218, 0.1089, 0.0396, 0.0198, 0.0099] as const;
export const DEFAULT_POOL: ModKey[] = [...ALL_MODS];

// --- адаптер: приводим что угодно к кортежу из 5 чисел
function ensureWeightsTuple(w: unknown): Weights5 {
    // массив или кортеж
    if (Array.isArray(w)) {
        const a = w.map((x) => (typeof x === "number" && isFinite(x) ? x : 0));
        const out: [number, number, number, number, number] = [
            a[0] ?? 0, a[1] ?? 0, a[2] ?? 0, a[3] ?? 0, a[4] ?? 0,
        ];
        return out;
    }
    // старый объектный формат {k0..k4}
    if (w && typeof w === "object") {
        const o = w as Record<string, unknown>;
        const toNum = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : 0);
        const out: [number, number, number, number, number] = [
            toNum(o.k0), toNum(o.k1), toNum(o.k2), toNum(o.k3), toNum(o.k4),
        ];
        return out;
    }
    return [...DEFAULT_WEIGHTS] as Weights5;
}

// ===== Вспомогательные функции =====
function nCr(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    // симметрия для меньшего числа итераций
    r = Math.min(r, n - r);
    let res = 1;
    for (let i = 1; i <= r; i++) res = (res * (n - r + i)) / i;
    return res;
}

function normalizeWeights(w: Weights5): Weights5 {
    const arr = ensureWeightsTuple(w);
    const sum = arr[0] + arr[1] + arr[2] + arr[3] + arr[4] || 1;
    return [arr[0] / sum, arr[1] / sum, arr[2] / sum, arr[3] / sum, arr[4] / sum];
}

function killsFor(P: number, p: number): number | null {
    if (p <= 0) return null;
    if (p >= 1) return 1;
    const ln1mP = Math.log1p(-P);
    const ln1mp = Math.log1p(-p);
    const n = ln1mP / ln1mp;
    if (!isFinite(n) || n <= 0) return null;
    return Math.ceil(n);
}

// Форматтеры
const nfPct = new Intl.NumberFormat("ru-RU", { style: "percent", maximumFractionDigits: 4 });
const nfInt = new Intl.NumberFormat("ru-RU");

// безопасный апдейтер кортежа весов
function updateWeightsTuple(w: Weights5, i: 0 | 1 | 2 | 3 | 4, v: number): Weights5 {
    const base = ensureWeightsTuple(w);
    const nv = Math.max(0, Number(v));
    return [
        i === 0 ? nv : base[0],
        i === 1 ? nv : base[1],
        i === 2 ? nv : base[2],
        i === 3 ? nv : base[3],
        i === 4 ? nv : base[4],
    ];
}

// ===== STORE =====
export const useCalculatorStore = defineStore("calculator", () => {
    // --- state
    const pool = ref<ModKey[]>([...DEFAULT_POOL]);
    const picked = ref<ModKey[]>([]);
    const weights = ref<Weights5>(DEFAULT_WEIGHTS);

    // --- derived helpers
    const poolSet = computed(() => new Set(pool.value));
    const pickedSet = computed(() => new Set(picked.value));

    // --- getters (computed)
    const M = computed<number>(() => pool.value.length);
    const tCount = computed<number>(() => picked.value.length);
    const reachedLimit = computed<boolean>(() => tCount.value >= MAX_TARGETS);

    const weightsNorm = computed<Weights5>(() => normalizeWeights(weights.value));

    // --- вероятности
    const pAllPicked = computed<number>(() => {
        const w = weightsNorm.value;
        const Mv = M.value;
        const t = tCount.value;

        if (t === 0) return 1;
        if (t > Mv || t > MAX_K) return 0;

        let s = 0;
        for (let k = 0; k <= MAX_K; k++) {
            if (k >= t && Mv >= k) {
                const den = nCr(Mv, k);
                const num = nCr(Mv - t, k - t);
                s += w[k as 0 | 1 | 2 | 3 | 4] * (den > 0 ? num / den : 0);
            }
        }
        return s;
    });

    const pExactPicked = computed<number>(() => {
        const w = weightsNorm.value;
        const t = tCount.value;
        const Mv = M.value;
        if (t < 0 || t > MAX_K || Mv < t) return 0;
        const den = nCr(Mv, t);
        return w[t as 0 | 1 | 2 | 3 | 4] * (den > 0 ? 1 / den : 0);
    });

    const pAtLeastOne = computed<number>(() => {
        const w = weightsNorm.value;
        const Mv = M.value;
        const t = tCount.value;
        if (t === 0 || t > Mv) return 0;

        let s = 0;
        for (let k = 0; k <= MAX_K; k++) {
            if (k <= Mv) {
                const den = nCr(Mv, k);
                const none = nCr(Mv - t, k);
                s += w[k as 0 | 1 | 2 | 3 | 4] * (den > 0 ? 1 - none / den : 0);
            }
        }
        return s;
    });

    // --- убийства для вероятности
    const n50 = computed<number | null>(() => killsFor(0.5, pAllPicked.value));
    const n90 = computed<number | null>(() => killsFor(0.9, pAllPicked.value));
    const n99 = computed<number | null>(() => killsFor(0.99, pAllPicked.value));

    // --- форматтеры
    const fmtPct = (p: number): string => nfPct.format(p);
    const fmtNum = (n: number | null): string => (n == null ? "—" : nfInt.format(n));

    // --- проверки
    const hasPicked = (m: ModKey): boolean => pickedSet.value.has(m);
    const inPool = (m: ModKey): boolean => poolSet.value.has(m);

    // --- actions
    const togglePicked = (mod: ModKey): void => {
        const idx = picked.value.indexOf(mod);
        if (idx !== -1) {
            picked.value.splice(idx, 1);
            return;
        }
        if (picked.value.length >= MAX_TARGETS) return;
        if (!poolSet.value.has(mod)) return;
        picked.value.push(mod);
    };

    const togglePool = (mod: ModKey): void => {
        const idx = pool.value.indexOf(mod);
        if (idx >= 0) {
            pool.value.splice(idx, 1);
            const pIdx = picked.value.indexOf(mod);
            if (pIdx !== -1) picked.value.splice(pIdx, 1);
        } else {
            pool.value.push(mod);
        }
    };

    const setWeight = (index: 0 | 1 | 2 | 3 | 4, value: number): void => {
        weights.value = updateWeightsTuple(weights.value, index, value);
    };

    const resetAll = (): void => {
        pool.value = [...DEFAULT_POOL];
        picked.value = [];
        weights.value = DEFAULT_WEIGHTS;
    };

    // вернуть всё наружу
    return {
        // state
        pool,
        picked,
        weights,
        // getters
        M,
        tCount,
        reachedLimit,
        weightsNorm,
        pAllPicked,
        pExactPicked,
        pAtLeastOne,
        n50,
        n90,
        n99,
        // helpers
        fmtPct,
        fmtNum,
        hasPicked,
        inPool,
        // actions
        togglePicked,
        togglePool,
        setWeight,
        resetAll,
        // экспорт значений по умолчанию (для UI)
        DEFAULT_WEIGHTS,
    };
});
