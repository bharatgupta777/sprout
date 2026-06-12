export interface MannerOption {
  emoji: string;
  phrase: string; // spoken aloud when tapped
  good: boolean; // the kind / polite choice
}
export interface MannerScene {
  id: string;
  prompt: string; // the situation, spoken
  options: MannerOption[];
}

// Good manners through everyday situations. Every option is spoken when tapped,
// so a non-reader hears each choice and learns the kind one.
export const MANNERS: MannerScene[] = [
  {
    id: "gift",
    prompt: "Someone gives you a present. What do you say?",
    options: [
      { emoji: "🎁", phrase: "Thank you!", good: true },
      { emoji: "🏃", phrase: "You grab it and run away.", good: false },
      { emoji: "😶", phrase: "You say nothing.", good: false },
    ],
  },
  {
    id: "turn",
    prompt: "You want a toy your friend is playing with. What do you do?",
    options: [
      { emoji: "🙏", phrase: "May I please have a turn?", good: true },
      { emoji: "😠", phrase: "You snatch it away.", good: false },
      { emoji: "😭", phrase: "You cry and shout.", good: false },
    ],
  },
  {
    id: "bump",
    prompt: "Oops! You bumped into someone. What do you say?",
    options: [
      { emoji: "🙇", phrase: "Excuse me, I'm sorry!", good: true },
      { emoji: "😂", phrase: "You laugh and walk off.", good: false },
      { emoji: "🙄", phrase: "You ignore them.", good: false },
    ],
  },
  {
    id: "sad-friend",
    prompt: "Your friend is feeling sad. What do you do?",
    options: [
      { emoji: "🤗", phrase: "Are you okay? Here's a hug.", good: true },
      { emoji: "😝", phrase: "You tease them.", good: false },
      { emoji: "🚶", phrase: "You walk away.", good: false },
    ],
  },
  {
    id: "cleanup",
    prompt: "Play time is over and the toys are everywhere. What do you do?",
    options: [
      { emoji: "🧹", phrase: "Let's clean up together!", good: true },
      { emoji: "🧸", phrase: "You leave the big mess.", good: false },
    ],
  },
  {
    id: "listen",
    prompt: "A grown-up is talking. You have something to say. What do you do?",
    options: [
      { emoji: "✋", phrase: "You wait and say excuse me.", good: true },
      { emoji: "🗣️", phrase: "You interrupt loudly.", good: false },
    ],
  },
  {
    id: "sneeze",
    prompt: "You feel a big sneeze coming! What do you do?",
    options: [
      { emoji: "🤧", phrase: "You cover your mouth. Bless you!", good: true },
      { emoji: "💨", phrase: "You sneeze on your friend.", good: false },
    ],
  },
  {
    id: "hello",
    prompt: "You meet someone new. What do you say?",
    options: [
      { emoji: "👋", phrase: "Hello! Nice to meet you!", good: true },
      { emoji: "🙈", phrase: "You hide and frown.", good: false },
    ],
  },
  {
    id: "food",
    prompt: "Someone made you a yummy snack. What do you say?",
    options: [
      { emoji: "🍎", phrase: "Thank you for the snack!", good: true },
      { emoji: "🍝", phrase: "You throw the food.", good: false },
    ],
  },
  {
    id: "sorry",
    prompt: "You made a little mistake. What do you say?",
    options: [
      { emoji: "🥺", phrase: "I'm sorry. I'll try again.", good: true },
      { emoji: "👉", phrase: "You blame someone else.", good: false },
    ],
  },
];
