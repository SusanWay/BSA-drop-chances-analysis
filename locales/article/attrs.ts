export default {
    ru: {
        article: {
            attrs: {
                title: "Как определяется количество модификаторов на предмете",
                overview: `
          <p><strong class="text-primary">Коротко:</strong> у каждой выпавшей вещи есть шанс появиться с 0–4 модификаторами.</p>
          <p>Без гильдии чаще всего падают «пустые» вещи. Бонус гильдии умеет превращать часть таких пустых предметов в вещи с 1–4 модами.</p>
          <p><strong class="text-primary">Важно:</strong> он не усиливает уже хорошие вещи — только помогает тем, что изначально должны были быть без модов. Поэтому рост бонуса прежде всего увеличивает долю предметов с 1–2 модами, а «топы» остаются редкими.</p>
        `,
                how: {
                    title: "Как это работает",
                    steps: [
                        "Игра сначала определяет, с каким количеством модов предмет должен появиться — от 0 до 4.",
                        "Если вещь вышла «пустой», включается бонус гильдии: он один раз пробует изменить результат в сторону появления модов.",
                        "Бонус не влияет на предметы, которые и так уже выпали с модами, и не может дать больше 4 модов."
                    ],
                },
                tips: {
                    title: "Что это значит на практике",
                    items: [
                        "Без гильдии большинство предметов будут без модов — это нормально по задумке режима.",
                        "Бонус гильдии работает только на «пустые» вещи и делает их с модами — чаще всего с 1–2.",
                        "Редкие предметы с 3–4 модами остаются редкими даже при высоком бонусе — относись к ним как к удаче.",
                        "Модификаторы на одном предмете не повторяются: если выпало 3 мода, это три разных свойства.",
                        "Типы модов выбираются равновероятно из общего списка — нет «скрытых» приоритетов."
                    ],
                },
                tables: {
                    headers: { bonus: "Гильд. бонус (p)", ge1: "≥1 модиф." },
                    solo: {
                        title: "Шансы игрока без гильдии",
                        rows: [
                            { bonus: "0 %", ge1: "17.82 %", a4: "0.99 %", a3: "1.98 %", a2: "3.96 %", a1: "10.89 %", a0: "82.18 %" },
                        ],
                    },
                },
                guild: {
                    title: "Сводная таблица",
                    rows: [
                        { bonus: "10 %", ge1: "24.61 %", a4: "1.37 %", a3: "2.73 %", a2: "5.47 %", a1: "15.04 %", a0: "75.39 %" },
                        { bonus: "20 %", ge1: "31.40 %", a4: "1.74 %", a3: "3.49 %", a2: "6.98 %", a1: "19.19 %", a0: "68.60 %" },
                        { bonus: "30 %", ge1: "38.19 %", a4: "2.12 %", a3: "4.24 %", a2: "8.49 %", a1: "23.34 %", a0: "61.81 %" },
                        { bonus: "40 %", ge1: "44.98 %", a4: "2.50 %", a3: "5.00 %", a2: "10.00 %", a1: "27.49 %", a0: "55.02 %" },
                        { bonus: "50 %", ge1: "51.77 %", a4: "2.88 %", a3: "5.75 %", a2: "11.50 %", a1: "31.64 %", a0: "48.23 %" },
                    ],
                },
                reroll: {
                    title: "Если переролл сработал: распределение модов",
                    header: "При удачном переролле",
                    rows: [
                        { title: "Вероятности", a4: "4.76 %", a3: "9.52 %", a2: "19.05 %", a1: "52.38 %", a0: "14.29 %" }
                    ],
                },
                note: "Проще говоря: гильдия не «апгрейдит» уже хорошие вещи, а спасает часть пустых. Поэтому эффект заметнее всего в росте предметов с 1–2 модами.",
            },
        },
    },
    en: {
        article: {
            attrs: {
                title: "How the number of modifiers on an item is determined",
                overview: `
          <p><strong class="text-primary">In short:</strong> every item can appear with 0–4 modifiers.</p>
          <p>Without a guild, most drops are empty. The guild bonus can convert part of those empty items into ones with 1–4 modifiers.</p>
          <p><strong class="text-primary">Important:</strong> it doesn’t improve items that already rolled with mods — it only helps items that would have been empty. That’s why higher bonuses mostly increase 1–2 mod items, while 3–4 remain rare.</p>
        `,
                how: {
                    title: "How it works",
                    steps: [
                        "The game first decides how many modifiers the item should have — from 0 to 4.",
                        "If the item came out empty, the guild bonus kicks in once and tries to turn it into an item with mods.",
                        "The bonus doesn’t affect items that already rolled with mods and can never exceed 4 mods."
                    ],
                },
                tips: {
                    title: "What it means in practice",
                    items: [
                        "Without a guild, most items will be empty — that’s by design.",
                        "The guild bonus only affects empty items and most often turns them into 1–2 mod items.",
                        "Items with 3–4 mods remain rare even with a high bonus — treat them as lucky finds.",
                        "Modifiers on a single item don’t repeat: 3 mods mean three different properties.",
                        "Modifier types are chosen with equal likelihood from the pool — no hidden priorities."
                    ],
                },
                tables: {
                    headers: { bonus: "Guild Bonus (p)", ge1: "≥1 Modifier" },
                    solo: {
                        title: "Player without a guild",
                        rows: [
                            { bonus: "0 %", ge1: "17.82 %", a4: "0.99 %", a3: "1.98 %", a2: "3.96 %", a1: "10.89 %", a0: "82.18 %" },
                        ],
                    },
                },
                guild: {
                    title: "Summary Table",
                    rows: [
                        { bonus: "10 %", ge1: "24.61 %", a4: "1.37 %", a3: "2.73 %", a2: "5.47 %", a1: "15.04 %", a0: "75.39 %" },
                        { bonus: "20 %", ge1: "31.40 %", a4: "1.74 %", a3: "3.49 %", a2: "6.98 %", a1: "19.19 %", a0: "68.60 %" },
                        { bonus: "30 %", ge1: "38.19 %", a4: "2.12 %", a3: "4.24 %", a2: "8.49 %", a1: "23.34 %", a0: "61.81 %" },
                        { bonus: "40 %", ge1: "44.98 %", a4: "2.50 %", a3: "5.00 %", a2: "10.00 %", a1: "27.49 %", a0: "55.02 %" },
                        { bonus: "50 %", ge1: "51.77 %", a4: "2.88 %", a3: "5.75 %", a2: "11.50 %", a1: "31.64 %", a0: "48.23 %" },
                    ],
                },
                reroll: {
                    title: "On a successful reroll: mod distribution",
                    header: "Successful reroll only",
                    rows: [
                        { title: "Probabilities", a4: "4.76 %", a3: "9.52 %", a2: "19.05 %", a1: "52.38 %", a0: "14.29 %" }
                    ],
                },
                note: "In plain words: the guild doesn’t upgrade already good rolls — it rescues part of the empty ones. This is why you mostly see more 1–2 mod items as the bonus grows.",
            },
        },
    },
} as const;
