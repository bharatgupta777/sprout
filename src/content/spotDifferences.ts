export interface SpotDifferenceEntry {
  prompt: string;
  pattern: string[];
  caption: string;
  options: { label: string; emoji: string }[];
  answer: string;
}

export const SPOT_DIFFERENCES: SpotDifferenceEntry[] = [
  {
    prompt: "Spot the different one.",
    pattern: ["🍎", "🍎", "🍎", "🍌"],
    caption: "Which one is different?",
    options: [
      { label: "Apple", emoji: "🍎" },
      { label: "Banana", emoji: "🍌" },
      { label: "Orange", emoji: "🍊" },
      { label: "Grapes", emoji: "🍇" },
    ],
    answer: "Banana",
  },
  {
    prompt: "Find the odd one out.",
    pattern: ["🐶", "🐶", "🐶", "🐱"],
    caption: "Tap the animal that is different.",
    options: [
      { label: "Dog", emoji: "🐶" },
      { label: "Cat", emoji: "🐱" },
      { label: "Lion", emoji: "🦁" },
      { label: "Rabbit", emoji: "🐰" },
    ],
    answer: "Cat",
  },
  {
    prompt: "Which one is different?",
    pattern: ["☀️", "☀️", "☀️", "🌙"],
    caption: "Tap the item that does not match.",
    options: [
      { label: "Sun", emoji: "☀️" },
      { label: "Moon", emoji: "🌙" },
      { label: "Star", emoji: "⭐" },
      { label: "Cloud", emoji: "☁️" },
    ],
    answer: "Moon",
  },
  {
    prompt: "Pick the one that is not the same.",
    pattern: ["🍦", "🍦", "🍦", "🍕"],
    caption: "Find the odd food out.",
    options: [
      { label: "Ice Cream", emoji: "🍦" },
      { label: "Pizza", emoji: "🍕" },
      { label: "Cake", emoji: "🍰" },
      { label: "Cookie", emoji: "🍪" },
    ],
    answer: "Pizza",
  },
];
