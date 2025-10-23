import common from "./common";
import preface from "./article/preface";
import blessArticle from "./article/bless";
import dropArticle from "./article/drop";
import attrsArticle from "./article/attrs";
import blessCalc from "./calc/bless";
import attrsCalc from "./calc/attrs";
// если у вас есть calculator.{ru,en} — подключите и его:
import calculator from "./calculator"; // как и раньше

// простейший deep-merge без зависимостей
function deepMerge<T extends Record<string, any>>(...sources: T[]): T {
    const result: any = {};
    for (const src of sources) {
        for (const k in src) {
            const v = (src as any)[k];
            if (v && typeof v === "object" && !Array.isArray(v)) {
                result[k] = deepMerge(result[k] ?? {}, v);
            } else {
                result[k] = v;
            }
        }
    }
    return result;
}

// по языкам
const ru = deepMerge(
    common.ru,
    preface.ru,
    blessArticle.ru,
    dropArticle.ru,
    attrsArticle.ru,
    blessCalc.ru,
    attrsCalc.ru,
    calculator.ru,
);

const en = deepMerge(
    common.en,
    preface.en,
    blessArticle.en,
    dropArticle.en,
    attrsArticle.en,
    blessCalc.en,
    attrsCalc.en,
    calculator.en,
);

export const messages = { ru, en } as const;
