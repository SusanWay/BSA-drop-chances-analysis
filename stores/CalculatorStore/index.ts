// src/stores/CalculatorStore.ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

// ===== Константы =====
export const MAX_TARGETS = 4 as const;

// ===== Типы =====
export type ModKey =
    | "desolator" | "magic_desolator" | "reflect" | "lifesteal" | "magic_lifesteal"
    | "mjolnir" | "mjolnir_armor" | "mkb" | "hp_regen" | "hp_regen_amp"
    | "damage_block" | "manacost" | "crit" | "multicast";

export interface ModMeta {
    nameKey: string;
    descKey: string;
}

export interface Weights {
    k0: number;
    k1: number;
    k2: number;
    k3: number;
    k4: number;
}

// ===== Метаданные модов =====
export const MOD_META: Record<ModKey, ModMeta> = {
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

export const ALL_MODS = Object.keys(MOD_META) as ModKey[];

// ===== Вспомогательные функции (строго типизированные) =====
function nCr(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let res = 1;
    for (let i = 1; i <= r; i++) res = (res * (n - r + i)) / i;
    return res;
}

function normalizeWeights(w: readonly number[]): number[] {
    const sum = w.reduce((a, b) => a + b, 0) || 1;
    return w.map((x) => x / sum);
}

function killsFor(P: number, p: number): number | null {
    if (p <= 0) return null;
    if (p >= 1) return 1;
    const n = Math.log(1 - P) / Math.log(1 - p);
    if (!isFinite(n) || n <= 0) return null;
    return Math.ceil(n);
}

// ===== STORE (setup-синтаксис) =====
export const useCalculatorStore = defineStore("calculator", () => {
    // --- state
    const pool = ref<ModKey[]>([...ALL_MODS]);
    const picked = ref<ModKey[]>([]);
    const weights = ref<Weights>({
        k0: 0.8218,
        k1: 0.1089,
        k2: 0.0396,
        k3: 0.0198,
        k4: 0.0099,
    });

    // --- getters (computed)
    const M = computed<number>(() => pool.value.length);
    const tCount = computed<number>(() => picked.value.length);
    const reachedLimit = computed<boolean>(() => tCount.value >= MAX_TARGETS);

    const weightsNorm = computed<number[]>(() =>
        normalizeWeights([weights.value.k0, weights.value.k1, weights.value.k2, weights.value.k3, weights.value.k4])
    );

    // Вероятности
    const pAllPicked = computed<number>(() => {
        const w = weightsNorm.value;
        const Mv = M.value;
        const t = tCount.value;
        let s = 0;
        for (let k = 0; k <= 4; k++) {
            if (k >= t && Mv >= k) {
                const den = nCr(Mv, k);
                const num = nCr(Mv - t, k - t);
                s += w[k] * (den > 0 ? num / den : 0);
            }
        }
        return s;
    });

    const pExactPicked = computed<number>(() => {
        const w = weightsNorm.value;
        const t = tCount.value;
        const Mv = M.value;
        if (t >= 0 && t <= 4 && Mv >= t) {
            const den = nCr(Mv, t);
            return w[t] * (den > 0 ? 1 / den : 0);
        }
        return 0;
    });

    const pAtLeastOne = computed<number>(() => {
        const w = weightsNorm.value;
        const Mv = M.value;
        const t = tCount.value;
        let s = 0;
        for (let k = 0; k <= 4; k++) {
            if (k <= Mv) {
                const den = nCr(Mv, k);
                const none = nCr(Mv - t, k);
                s += w[k] * (den > 0 ? 1 - none / den : 0);
            }
        }
        return s;
    });

    // Кол-во убийств для заданной вероятности
    const n50 = computed<number | null>(() => killsFor(0.5, pAllPicked.value));
    const n90 = computed<number | null>(() => killsFor(0.9, pAllPicked.value));
    const n99 = computed<number | null>(() => killsFor(0.99, pAllPicked.value));

    // Форматтеры как чистые функции (стабильные по типам)
    const fmtPct = (p: number): string => (p * 100).toFixed(4) + "%";
    const fmtNum = (n: number | null): string => (n == null ? "—" : n.toLocaleString("ru-RU"));

    // Быстрые проверки
    const hasPicked = (m: ModKey): boolean => picked.value.includes(m);
    const inPool = (m: ModKey): boolean => pool.value.includes(m);

    // --- actions
    const togglePicked = (mod: ModKey): void => {
        const idx = picked.value.indexOf(mod);
        if (idx !== -1) {
            picked.value.splice(idx, 1);
            return;
        }
        if (picked.value.length >= MAX_TARGETS) return;
        if (!pool.value.includes(mod)) return;
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

    const setWeight = <K extends keyof Weights>(key: K, value: number): void => {
        weights.value[key] = value < 0 ? 0 : value;
    };

    const resetAll = (): void => {
        pool.value = [...ALL_MODS];
        picked.value = [];
        weights.value = { k0: 0.8218, k1: 0.1089, k2: 0.0396, k3: 0.0198, k4: 0.0099 };
    };

    // вернуть всё наружу (полностью типизировано)
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
    };
});
