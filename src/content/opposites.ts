export interface OppositeEntry {
  word: string;
  emoji: string;
  opposite: string;
  oppositeEmoji: string;
}

// Concept pairs — language + early reasoning.
export const OPPOSITES: OppositeEntry[] = [
  { word: "Big", emoji: "🐘", opposite: "Small", oppositeEmoji: "🐜" },
  { word: "Hot", emoji: "🔥", opposite: "Cold", oppositeEmoji: "❄️" },
  { word: "Happy", emoji: "😄", opposite: "Sad", oppositeEmoji: "😢" },
  { word: "Up", emoji: "⬆️", opposite: "Down", oppositeEmoji: "⬇️" },
  { word: "Day", emoji: "☀️", opposite: "Night", oppositeEmoji: "🌙" },
  { word: "Fast", emoji: "🐇", opposite: "Slow", oppositeEmoji: "🐢" },
  { word: "Open", emoji: "📂", opposite: "Closed", oppositeEmoji: "📁" },
  { word: "Full", emoji: "🍯", opposite: "Empty", oppositeEmoji: "🫙" },
  { word: "Wet", emoji: "💧", opposite: "Dry", oppositeEmoji: "🏜️" },
  { word: "Loud", emoji: "📢", opposite: "Quiet", oppositeEmoji: "🤫" },
  { word: "Tall", emoji: "🦒", opposite: "Short", oppositeEmoji: "🐁" },
  { word: "Clean", emoji: "🧼", opposite: "Dirty", oppositeEmoji: "🧥" },
];
