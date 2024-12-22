export const conf = {
  Rock: {
    Scissors: "crushes",
    Lizard: "crushes",
  },
  Paper: {
    Rock: "covers",
    Spock: "disproves",
  },
  Scissors: {
    Paper: "cuts",
    Lizard: "decapitates",
  },
  Spock: {
    Rock: "vaporizes",
    Scissors: "smashes",
  },
  Lizard: {
    Paper: "eats",
    Spock: "poisons",
  },
} as const;
