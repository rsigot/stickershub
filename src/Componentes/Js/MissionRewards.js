
// Duración de las misiones en segundos
const DURATION_1H = 2700;         // Moon 45 minutos  2700
const DURATION_2H = 5400;         // Mars 90 minutos  5400
const DURATION_4H = 10800;         // Jupiter 3 horas  10800
const DURATION_8H = 21600;      // Alpha Centauri  6 horas  21600
const DURATION_16H = 43200;     // Andromeda Galaxy  12 horas  43200
const DURATION_32H = 86400;     // Deep Space 24 horas  86400

// Inventario de Premios Disponibles

export const prize = {
    "Gato Noir Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmdZsFupih67jHDjWKN8hasbXYNq3t4YEd7ZAyjSKgRPxK",
        template: "784442",
        schema: "profittakers"
    },
    "Spark Gray Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmeP5K1nARDhTRFSp5VMKunK78dYiWG2NgFG7cqhKcyhiv",
        template: "784718",
        schema: "profittakers"
    },
    "Gato Inferno Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmQxpLeQ61n8hgefQxd19sRZ6pKWMiKwC9M9ozE5RQHA5g",
        template: "784969",
        schema: "profittakers"
    },
    "Bloodie Cat Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmXoPF88GrWHTniLLybhYvW1yDbYZVDFkFzBXKncEhgasP",
        template: "791215",
        schema: "profittakers"
    },
    "Lunar Gaze Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmUsrDjtmPBUiwj52Pfodg6LVQ36EJVtPhoy86HBzL33bR",
        template: "784273",
        schema: "profittakers"
    },
    "Astro Folly Criter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmfLq11SdXHEsv4Se7b5vJpqmc14BrW126UoWMMRXSA3Gf",
        template: "784995",
        schema: "profittakers"
    },
    "Troll Moon Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmTE5JQVeWk7V9TwfLGrkCgMBLtPhHtF59D3vniRoNnVtE",
        template: "791212",
        schema: "profittakers"
    },
    "Metallic Blaze Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZLkRTway4Pv7YAiPgeHCwu48p52nB1gzKCzQYAu2XWLK",
        template: "784275",
        schema: "profittakers"
    },
    "Skull Blaze Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmcVraqEqRfksyNgTphX1wbVRuXdutexYb5ZXZGWG5YWNU",
        template: "784981",
        schema: "profittakers"
    },
    "Abyssal Serpent Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmVSgB1dSY9fVnXjaShmmgcBmKXGXQcuYw1EmL8uCaGri4",
        template: "784473",
        schema: "profittakers"
    },
    "Sharkcoil Serpent Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmULEZBisEt4AGzS9DYAg38swqTTVU6Em6GMYSCN11zPcM",
        template: "784864",
        schema: "profittakers"
    },
    "Napalm Serpent Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmQfy1isrZ3dVtWF4bNtriYQt1HsciUgznKVzpTmKUJSSo",
        template: "791218",
        schema: "profittakers"
    },
    "BotPod Joy Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qmamti2MijWFodhuxprSThtGTU4sA6SAVjo1EuGVJ9ucb3",
        template: "784778",
        schema: "profittakers"
    },
    "Infernal Bot Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qmc5GjyAm1L6LKWjVmpMYE1YxzCrK6w6tkff4kDBeDPJs8",
        template: "791217",
        schema: "profittakers"
    },
    "Bad Bot Cripper": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmQKaf9eHDGJfQnVvwjVAAmgrXFmYDx7WUoH4f1fV6eC5o",
        template: "784506",
        schema: "profittakers"
    },
    "Error 404 Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmcvTC6nqQfGP2dPxRN8JqyPFxqYYS1KsBGo4M35JDr5DQ",
        template: "791214",
        schema: "profittakers"
    },
    "Diablotronic Chaos Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qme7w3vGdYgCeF94oRVjfQUUWapX9qhgxRdJT8sBusRX4K",
        template: "784991",
        schema: "profittakers"
    },
    "Celestial Particle Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYz2Mh94Ch2s5KzkQZrfBAJgdo1fxY942XS3TXGigAR2c",
        template: "784760",
        schema: "profittakers"
    },
    "Cosmic Tentacle Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZD1xqASbRUNveGWqGsFjQi42ohZAzGXgjeG2zzXnjWEZ",
        template: "784907",
        schema: "profittakers"
    },
    "Red Cosmic Tentacle Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmSKX48Y6NpNT5AAiK93ed8HQqV9TVnoNNfrim5vvb1t62",
        template: "784926",
        schema: "profittakers"
    },
    "Green Cosmic Tentacle Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmQ8XHgttVyMqjvmvGBNeUUdSG1wQYmK86Bd7RJyDBwZZR",
        template: "784999",
        schema: "profittakers"
    },
    "Silver Demon Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmaYZmbEJiy6zedQAz5saH87JDWbLCdEXX3Zu4rmgJRgsW",
        template: "784279",
        schema: "profittakers"
    },
    "Diablo Visage Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmNg4WxwzZKfBsM9v5VTwaxwina9fmpPfavJenW4EvegM9",
        template: "784867",
        schema: "profittakers"
    },
    "Infernal Pizza Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qmd2SWy1fK2R7fVQBcS2YSs14LFofeub2xTZ6B8Lu6WS1n",
        template: "787661",
        schema: "profittakers"
    },
    "Noble Pizza Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmcntJD7jvCEabnCNGmrAGJRnSKsa56J7LuKskpGYTsckD",
        template: "788436",
        schema: "profittakers"
    },
    "Golden Eye Pizza": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmVC8sufqnF6xePM5txVf84hiXtHDG3UURrWKRHXnn69fg",
        template: "793451",
        schema: "profittakers"
    },
    "Pizza from the Caves": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qme9fBNc6JRL5KyZ6MDvgMTm9n8icjfAZ6vokBWHeKrBqN",
        template: "793450",
        schema: "profittakers"
    },
    "Zombie Rotten Pizza": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmehNkauc9rHM8P65LeFs9Tt5FD45VFxp4sCUWAUztY1Xa",
        template: "793452",
        schema: "profittakers"
    },
    "Infected Mutant Pizza": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmQx8kLfw351hT84JDTgfx76foPhLyHimHcnmsqzL9U761",
        template: "793453",
        schema: "profittakers"
    },
    "Angry Pizza Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmUNvd54pMSJGbu32AbBZ4Gom8tWByEoZstXrk9Mh3bAND",
        template: "793454",
        schema: "profittakers"
    },
    "Red Hot Chilli Pizza": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmepbEXfFpyJpL4TbiUpHFuhuTjfhAV2uE8nWtj4yLgMxJ",
        template: "793455",
        schema: "profittakers"
    },
    "Particle Cosmic Tentacle": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmVE9s8jLDePsvsZKscgKN3JosJYYvhU43AcmzarQZkSm9",
        template: "791209",
        schema: "profittakers"
    },
    "Cosmic Demon Elite Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qmd3vkCLmPWyaXfM6xwRja41G9XZrkwtpqNENYJGDiPVLm",
        template: "788437",
        schema: "profittakers"
    },
    "Furious Demon Elite Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmdQBMKUpH2tFn9RiMaDKzTV2VKRtahGR3NuTmvCQBcJym",
        template: "788442",
        schema: "profittakers"
    },
    "Demon Lord Critter": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmcjCYBaipbQ9eoMd3X7D4DjhZgPvA2dhCEAjykwFgoM9J",
        template: "785060",
        schema: "profittakers"
    },
    "Monster Pizza Roulette": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmdYxSkmxXD8bvxyVP3k8DFttCuMc9x7WtA5QV7Cp2oMka",
        template: "793473",
        schema: "profittakers"
    },

    "Ambar Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmaDsFKZ2r1hCUnHXJd4aMSwoaJmt43F4FXdRMcTYaGLa3",
        template: "796301",
        schema: "profittakers"
    },
    "Jade Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYyzeM1m8sGJXDoHptR4bBwTjEsAnL5ivpFgQwG6tEZFS",
        template: "796299",
        schema: "profittakers"
    },
    "Pearl Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYbJ6jCJWV6LmMHr47oAY15KYobX6X5nKBo3ecsytG2Xv",
        template: "796302",
        schema: "profittakers"
    },
    "Turquoise Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYpWhvEEhp3YVisXpfwpjjtDfYtH6ZBS6UeikhSAssiGt",
        template: "796300",
        schema: "profittakers"
    },
    "Amethyst Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZM56pvEdFNKYP5eEonVyYi9aPoYc2X7PEboqBbBWGfrF",
        template: "796309",
        schema: "profittakers"
    },
    "Diamond Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZcsHPmMrdav9PeJbGX5FCywiRxV2WK4Cp6Q7aHGebBjb",
        template: "796306",
        schema: "profittakers"
    },
    "Opal Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmURKVuT3Qb5yBjuf4X4gTcuhNy6SYASSYcsUK5HgG5NRf",
        template: "796313",
        schema: "profittakers"
    },
    "Ruby Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmdXY2TC5s5R5nAqzoQZeqQ1rDUJL6owVf1ba1UDWvRHNe",
        template: "796303",
        schema: "profittakers"
    },
    "Topaz Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZzoGLwpZsZunxpCWxPENDrcV9Xv4Xv89i3MZB1JxvLDS",
        template: "796307",
        schema: "profittakers"
    },
    "Sapphire Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYL6Pqa4aAe4MzgqVVW739QSc2KPqqQ6uM7MYJEKFgmQj",
        template: "796316",
        schema: "profittakers"
    },
    "Black Diamond Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmTQE5ivjqs4gpsoGZuCZXFE6pBzmffeAnm7S1wBriRW7x",
        template: "796310",
        schema: "profittakers"
    },
    "Star Ruby Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmTTU61cug27qPiKtGGMMRc7mmJ59ymxHmsJnoq5FUYbE4",
        template: "796314",
        schema: "profittakers"
    },
    "Nanodiamond Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmWKAfXwN3Ur7ptngZRuo7DRMPrSoWXxpMrRNsd1DyUJXS",
        template: "796311",
        schema: "profittakers"
    },
    "Peridotos Ore": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmP7KyeNd3PZUkBBTuVf1FtkF7sgWa6pDaj3UVxhPakfxs",
        template: "796305",
        schema: "profittakers"
    },

    "Iron Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYvpe9JDuN1h4TSGCJtwLBkuaLxWrtpcJUH4Esd3rDAj9",
        template: "797888",
        schema: "profittakers"
    },
    "Copper Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/Qma4ZCkA6Z637VXFiNPEWQkac95ZEjV27KPJRPrgwdhK8w",
        template: "797892",
        schema: "profittakers"
    },
    "Earth Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmZmdrXrRLB3VgARXvEDGCNtz9SXFGEXNAhHg9h2DS5As7",
        template: "797886",
        schema: "profittakers"
    },
    "Fire Cube ": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmUQgDWZm2WKF4wHHhG6MMUX3nyUAv6Avh2GvcTVdc1NuC",
        template: "797891",
        schema: "profittakers"
    },
    "Ice Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmYUbb4jSJxUg8ic7C1hxq8otjxz7BzNJAcixfL1GKoTha",
        template: "797890",
        schema: "profittakers"
    },
    "Golden Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmPb6sWLSREnRyj1j11X9QNJaVqcZWwxVWZ51Svvx2siQ1",
        template: "797887",
        schema: "profittakers"
    },
    "Elemental Energy Cube": {
        imageURL: "https://atomichub-ipfs.com/ipfs/QmdS32kvsuakiSKuqmS9s89wUjrJwJM96bFUgYR53YxiRf",
        template: "797889",
        schema: "profittakers"
    },
    "Coins": {
        imageURL: "http://i.imgur.com/5MbUxQA.png"
    },
};

