export default {
    ru: {
        calc: {
            attrs: {
                title: "Калькулятор: шансы модификаторов по бонусу гильдии",
                control: {
                    label: "Бонус гильдии (в %)",
                    current: "Текущее значение",
                },
                probs: {
                    title: "Вероятности",
                },
                warning: {
                    title: "Важно знать",
                    line1:
                        "С 22.10.2025 формулы были изменены: фактические шансы дропа сейчас неизвестны.",
                    line2Prefix:
                        "За актуальной информацией можно обратиться в Discord к разработчику",
                },
                table: {
                    headers: { bonus: "Гильд. бонус (p)", ge1: "≥1 модиф." },
                },
            },
        },
    },
    en: {
        calc: {
            attrs: {
                title: "Calculator: modifier chances by guild bonus",
                control: {
                    label: "Guild bonus (%)",
                    current: "Current value",
                },
                probs: {
                    title: "Probabilities",
                },
                warning: {
                    title: "Important note",
                    line1:
                        "As of 2025-10-22, the formulas changed — actual drop rates are currently unknown.",
                    line2Prefix:
                        "For up-to-date details, you may contact the game developer on Discord:",
                },
                table: {
                    headers: { bonus: "Guild Bonus (p)", ge1: "≥1 Modifier" },
                },
            },
        },
    },
} as const;
