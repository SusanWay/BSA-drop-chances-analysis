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
                    body:
                        "С 22.10.2025 формулы переработаны, и реальные шансы стали примерно в два раза ниже. Текущие вычисления калькулятора устарели.",
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
                    body:
                        "As of 2025-10-22, formulas have been reworked — actual probabilities are roughly twice lower. The calculator’s results are outdated.",
                },
                table: {
                    headers: { bonus: "Guild Bonus (p)", ge1: "≥1 Modifier" },
                },
            },
        },
    },
} as const;