// Funciones generadoras de recompensas

function getRandomReward(distribution) {
    const userRewards = [];

    for (const [reward, probability] of Object.entries(distribution)) {
        const rand = Math.random() * 100;
        console.log("Control: " + reward + " / Azar: " + rand + " / Prob: " + probability);
        if (rand <= probability) {
            console.log("***REWARD***: " + reward + " / Azar: " + rand + " / Prob: " + probability);
            userRewards.push(reward);
        }
    }
    return userRewards.length > 0 ? userRewards : null;
}

export function generateCritterReward(duration) {
    const critterDistribution = getCritterDistribution(duration);
    return getRandomReward(critterDistribution);
}

export function generateGemReward(duration) {
    const gemDistribution = getGemDistribution(duration);
    return getRandomReward(gemDistribution);
}

export function generateCubeReward(duration) {
    const cubeDistribution = getCubesDistribution(duration);
    return getRandomReward(cubeDistribution);
}

export function generateCoinReward(duration) {
    const coinDistribution = getCoinsDistribution(duration);
    //console.log("Coins: " + coinDistribution.value);
    return coinDistribution.value;
}

// Definición de Probabilidades

export function getCritterDistribution(duration) {
    switch (duration) {
        case DURATION_1H:
            return {
                "Gato Noir Critter": 5,
                "Spark Gray Critter": 5,
                "Gato Inferno Critter": 5,
                "Bloodie Cat Critter": 5,
                "Lunar Gaze Critter": 5,
                "Astro Folly Criter": 5,
                "Troll Moon Critter": 5,
                "Metallic Blaze Critter": 5,
                "Skull Blaze Critter": 5
            };
        case DURATION_2H:
            return {
                "Gato Noir Critter": 7.5,
                "Spark Gray Critter": 7.5,
                "Gato Inferno Critter": 7.5,
                "Bloodie Cat Critter": 7.5,
                "Lunar Gaze Critter": 7.5,
                "Astro Folly Criter": 7.5,
                "Troll Moon Critter": 7.5,
                "Metallic Blaze Critter": 7.5,
                "Skull Blaze Critter": 7.5
            };
        case DURATION_4H:
            return {
                "Gato Noir Critter": 11.3,
                "Spark Gray Critter": 11.3,
                "Gato Inferno Critter": 11.3,
                "Bloodie Cat Critter": 11.3,
                "Lunar Gaze Critter": 11.3,
                "Astro Folly Criter": 11.3,
                "Troll Moon Critter": 11.3,
                "Metallic Blaze Critter": 11.3,
                "Skull Blaze Critter": 11.3
            };
        case DURATION_8H:
            return {
                "Gato Noir Critter": 16.9,
                "Spark Gray Critter": 16.9,
                "Gato Inferno Critter": 16.9,
                "Bloodie Cat Critter": 16.9,
                "Lunar Gaze Critter": 16.9,
                "Astro Folly Criter": 16.9,
                "Troll Moon Critter": 16.9,
                "Metallic Blaze Critter": 16.9,
                "Skull Blaze Critter": 16.9,

                "Abyssal Serpent Critter": 3.3,
                "Sharkcoil Serpent Critter": 3.3,
                "Napalm Serpent Critterr": 3.3,
                "BotPod Joy Critter": 3.3,
                "Infernal Bot Critter": 3.3,
                "Bad Bot Cripper": 3.3,
                "Error 404 Critter": 3.3,
                "Diablotronic Chaos Critter": 3.3,
                "Celestial Particle Critter": 3.3
            };
        case DURATION_16H:
            return {
                "Gato Noir Critter": 25.3,
                "Spark Gray Critter": 25.3,
                "Gato Inferno Critter": 25.3,
                "Bloodie Cat Critter": 25.3,
                "Lunar Gaze Critter": 25.3,
                "Astro Folly Criter": 25.3,
                "Troll Moon Critter": 25.3,
                "Metallic Blaze Critter": 25.3,
                "Skull Blaze Critter": 25.3,

                "Abyssal Serpent Critter": 5,
                "Sharkcoil Serpent Critter": 5,
                "Napalm Serpent Critterr": 5,
                "BotPod Joy Critter": 5,
                "Infernal Bot Critter": 5,
                "Bad Bot Cripper": 5,
                "Error 404 Critter": 5,
                "Diablotronic Chaos Critter": 5,
                "Celestial Particle Critter": 5,

                "Cosmic Tentacle Critter": 2.2,
                "Red Cosmic Tentacle Critter": 2.2,
                "Green Cosmic Tentacle Critter": 2.2,
                "Silver Demon Critter": 2.2,
                "Diablo Visage Critter": 2.2,
                "Infernal Pizza Critter": 2.2,
                "Noble Pizza Critter": 2.2,
                "Golden Eye Pizza": 2.2,
                "Pizza from the Caves": 2.2,
                "Zombie Rotten Pizza": 2.2,
                "Infected Mutant Pizza": 2.2,
                "Angry Pizza Critter": 2.2,
                "Red Hot Chilli Pizza": 2.2

            };
        case DURATION_32H:
            return {
                "Gato Noir Critter": 38,
                "Spark Gray Critter": 38,
                "Gato Inferno Critter": 38,
                "Bloodie Cat Critter": 38,
                "Lunar Gaze Critter": 38,
                "Astro Folly Criter": 38,
                "Troll Moon Critter": 38,
                "Metallic Blaze Critter": 38,
                "Skull Blaze Critter": 38,

                "Abyssal Serpent Critter": 7.5,
                "Sharkcoil Serpent Critter": 7.5,
                "Napalm Serpent Critterr": 7.5,
                "BotPod Joy Critter": 7.5,
                "Infernal Bot Critter": 7.5,
                "Bad Bot Cripper": 7.5,
                "Error 404 Critter": 7.5,
                "Diablotronic Chaos Critter": 7.5,
                "Celestial Particle Critter": 7.5,

                "Cosmic Tentacle Critter": 3.3,
                "Red Cosmic Tentacle Critter": 3.3,
                "Green Cosmic Tentacle Critter": 3.3,
                "Silver Demon Critter": 3.3,
                "Diablo Visage Critter": 3.3,
                "Infernal Pizza Critter": 3.3,
                "Noble Pizza Critter": 3.3,
                "Golden Eye Pizza": 3.3,
                "Pizza from the Caves": 3.3,
                "Zombie Rotten Pizza": 3.3,
                "Infected Mutant Pizza": 3.3,
                "Angry Pizza Critter": 3.3,
                "Red Hot Chilli Pizza": 3.3,

                "Particle Cosmic Tentacle": 0.3,
                "Cosmic Demon Elite Critter": 0.3,
                "Furious Demon Elite Critter": 0.3,
                "Demon Lord Critter": 0.3,
                "Monster Pizza Roulette": 0.3
            };
        default:
            return {};
    }
}

