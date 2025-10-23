export default {
    ru: {
        article: {
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
        },
    },
    en: {
        article: {
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
        },
    },
} as const;
