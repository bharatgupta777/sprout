export interface FeelingEntry {
  name: string;
  emoji: string;
  prompt: string; // a relatable situation, spoken
}

// Emotional literacy — naming feelings is a core life skill for this age.
export const FEELINGS: FeelingEntry[] = [
  { name: "Happy", emoji: "😄", prompt: "You got a big hug. How do you feel?" },
  { name: "Sad", emoji: "😢", prompt: "Your ice cream fell down. How do you feel?" },
  { name: "Angry", emoji: "😠", prompt: "Someone took your toy. How do you feel?" },
  { name: "Scared", emoji: "😨", prompt: "You heard a loud thunder. How do you feel?" },
  { name: "Sleepy", emoji: "😴", prompt: "It is way past bedtime. How do you feel?" },
  { name: "Surprised", emoji: "😲", prompt: "A balloon went pop! How do you feel?" },
  { name: "Excited", emoji: "🤩", prompt: "It is your birthday party! How do you feel?" },
  { name: "Shy", emoji: "😊", prompt: "You meet a new friend. How do you feel?" },
  { name: "Proud", emoji: "🥹", prompt: "You finished a hard puzzle. How do you feel?" },
  { name: "Calm", emoji: "😌", prompt: "You took a deep, slow breath. How do you feel?" },
];