export function getGemDistribution(duration) {
    // Distribución de gemas según la duración de la misión
    switch (duration) {
        case DURATION_1H: // 45 minutos  2700
            return {
                "Ambar Ore": 5,
                "Jade Ore": 5,
                "Pearl Ore": 5,
                "Turquoise Ore": 5
            };
        case DURATION_2H: // 90 minutos
            return {
                "Ambar Ore": 7.5,
                "Jade Ore": 7.5,
                "Pearl Ore": 7.5,
                "Turquoise Ore": 7.5
            };
        case DURATION_4H: // 3 horas
            return {
                "Ambar Ore": 11.3,
                "Jade Ore": 11.3,
                "Pearl Ore": 11.3,
                "Turquoise Ore": 11.3
            };
        case DURATION_8H: // 6 horas
            return {
                "Ambar Ore": 16.9,
                "Jade Ore": 16.9,
                "Pearl Ore": 16.9,
                "Turquoise Ore": 16.9,

                "Amethyst Ore": 3.3,
                "Diamond Ore": 3.3,
                "Opal Ore": 3.3,
                "Ruby Ore": 3.3,
                "Topaz Ore": 3.3,
                "Sapphire Ore": 3.3
            };
        case DURATION_16H: // 12 horas
            return {
                "Ambar Ore": 25.3,
                "Jade Ore": 25.3,
                "Pearl Ore": 25.3,
                "Turquoise Ore": 25.3,

                "Amethyst Ore": 5,
                "Diamond Ore": 5,
                "Opal Ore": 5,
                "Ruby Ore": 5,
                "Topaz Ore": 5,
                "Sapphire Ore": 5,

                "Black Diamond Ore": 2.2,
                "Star Ruby Ore": 2.2
            };
        case DURATION_32H: // 24 horas
            return {
                "Ambar Ore": 38,
                "Jade Ore": 38,
                "Pearl Ore": 38,
                "Turquoise Ore": 38,

                "Amethyst Ore": 7.5,
                "Diamond Ore": 7.5,
                "Opal Ore": 7.5,
                "Ruby Ore": 7.5,
                "Topaz Ore": 7.5,
                "Sapphire Ore": 7.5,

                "Black Diamond Ore": 3.3,
                "Star Ruby Ore": 3.3,

                "Nanodiamond Ore": 0.3,
                "Peridotos Ore": 0.3
            };
        default:
            return {};
    }
}

