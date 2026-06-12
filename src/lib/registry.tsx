import type { ComponentType } from "react";
import { AbcPhonics } from "../activities/AbcPhonics";
import { AnimalSafari } from "../activities/AnimalSafari";
import { CodePath } from "../activities/CodePath";
import { ColorIn } from "../activities/ColorIn";
import { CountingCritters } from "../activities/CountingCritters";
import { DrawPad } from "../activities/DrawPad";
import { Feelings } from "../activities/Feelings";
import { FirstWords } from "../activities/FirstWords";
import { FunnyVoices } from "../activities/FunnyVoices";
import { GoodManners } from "../activities/GoodManners";
import { LetterHunt } from "../activities/LetterHunt";
import { MemoryMatch } from "../activities/MemoryMatch";
import { MusicMaker } from "../activities/MusicMaker";
import { NumberMatch } from "../activities/NumberMatch";
import { Opposites } from "../activities/Opposites";
import { Patterns } from "../activities/Patterns";
import { PopPlay } from "../activities/PopPlay";
import { ShapesColors } from "../activities/ShapesColors";
import { SingAlong } from "../activities/SingAlong";
import { StickerScene } from "../activities/StickerScene";
import { StoryTime } from "../activities/StoryTime";
import { TicTacToe } from "../activities/TicTacToe";
import { TapTheMole } from "../activities/TapTheMole";
import { CopyTheTune } from "../activities/CopyTheTune";

export interface ActivityMeta {
  id: string;
  title: string;
  emoji: string;
  subject: string;
  group: string; // home-screen section
  color: string; // tile accent class
  blurb: string; // for the parent guide
  Component: ComponentType<{ onBack: () => void }>;
}

