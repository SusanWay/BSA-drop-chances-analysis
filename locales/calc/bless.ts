export default {
    ru: {
        calc: {
            bless: {
                title: "Калькулятор: среднее количество убийств до дропа Jewel of Bless",
                players: {
                    label: "Количество игроков",
                    value: "Игроков",
                    hint:
                        "Шанс делится между всеми участниками — в соло весь шанс твой.",
                },
                difficulty: {
                    label: "Сложность",
                    value: "Уровень сложности",
                    hint: "Чем выше сложность, тем больше базовый шанс на дроп.",
                },
                probLabel: "Шанс выпадения:",
                killsCalc: "Расчёт количества убийств",
                n50: "Убийств крипов до 50%",
                n90: "Убийств крипов до 90%",
                n99: "Убийств крипов до 99%",
                trialsNote:
                    "Расчёт: N = ln(1 − P) / ln(1 − p), где p — шанс дропа за одно убийство. Округляется вверх.",
                team: { title: "Для команды" },
                you: { title: "Для тебя лично" },
                prob: "Шанс за убийство",
                expectedKills: "Ожидаемое число убийств",
                note: "Личный шанс = командный шанс / число игроков.",
                warning: {
                    title: "Важно знать",
                    line1:
                        "С 22.10.2025 формулы были изменены: фактические шансы дропа сейчас неизвестны.",
                    line2Prefix:
                        "За актуальной информацией можно обратиться в Discord к разработчику",
                },
            },
        },
    },
    en: {
        calc: {
            bless: {
                title: "Calculator: average kills required for Jewel of Bless drop",
                players: {
                    label: "Number of players",
                    value: "Players",
                    hint:
                        "The chance is shared among all team members — solo means the full chance is yours.",
                },
                difficulty: {
                    label: "Difficulty",
                    value: "Difficulty level",
                    hint:
                        "The higher the difficulty, the greater the base drop chance.",
                },
                probLabel: "Chance of falling out:",
                killsCalc: "Boss kill calculations",
                n50: "Mobs kills for 50%",
                n90: "Mobs kills for 90%",
                n99: "Mobs kills for 99%",
                trialsNote:
                    "Computed as N = ln(1 − P) / ln(1 − p), where p is the per-kill drop chance. Rounded up.",
                team: { title: "For the team" },
                you: { title: "For you personally" },
                prob: "Chance per kill",
                expectedKills: "Expected kills",
                note: "Personal chance = team chance / number of players.",
                warning: {
                    title: "Important note",
                    line1:
                        "As of 2025-10-22, the formulas changed — actual drop rates are currently unknown.",
                    line2Prefix:
                        "For up-to-date details, you may contact the game developer on Discord:",
                },
            },
        },
    },
} as const;
