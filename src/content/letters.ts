export interface LetterEntry {
  letter: string;
  /** how the letter NAME is said, used for clarity */
  name: string;
  /** the letter SOUND (phoneme) spelled for the speech engine, e.g. "buh" */
  sound: string;
  word: string;
  emoji: string;
}

// Full alphabet. Each letter teaches NAME + SOUND + an example word with art.
// Sounds are spelled to coax a clear phoneme from text-to-speech voices.
export const LETTERS: LetterEntry[] = [
  { letter: "A", name: "A", sound: "ah", word: "Apple", emoji: "🍎" },
  { letter: "B", name: "B", sound: "buh", word: "Ball", emoji: "⚽" },
  { letter: "C", name: "C", sound: "kuh", word: "Cat", emoji: "🐱" },
  { letter: "D", name: "D", sound: "duh", word: "Dog", emoji: "🐶" },
  { letter: "E", name: "E", sound: "eh", word: "Egg", emoji: "🥚" },
  { letter: "F", name: "F", sound: "fuh", word: "Fish", emoji: "🐟" },
  { letter: "G", name: "G", sound: "guh", word: "Goat", emoji: "🐐" },
  { letter: "H", name: "H", sound: "huh", word: "Hat", emoji: "👒" },
  { letter: "I", name: "I", sound: "ih", word: "Igloo", emoji: "🛖" },
  { letter: "J", name: "J", sound: "juh", word: "Juice", emoji: "🧃" },
  { letter: "K", name: "K", sound: "kuh", word: "Kite", emoji: "🪁" },
  { letter: "L", name: "L", sound: "luh", word: "Lion", emoji: "🦁" },
  { letter: "M", name: "M", sound: "mmm", word: "Moon", emoji: "🌙" },
  { letter: "N", name: "N", sound: "nnn", word: "Nest", emoji: "🪺" },
  { letter: "O", name: "O", sound: "ah", word: "Orange", emoji: "🍊" },
  { letter: "P", name: "P", sound: "puh", word: "Pig", emoji: "🐷" },
  { letter: "Q", name: "Q", sound: "kwuh", word: "Queen", emoji: "👑" },
  { letter: "R", name: "R", sound: "rrr", word: "Rabbit", emoji: "🐰" },
  { letter: "S", name: "S", sound: "sss", word: "Sun", emoji: "☀️" },
  { letter: "T", name: "T", sound: "tuh", word: "Tree", emoji: "🌳" },
  { letter: "U", name: "U", sound: "uh", word: "Umbrella", emoji: "☂️" },
  { letter: "V", name: "V", sound: "vuh", word: "Van", emoji: "🚐" },
  { letter: "W", name: "W", sound: "wuh", word: "Whale", emoji: "🐳" },
  { letter: "X", name: "X", sound: "ks", word: "Fox", emoji: "🦊" },
  { letter: "Y", name: "Y", sound: "yuh", word: "Yo-yo", emoji: "🪀" },
  { letter: "Z", name: "Z", sound: "zzz", word: "Zebra", emoji: "🦓" },
];

export function letterPhrase(e: LetterEntry): string {
  return `${e.name}. ${e.sound}. ${e.word}.`;
}
