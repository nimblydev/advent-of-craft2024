export type EmojiChoice = "📄" | "🪨" | "✂️" | "🖖" | "🦎";

export class Choice {
  static readonly Paper = new Choice("📄", "paper");
  static readonly Rock = new Choice("🪨", "rock");
  static readonly Scissors = new Choice("✂️", "scissors");
  static readonly Spock = new Choice("🖖", "Spock");
  static readonly Lizard = new Choice("🦎", "lizard");

  private static readonly fomEmojiMap = {
    "📄": Choice.Paper,
    "🪨": Choice.Rock,
    "✂️": Choice.Scissors,
    "🖖": Choice.Spock,
    "🦎": Choice.Lizard,
  };

  static fromEmoji(emoji: EmojiChoice): Choice {
    return Choice.fomEmojiMap[emoji];
  }

  constructor(
    private readonly _emojiChoice: EmojiChoice,
    private readonly _name: string
  ) {}

  get emoji() {
    return this._emojiChoice;
  }

  get name() {
    return this._name;
  }
}