// Order also defines the order within each group on the home screen.
export const ACTIVITIES: ActivityMeta[] = [
  { id: "pop-play", title: "Pop & Play", emoji: "🫧", subject: "Ages 2+", group: "Just for Tots", color: "c-pink", blurb: "Tap anything and something delightful happens — pure cause-and-effect for toddlers.", Component: PopPlay },

  { id: "abc-phonics", title: "ABC Sounds", emoji: "🔤", subject: "Reading", group: "Letters & Words", color: "c-purple", blurb: "Letter names, sounds, and a word for each — the foundation of reading.", Component: AbcPhonics },
  { id: "letter-hunt", title: "Letter Hunt", emoji: "🔎", subject: "Reading", group: "Letters & Words", color: "c-pink", blurb: "Listen and find the matching letter to build recognition.", Component: LetterHunt },
  { id: "first-words", title: "First Words", emoji: "💬", subject: "Vocabulary", group: "Letters & Words", color: "c-sky", blurb: "Explore hundreds of words by picture across 10 everyday categories.", Component: FirstWords },

  { id: "counting-critters", title: "Count With Me", emoji: "🐤", subject: "Numbers", group: "Numbers & Logic", color: "c-sun", blurb: "Tap each critter and count out loud — one-to-one counting.", Component: CountingCritters },
  { id: "number-match", title: "How Many?", emoji: "🔢", subject: "Numbers", group: "Numbers & Logic", color: "c-teal", blurb: "Count a group and tap the matching number.", Component: NumberMatch },
  { id: "patterns", title: "What's Next?", emoji: "🔁", subject: "Logic", group: "Numbers & Logic", color: "c-purple", blurb: "Spot and continue patterns — early math reasoning.", Component: Patterns },
  { id: "code-path", title: "Code a Path", emoji: "🧭", subject: "Coding", group: "Numbers & Logic", color: "c-teal", blurb: "Sequence arrows to guide a friend home — early logic.", Component: CodePath },

  { id: "tic-tac-toe", title: "Tic Tac Toe", emoji: "⭕", subject: "Game", group: "Games", color: "c-teal", blurb: "Three in a row vs a friendly computer, or two players.", Component: TicTacToe },
  { id: "memory-match", title: "Memory Match", emoji: "🧠", subject: "Game", group: "Games", color: "c-pink", blurb: "Flip cards to find pairs — builds focus and memory.", Component: MemoryMatch },
  { id: "tap-the-mole", title: "Tap the Animals", emoji: "🐹", subject: "Game", group: "Games", color: "c-leaf", blurb: "Whack-a-mole fun — tap the critters before they hide.", Component: TapTheMole },
  { id: "copy-the-tune", title: "Copy the Tune", emoji: "🎶", subject: "Game", group: "Games", color: "c-purple", blurb: "Simon-style musical memory — listen and repeat.", Component: CopyTheTune },

  { id: "shapes-colors", title: "Shapes & Colors", emoji: "🟦", subject: "Discover", group: "Discover the World", color: "c-sky", blurb: "Identify shapes and colors by listening.", Component: ShapesColors },
  { id: "animal-safari", title: "Animal Safari", emoji: "🦁", subject: "Science", group: "Discover the World", color: "c-leaf", blurb: "Meet animals, hear their sounds, learn a fun fact.", Component: AnimalSafari },
  { id: "opposites", title: "Opposites", emoji: "↔️", subject: "Concepts", group: "Discover the World", color: "c-sun", blurb: "Big/small, hot/cold and more — concept words.", Component: Opposites },

  { id: "story-time", title: "Story Time", emoji: "📖", subject: "Reading", group: "Stories & Songs", color: "c-coral", blurb: "16 narrated stories, each with a kind lesson.", Component: StoryTime },
  { id: "sing-along", title: "Sing Along", emoji: "🎵", subject: "Music", group: "Stories & Songs", color: "c-sun", blurb: "16 classic nursery rhymes with line-by-line highlighting.", Component: SingAlong },
  { id: "music-maker", title: "Music Maker", emoji: "🎹", subject: "Music", group: "Stories & Songs", color: "c-teal", blurb: "A rainbow xylophone — free play or play a song.", Component: MusicMaker },

  { id: "feelings", title: "Feelings", emoji: "😊", subject: "Life Skills", group: "Feelings & Me", color: "c-pink", blurb: "Name emotions from everyday situations.", Component: Feelings },
  { id: "good-manners", title: "Good Manners", emoji: "💛", subject: "Kindness", group: "Feelings & Me", color: "c-sun", blurb: "Magic words and kind choices for everyday moments.", Component: GoodManners },

  { id: "color-in", title: "Color In", emoji: "🖍️", subject: "Create", group: "Create", color: "c-coral", blurb: "A tap-to-fill coloring book with 6 pictures.", Component: ColorIn },
  { id: "draw-pad", title: "Draw & Paint", emoji: "🎨", subject: "Create", group: "Create", color: "c-purple", blurb: "Finger-paint with colors, brushes, and emoji stamps.", Component: DrawPad },
  { id: "sticker-scene", title: "Sticker Scene", emoji: "🖼️", subject: "Create", group: "Create", color: "c-leaf", blurb: "Build a picture by placing stickers on a scene.", Component: StickerScene },
  { id: "funny-voices", title: "Funny Voices", emoji: "🎤", subject: "Create", group: "Create", color: "c-sky", blurb: "Record your voice and hear it as a chipmunk, monster, or bee!", Component: FunnyVoices },
];

export const GROUP_ORDER = [
  "Just for Tots",
  "Letters & Words",
  "Numbers & Logic",
  "Games",
  "Discover the World",
  "Stories & Songs",
  "Feelings & Me",
  "Create",
];

export function activitiesByGroup(): { group: string; items: ActivityMeta[] }[] {
  return GROUP_ORDER.map((group) => ({
    group,
    items: ACTIVITIES.filter((a) => a.group === group),
  })).filter((g) => g.items.length > 0);
}

export function getActivity(id: string): ActivityMeta | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}
