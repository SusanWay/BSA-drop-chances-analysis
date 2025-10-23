export default {
    ru: {
        article: {
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
        },
    },
    en: {
        article: {
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
        },
    },
} as const;
