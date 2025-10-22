export default {
    ru: {
        calculator: {
            title: "Калькулятор модов",
            subtitle:
                "Равновесный ролл: число модов 0–4 и сами моды выбираются без повторов из пула. Можно менять веса и состав пула.",
            weights: {
                title: "Вероятности числа модов",
                hint: "Веса автоматически нормализуются к сумме 1.",
                norm: "Нормализованные"
            },
            pool: {
                title: "Пул модов",
                hint: "Клик по модулю — включить/исключить его из пула."
            },
            targets: {
                title: "Выбери целевые моды",
                limit: "Выбрано максимальное число целевых (4). Снимите один, чтобы выбрать другой.",
                hint: "Клик — выбрать/снять мод как «целевой»."
            },
            results: {
                prob: "Вероятности",
                all: "Все целевые моды выпадут (могут быть лишние)",
                exact: "Ровно этот набор (без лишних модов)",
                atleast1: "Хоть один из целевых модов выпадет",
                killsCalc: "Расчёт количества убийств",
                n50: "Убийств боссов до 50%",
                n90: "Убийств боссов до 90%",
                n99: "Убийств боссов до 99%",
                trialsNote:
                    "Расчёт по формуле: N = ln(1 − P) / ln(1 − p), где p — шанс выпадения всех целевых за одно убийство. Значение округляется вверх."
            }
        },
        mods: {
            desolator: { name: "Дезолятор", desc: "Снижает броню цели." },
            magic_desolator: { name: "Маг. дезолятор", desc: "Снижает сопротивление магии." },
            reflect: { name: "Отражение урона", desc: "Возвращает часть входящего урона атакующему." },
            lifesteal: { name: "Вампиризм", desc: "Восстанавливает здоровье от нанесённого физического урона." },
            magic_lifesteal: { name: "Маг. вампиризм", desc: "Восстанавливает здоровье от нанесённого магического урона." },
            mjolnir: { name: "Мьёльнир", desc: "Цепные молнии при атаках; шанс выпустить разряды." },
            mjolnir_armor: { name: "Броня молний", desc: "Повышает защиту и наказывает атакующих молниями." },
            mkb: { name: "Пробитие (MKB)", desc: "Пробивает уклонение (True Strike) и даёт шанс мини-стана." },
            hp_regen: { name: "Регенерация HP (%)", desc: "Процентная регенерация здоровья." },
            hp_regen_amp: { name: "Усиление регена", desc: "Множитель к эффектам восстановления здоровья." },
            damage_block: { name: "Блок урона", desc: "Шанс частично или полностью заблокировать входящий урон." },
            manacost: { name: "Снижение мана-коста", desc: "Уменьшает затраты маны на способности и эффекты." },
            crit: { name: "Критический удар", desc: "Шанс нанести удар с повышенным множителем урона." },
            multicast: { name: "Мультикаст", desc: "Шанс повторного прокаста способности/эффекта 2–4 раза." }
        }
    },

    en: {
        calculator: {
            title: "Mod Calculator",
            subtitle:
                "Equilibrium roll: number of mods 0–4, chosen without repeats from the pool. You can adjust weights and pool composition.",
            weights: {
                title: "Probabilities of number of mods",
                hint: "Weights are automatically normalized to sum to 1.",
                norm: "Normalized"
            },
            pool: {
                title: "Mod pool",
                hint: "Click a mod to include/exclude it from the pool."
            },
            targets: {
                title: "Select target mods",
                limit: "Maximum number of target mods (4) reached. Unselect one to pick another.",
                hint: "Click to toggle a mod as a target."
            },
            results: {
                prob: "Probabilities",
                all: "All target mods appear (possibly with extras)",
                exact: "Exactly this set (no extras)",
                atleast1: "At least one target mod appears",
                killsCalc: "Boss kill calculations",
                n50: "Boss kills for 50%",
                n90: "Boss kills for 90%",
                n99: "Boss kills for 99%",
                trialsNote:
                    "Calculated as N = ln(1 − P) / ln(1 − p), where p is the single-kill chance for all targets. Rounded up."
            }
        },
        mods: {
            desolator: { name: "Desolator", desc: "Reduces target's armor." },
            magic_desolator: { name: "Magic Desolator", desc: "Reduces magic resistance." },
            reflect: { name: "Damage Reflection", desc: "Returns part of incoming damage to the attacker." },
            lifesteal: { name: "Lifesteal", desc: "Restores health from physical damage dealt." },
            magic_lifesteal: { name: "Magic Lifesteal", desc: "Restores health from magic damage dealt." },
            mjolnir: { name: "Mjollnir", desc: "Chain lightning on attacks; chance to release discharges." },
            mjolnir_armor: { name: "Lightning Armor", desc: "Increases defense and shocks attackers." },
            mkb: { name: "True Strike (MKB)", desc: "Ignores evasion and can mini-stun." },
            hp_regen: { name: "HP Regen (%)", desc: "Percent-based health regeneration." },
            hp_regen_amp: { name: "Regen Amplification", desc: "Multiplier to healing effects." },
            damage_block: { name: "Damage Block", desc: "Chance to partially or fully block incoming damage." },
            manacost: { name: "Mana Cost Reduction", desc: "Reduces mana costs for abilities and effects." },
            crit: { name: "Critical Strike", desc: "Chance to deal a hit with increased damage multiplier." },
            multicast: { name: "Multicast", desc: "Chance to recast a spell or effect 2–4 times." }
        }
    }
};
