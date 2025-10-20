export default {
    ru: {
        common: {
            brand: "Шансы дропа",
            madeByPrefix: "Создано",
        },

        article: {
            preface: {
                title: "О чём эта статья",
                p1: "Здесь разбираются ключевые механики кастомки Dota 2 — Boss Survival Adventure (BSA). Мы объясним, как эффективно фармить Jewel of Bless — редкий ресурс, который напрямую влияет на улучшение предметов.",
                p2: "Также расскажем, как работает система выпадения предметов с модификаторами (от 0 до 4) и почему шанс распределяется именно так.",
            },

            bless: {
                title: "Шансы дропа Jewel of Bless",
                overview: `
          <p>💎 <strong class="text-primary">Jewel of Bless</strong> — редкий и ценный ресурс. Его выпадение проверяется при событии дропа и зависит от уровня сложности.</p>
          <p>Чем выше сложность, тем выше шанс. Предмет достаётся <strong class="text-primary">одному случайному активному игроку</strong> из команды.</p>
        `,
                how: {
                    title: "Как проходит проверка",
                    step1: "Собираются все активные игроки команды — те, кто находится в игре и не вышел.",
                    step2: "Из них случайно выбирается один игрок — именно он может получить дроп.",
                    step3: "Далее выполняется проверка на выпадение Jewel of Bless, зависящая от сложности текущей игры.",
                },
                solo: {
                    title: "Почему выгоднее играть соло",
                    body: `
            Проверка выполняется для всей команды, а предмет получает лишь один игрок.
            Чем больше людей в команде, тем меньше шанс для каждого.
            <strong class="text-primary">В соло весь шанс — только твой.</strong>
          `,
                },
                difficulty: {
                    title: "Почему важна сложность",
                    body:
                        "С ростом сложности увеличивается базовый шанс на дроп. На низких уровнях Jewel of Bless почти не встречается, а на максимальных — шанс становится ощутимее, но всё ещё остаётся редким.",
                },
                tip: {
                    title: "Коротко по практике",
                    t1: "Фармить выгоднее в одиночку или небольшой группой.",
                    t2: "Выбирай максимальную сложность, с которой можешь справиться — шанс выше.",
                    t3: "Дроп остаётся редким: рассчитывай на серию попыток, а не на удачу с первой.",
                },
            },

            drop: {
                title: "Общая информация о выпадении предметов",
                overview_p1: "",
                overview_p2: "Предметы делятся на пять тиров (сетов).",
                tiers: {
                    title: "Тиры предметов (сеты)",
                    rows: [
                        { name: "1 сет", range: "сложность 1–4" },
                        { name: "2 сет", range: "сложность 5–8" },
                        { name: "3 сет", range: "сложность 9–12" },
                        { name: "4 сет", range: "сложность 13–16" },
                        { name: "5 сет", range: "сложность 17–20" },
                    ],
                },

                golden: {
                    title: "Золотые боссы появляются после зачистки зоны и убийства её босса.",
                    body: "После этого в этой локации начнут появляться золотые боссы с улучшенным дропом.",
                    steps: ["Зачистите локацию.", "Убейте босса локации."],
                },

                appear: {
                    title: "После каких боссов открываются золотые боссы",
                    items: ["Тини", "Слардар", "Монки Кинг", "Фурион", "Дум", "Арк Варден"],
                },

                goldenMobs: {
                    title: "Золотые боссы и их дроп",
                    drop: "Дроп",
                    items: [
                        { id: "monkey", name: "Золотая Обезьяна", drop: "Оружие", desc: "Встроенная дисперсия и «Walrus Punch» (Tusk)." },
                        { id: "sealion", name: "Золотой Морской Лев", drop: "Шлем", desc: "Дисперсия, стан и снижение скорости атаки." },
                        { id: "queen", name: "Золотая Королева", drop: "Броня", desc: "Дисперсия и ульта «Freezing Field» (Crystal Maiden)." },
                        { id: "wyvern", name: "Золотая Виверна", drop: "Щит", desc: "Может наложить немоту и использует ульту «Winter’s Curse»." },
                        { id: "dragon", name: "Золотой Дракон", drop: "Пояс", desc: "Призывает несколько «Sun Strike» и «Light Strike Array» (стан Лины)." },
                        { id: "skeleton", name: "Золотой Скелет", drop: "Боты", desc: "Пассивка «Bulwark» и способность «Avalanche» (Tiny)." },
                    ],
                },

                note: "",
            },

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
                    // Новая таблица: распределение при удачном переролле
                    reroll: {
                        title: "Если переролл сработал: распределение модов",
                        header: "При удачном переролле",
                        rows: [
                            { title: "Вероятности", a4: "4.76 %", a3: "9.52 %", a2: "19.05 %", a1: "52.38 %", a0: "14.29 %" }
                        ],
                    },
                },
                note: "Проще говоря: гильдия не «апгрейдит» уже хорошие вещи, а спасает часть пустых. Поэтому эффект заметнее всего в росте предметов с 1–2 модами.",
            },
        },

        calc: {
            bless: {
                title: "Калькулятор: среднее количество убийств до дропа Jewel of Bless",
                players: {
                    label: "Количество игроков",
                    value: "Игроков",
                    hint: "Шанс делится между всеми участниками — в соло весь шанс твой.",
                },
                difficulty: {
                    label: "Сложность",
                    value: "Уровень сложности",
                    hint: "Чем выше сложность, тем больше базовый шанс на дроп.",
                },
                team: { title: "Для команды" },
                you: { title: "Для тебя лично" },
                prob: "Шанс за убийство",
                expectedKills: "Ожидаемое число убийств",
                note: "Личный шанс = командный шанс ÷ число игроков.",
                warning: {
                    title: "Важно знать",
                    body: "Нет точных данных, на каких мобах срабатывает проверка на выпадение. Вероятно, призванные существа (summons) не считаются — например, пуджи на второй локации.",
                },
            },

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
                    title: "Предупреждение",
                    body:
                        "Шансы дропа могут отличаться на доли процента, так как автор статьи не писал код на Lua и мог что-то не предусмотреть.",
                },
                table: {
                    headers: { bonus: "Гильд. бонус (p)", ge1: "≥1 модиф." },
                },
            },
        },
    },

    en: {
        common: {
            brand: "Drop Chances",
            madeByPrefix: "Created by",
        },

        article: {
            preface: {
                title: "What this article is about",
                p1: "This article explains the key mechanics of the Dota 2 custom map — Boss Survival Adventure (BSA). We’ll explain how to effectively farm the Jewel of Bless — a rare resource that directly affects item enhancement.",
                p2: "We’ll also cover how the item modifier system works (from 0 to 4 modifiers) and why the drop chance is distributed the way it is.",
            },

            bless: {
                title: "Jewel of Bless Drop Chances",
                overview: `
          <p>💎 <strong class="text-primary">Jewel of Bless</strong> is a rare and valuable resource. Its drop is checked during a loot event and depends on the game’s difficulty level.</p>
          <p>The higher the difficulty, the higher the chance. The item is awarded to <strong class="text-primary">one random active player</strong> from the team.</p>
        `,
                how: {
                    title: "How the check works",
                    step1: "All active team members — those who are still in the game — are gathered.",
                    step2: "One random player among them is chosen — only this player can receive the drop.",
                    step3: "Then, a drop check for Jewel of Bless is performed, which depends on the current game difficulty.",
                },
                solo: {
                    title: "Why it’s more profitable to play solo",
                    body: `
            The check is performed for the entire team, but the item goes to only one player.
            The more players there are, the lower your personal odds.
            <strong class="text-primary">In solo, the entire chance is yours.</strong>
          `,
                },
                difficulty: {
                    title: "Why difficulty matters",
                    body:
                        "As the difficulty increases, the base drop chance rises. On lower levels, Jewel of Bless almost never appears, while on the highest levels — the chance becomes noticeable, though still rare.",
                },
                tip: {
                    title: "Practical summary",
                    t1: "Farming is more efficient solo or in a small group.",
                    t2: "Choose the highest difficulty you can handle — the chance increases.",
                    t3: "The drop remains rare: expect multiple runs rather than a first-try success.",
                },
            },

            drop: {
                title: "General information about item drops",
                overview_p1: "",
                overview_p2: "Items are divided into five tiers (sets).",
                tiers: {
                    title: "Item Tiers (Sets)",
                    rows: [
                        { name: "Set 1", range: "difficulty 1–4" },
                        { name: "Set 2", range: "difficulty 5–8" },
                        { name: "Set 3", range: "difficulty 9–12" },
                        { name: "Set 4", range: "difficulty 13–16" },
                        { name: "Set 5", range: "difficulty 17–20" },
                    ],
                },

                golden: {
                    title: "Golden bosses appear after clearing a zone and defeating its main boss.",
                    body: "After this, golden bosses with improved loot start appearing in that location.",
                    steps: ["Clear the location.", "Defeat the location’s boss."],
                },

                appear: {
                    title: "After which bosses golden bosses appear",
                    items: ["Tiny", "Slardar", "Monkey King", "Furion", "Doom", "Arc Warden"],
                },

                goldenMobs: {
                    title: "Golden Bosses and Their Drops",
                    drop: "Drop",
                    items: [
                        { id: "monkey", name: "Golden Monkey", drop: "Weapon", desc: "Built-in dispersion and “Walrus Punch” (Tusk)." },
                        { id: "sealion", name: "Golden Sea Lion", drop: "Helmet", desc: "Dispersion, stun, and attack speed reduction." },
                        { id: "queen", name: "Golden Queen", drop: "Armor", desc: "Dispersion and the ultimate “Freezing Field” (Crystal Maiden)." },
                        { id: "wyvern", name: "Golden Wyvern", drop: "Shield", desc: "Can silence enemies and uses “Winter’s Curse” ultimate." },
                        { id: "dragon", name: "Golden Dragon", drop: "Belt", desc: "Summons multiple “Sun Strike” and “Light Strike Array” (Lina’s stun)." },
                        { id: "skeleton", name: "Golden Skeleton", drop: "Boots", desc: "Passive “Bulwark” and ability “Avalanche” (Tiny)." },
                    ],
                },

                note: "",
            },

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
                    // New table: distribution on a successful reroll
                    reroll: {
                        title: "On a successful reroll: mod distribution",
                        header: "Successful reroll only",
                        rows: [
                            { title: "Probabilities", a4: "4.76 %", a3: "9.52 %", a2: "19.05 %", a1: "52.38 %", a0: "14.29 %" }
                        ],
                    },
                },
                note: "In plain words: the guild doesn’t upgrade already good rolls — it rescues part of the empty ones. This is why you mostly see more 1–2 mod items as the bonus grows.",
            },
        },

        calc: {
            bless: {
                title: "Calculator: average kills required for Jewel of Bless drop",
                players: {
                    label: "Number of players",
                    value: "Players",
                    hint: "The chance is shared among all team members — solo means the full chance is yours.",
                },
                difficulty: {
                    label: "Difficulty",
                    value: "Difficulty level",
                    hint: "The higher the difficulty, the greater the base drop chance.",
                },
                team: { title: "For the team" },
                you: { title: "For you personally" },
                prob: "Chance per kill",
                expectedKills: "Expected kills",
                note: "Personal chance = team chance ÷ number of players.",
                warning: {
                    title: "Important note",
                    body: "There’s no exact data on which mobs trigger the drop check. It’s likely that summoned units (summons) don’t count — for example, Pudge on the second map.",
                },
            },

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
                    title: "Warning",
                    body:
                        "Drop chances may differ slightly by fractions of a percent since the article’s author didn’t write Lua code and may have missed minor details.",
                },
                table: {
                    headers: { bonus: "Guild Bonus (p)", ge1: "≥1 Modifier" },
                },
            },
        },
    },
} as const;