export function getCubesDistribution(duration) {
    // Distribución de Cubes según la duración de la misión
    switch (duration) {
        case DURATION_1H: // 45 minutos 2700
            return {
                "Iron Cube": 5,
                "Copper Cube": 5
            };
        case DURATION_2H: // 90 minutos
            return {
                "Iron Cube": 7.5,
                "Copper Cube": 7.5
            };
        case DURATION_4H: // 3 horas
            return {
                "Iron Cube": 11.3,
                "Copper Cube": 11.3
            };
        case DURATION_8H: // 6 horas
            return {
                "Iron Cube": 16.9,
                "Copper Cube": 16.9,

                "Earth Cube": 3.3,
                "Fire Cube": 3.3,
                "Ice Cube": 3.3

            };
        case DURATION_16H: // 12 horas
            return {
                "Iron Cube": 25.3,
                "Copper Cube": 25.3,

                "Earth Cube": 5,
                "Fire Cube": 5,
                "Ice Cube": 5,

                "Golden Cube": 2.2
            };
        case DURATION_32H: // 24 horas
            return {
                "Iron Cube": 38,
                "Copper Cube": 38,

                "Earth Cube": 7.5,
                "Fire Cube": 7.5,
                "Ice Cube": 7.5,

                "Golden Cube": 3.3,

                "Elemental Energy Cube": 0.3
            };
        default:
            return {};
    }

}

export function getCoinsDistribution(duration) {
    // Distribución de Coins según la duración de la misión
    switch (duration) {
        case DURATION_1H: // 45 minutos  2700
            return {
                value: 1
            };
        case DURATION_2H: // 90 minutos
            return {
                value: 2
            };
        case DURATION_4H: // 3 horas
            return {
                value: 4
            };
        case DURATION_8H: // 6 horas
            return {
                value: 8
            };
        case DURATION_16H: // 12 horas
            return {
                value: 16
            };
        case DURATION_32H: // 24 horas
            return {
                value: 32
            };
        default:
            return {
                value: 0
            };
    }

}

