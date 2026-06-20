import type { ComponentType } from "react";
import { AbcPhonics } from "../activities/AbcPhonics";
import { PopPlay } from "../activities/PopPlay";
import { AnimalSafari } from "../activities/AnimalSafari";
import { AnimalBabyMatch } from "../activities/AnimalBabyMatch";
import { AnimalSoundMatch } from "../activities/AnimalSoundMatch";
import { CodePath } from "../activities/CodePath";
import { ColorIn } from "../activities/ColorIn";
import { ColorSorting } from "../activities/ColorSorting";
import { CountingCritters } from "../activities/CountingCritters";
import { CopyTheTune } from "../activities/CopyTheTune";
import { DrawPad } from "../activities/DrawPad";
import { Feelings } from "../activities/Feelings";
import { FirstWords } from "../activities/FirstWords";
import { FoodSort } from "../activities/FoodSort";
import { FunnyVoices } from "../activities/FunnyVoices";
import { GoodManners } from "../activities/GoodManners";
import { HealthyJunkFood } from "../activities/HealthyJunkFood";
import { HindiVocab } from "../activities/HindiVocab";
import { LetterHunt } from "../activities/LetterHunt";
import { LegoBlocks } from "../activities/LegoBlocks";
import { LifeCycle } from "../activities/LifeCycle";
import { MemoryMatch } from "../activities/MemoryMatch";
import { MusicMaker } from "../activities/MusicMaker";
import { NumberMatch } from "../activities/NumberMatch";
import { ObjectFinder } from "../activities/ObjectFinder";
import { Opposites } from "../activities/Opposites";
import { Patterns } from "../activities/Patterns";
import { Peekaboo } from "../activities/Peekaboo";
import { PretendHome } from "../activities/PretendHome";
import { RhymePairs } from "../activities/RhymePairs";
import { ShapesColors } from "../activities/ShapesColors";
import { SingAlong } from "../activities/SingAlong";
import { CommunityHelper } from "../activities/CommunityHelper";
import { SpotDifference } from "../activities/SpotDifference";
import { StickerScene } from "../activities/StickerScene";
import { StoryTime } from "../activities/StoryTime";
import { TicTacToe } from "../activities/TicTacToe";
import { TapTheMole } from "../activities/TapTheMole";
import { TransportMatch } from "../activities/TransportMatch";
import { FamilyTree } from "../activities/FamilyTree";
import { FestivalMatch } from "../activities/FestivalMatch";
import { FinishSound } from "../activities/FinishSound";
import { FamilyPhotoAlbum } from "../activities/FamilyPhotoAlbum";
import { FamilyVoiceAlbum } from "../activities/FamilyVoiceAlbum";
import { GestureImitation } from "../activities/GestureImitation";
import { RequestSnack } from "../activities/RequestSnack";
import { WordPop } from "../activities/WordPop";
import { EmotionMatch } from "../activities/EmotionMatch";
import { FamilyEditor } from "../activities/FamilyEditor";

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
  { id: "peekaboo", title: "Peekaboo", emoji: "🙈", subject: "Ages 1+", group: "Just for Tots", color: "c-pink", blurb: "Peekaboo surprises for the littlest learners.", Component: Peekaboo },
  { id: "object-finder", title: "Find the Object", emoji: "🔎", subject: "Explore", group: "Just for Tots", color: "c-sky", blurb: "Listen and tap the object hidden on the screen.", Component: ObjectFinder },

  { id: "abc-phonics", title: "ABC Sounds", emoji: "🔤", subject: "Reading", group: "Letters & Words", color: "c-purple", blurb: "Letter names, sounds, and a word for each — the foundation of reading.", Component: AbcPhonics },
  { id: "letter-hunt", title: "Letter Hunt", emoji: "🔎", subject: "Reading", group: "Letters & Words", color: "c-pink", blurb: "Listen and find the matching letter to build recognition.", Component: LetterHunt },
  { id: "first-words", title: "First Words", emoji: "💬", subject: "Vocabulary", group: "Letters & Words", color: "c-sky", blurb: "Explore hundreds of words by picture across 10 everyday categories.", Component: FirstWords },
  { id: "hindi-vocab", title: "Hindi Words", emoji: "🪔", subject: "Vocabulary", group: "Letters & Words", color: "c-sky", blurb: "Match Hindi and English words with fun pictures.", Component: HindiVocab },
  { id: "finish-sound", title: "Finish the Sound", emoji: "🔊", subject: "Phonics", group: "Letters & Words", color: "c-purple", blurb: "Hear the beginning and tap the right ending sound.", Component: FinishSound },
  { id: "word-pop", title: "Word Pop", emoji: "💥", subject: "Reading", group: "Letters & Words", color: "c-pink", blurb: "Pop the word bubbles that match the picture prompt.", Component: WordPop },

  { id: "counting-critters", title: "Count With Me", emoji: "🐤", subject: "Numbers", group: "Numbers & Logic", color: "c-sun", blurb: "Tap each critter and count out loud — one-to-one counting.", Component: CountingCritters },
  { id: "number-match", title: "How Many?", emoji: "🔢", subject: "Numbers", group: "Numbers & Logic", color: "c-teal", blurb: "Count a group and tap the matching number.", Component: NumberMatch },
  { id: "patterns", title: "What's Next?", emoji: "🔁", subject: "Logic", group: "Numbers & Logic", color: "c-purple", blurb: "Spot and continue patterns — early math reasoning.", Component: Patterns },
  { id: "code-path", title: "Code a Path", emoji: "🧭", subject: "Coding", group: "Numbers & Logic", color: "c-teal", blurb: "Sequence arrows to guide a friend home — early logic.", Component: CodePath },

  { id: "tic-tac-toe", title: "Tic Tac Toe", emoji: "⭕", subject: "Game", group: "Games", color: "c-teal", blurb: "Three in a row vs a friendly computer, or two players.", Component: TicTacToe },
  { id: "memory-match", title: "Memory Match", emoji: "🧠", subject: "Game", group: "Games", color: "c-pink", blurb: "Flip cards to find pairs — builds focus and memory.", Component: MemoryMatch },
  { id: "tap-the-mole", title: "Tap the Animals", emoji: "🐹", subject: "Game", group: "Games", color: "c-leaf", blurb: "Whack-a-mole fun — tap the critters before they hide.", Component: TapTheMole },
  { id: "copy-the-tune", title: "Copy the Tune", emoji: "🎶", subject: "Game", group: "Games", color: "c-purple", blurb: "Simon-style musical memory — listen and repeat.", Component: CopyTheTune },
  { id: "spot-difference", title: "Spot the Difference", emoji: "🔍", subject: "Observation", group: "Games", color: "c-sun", blurb: "Find the odd one out and tap the different picture.", Component: SpotDifference },

  { id: "shapes-colors", title: "Shapes & Colors", emoji: "🟦", subject: "Discover", group: "Discover the World", color: "c-sky", blurb: "Identify shapes and colors by listening.", Component: ShapesColors },
  { id: "color-sorting", title: "Color Sorting", emoji: "🌈", subject: "Colors", group: "Discover the World", color: "c-sky", blurb: "Match colors by name with friendly big buttons.", Component: ColorSorting },
  { id: "animal-safari", title: "Animal Safari", emoji: "🦁", subject: "Science", group: "Discover the World", color: "c-leaf", blurb: "Meet animals, hear their sounds, learn a fun fact.", Component: AnimalSafari },
  { id: "animal-baby-match", title: "Baby Animal Match", emoji: "🍼", subject: "Science", group: "Discover the World", color: "c-leaf", blurb: "Match baby animals to their parents.", Component: AnimalBabyMatch },
  { id: "animal-sound-match", title: "Animal Sound Match", emoji: "🔊", subject: "Science", group: "Discover the World", color: "c-leaf", blurb: "Listen to an animal sound and tap the right animal.", Component: AnimalSoundMatch },
  { id: "food-sort", title: "Food Sort", emoji: "🥗", subject: "Health", group: "Discover the World", color: "c-sun", blurb: "Pick the healthy food or the treat.", Component: FoodSort },
  { id: "healthy-junk-food", title: "Healthy vs Junk Food", emoji: "🍎", subject: "Health", group: "Discover the World", color: "c-sun", blurb: "Learn which foods are healthy and which are treats.", Component: HealthyJunkFood },
  { id: "transport-match", title: "Means of Transport", emoji: "🚗", subject: "Vehicles", group: "Discover the World", color: "c-teal", blurb: "Tap the vehicle that matches the prompt.", Component: TransportMatch },
  { id: "opposites", title: "Opposites", emoji: "↔️", subject: "Concepts", group: "Discover the World", color: "c-sun", blurb: "Big/small, hot/cold and more — concept words.", Component: Opposites },
  { id: "community-helper", title: "Community Helpers", emoji: "👩‍🚒", subject: "People", group: "Discover the World", color: "c-leaf", blurb: "Meet helpers from your neighborhood and what they do.", Component: CommunityHelper },
  { id: "festival-match", title: "Festival Match", emoji: "🎉", subject: "Culture", group: "Discover the World", color: "c-coral", blurb: "Recognize festivals and their symbols.", Component: FestivalMatch },
  { id: "life-cycle", title: "Life Cycles", emoji: "🐛", subject: "Science", group: "Discover the World", color: "c-leaf", blurb: "See how living things grow and change.", Component: LifeCycle },

  { id: "story-time", title: "Story Time", emoji: "📖", subject: "Reading", group: "Stories & Songs", color: "c-coral", blurb: "Narrated stories with gentle lessons.", Component: StoryTime },
  { id: "sing-along", title: "Sing Along", emoji: "🎵", subject: "Music", group: "Stories & Songs", color: "c-sun", blurb: "Classic rhymes with highlighting.", Component: SingAlong },
  { id: "rhyme-pairs", title: "Rhyming Pairs", emoji: "🎤", subject: "Reading", group: "Letters & Words", color: "c-purple", blurb: "Tap the word that rhymes with the prompt.", Component: RhymePairs },
  { id: "music-maker", title: "Music Maker", emoji: "🎹", subject: "Music", group: "Stories & Songs", color: "c-teal", blurb: "A rainbow xylophone — free play or play a song.", Component: MusicMaker },

  { id: "feelings", title: "Feelings", emoji: "😊", subject: "Life Skills", group: "Feelings & Me", color: "c-pink", blurb: "Name emotions from everyday situations.", Component: Feelings },
  { id: "emotion-match", title: "Emotion Match", emoji: "😄", subject: "Feelings", group: "Feelings & Me", color: "c-sun", blurb: "Choose the face that shows the emotion described.", Component: EmotionMatch },
  { id: "gesture-imitation", title: "Mirror Moves", emoji: "🖐️", subject: "Body Awareness", group: "Feelings & Me", color: "c-leaf", blurb: "Watch and copy simple gestures in this active game.", Component: GestureImitation },
  { id: "good-manners", title: "Good Manners", emoji: "💛", subject: "Kindness", group: "Feelings & Me", color: "c-sun", blurb: "Magic words and kind choices for everyday moments.", Component: GoodManners },

  { id: "color-in", title: "Color In", emoji: "🖍️", subject: "Create", group: "Create", color: "c-coral", blurb: "A tap-to-fill coloring book with 6 pictures.", Component: ColorIn },
  { id: "lego-blocks", title: "Lego Blocks", emoji: "🧱", subject: "Logic", group: "Numbers & Logic", color: "c-pink", blurb: "Finish the block pattern by picking the missing brick.", Component: LegoBlocks },
  { id: "sticker-scene", title: "Sticker Scene", emoji: "🖼️", subject: "Create", group: "Create", color: "c-leaf", blurb: "Build a picture by placing stickers on a scene.", Component: StickerScene },
  { id: "family-photo-album", title: "Family Photos", emoji: "📸", subject: "Family", group: "Family & Home", color: "c-sky", blurb: "Look at photos of your family and hear their names.", Component: FamilyPhotoAlbum },
  { id: "family-voice-album", title: "Family Voices", emoji: "🎧", subject: "Family", group: "Family & Home", color: "c-pink", blurb: "Hear recorded messages from people you love.", Component: FamilyVoiceAlbum },
  { id: "family-tree", title: "Family Match", emoji: "👪", subject: "Family", group: "Family & Home", color: "c-leaf", blurb: "Learn who is who in your family.", Component: FamilyTree },
  { id: "family-editor", title: "Family Editor", emoji: "🛠️", subject: "Family", group: "Family & Home", color: "c-coral", blurb: "Edit family names, roles, photos, and vocabulary.", Component: FamilyEditor },
  { id: "pretend-home", title: "Pretend Home", emoji: "🏠", subject: "Role Play", group: "Family & Home", color: "c-sky", blurb: "Play house, do chores, and learn routines through pretend play.", Component: PretendHome },
  { id: "request-snack", title: "Request a Snack", emoji: "🍪", subject: "Life Skills", group: "Family & Home", color: "c-sun", blurb: "Ask politely for a snack and learn chance-taking.", Component: RequestSnack },

  { id: "funny-voices", title: "Funny Voices", emoji: "🎤", subject: "Create", group: "Create", color: "c-sky", blurb: "Record your voice and hear it as a chipmunk, monster, or bee!", Component: FunnyVoices },
  { id: "draw-pad", title: "Draw & Paint", emoji: "🎨", subject: "Create", group: "Create", color: "c-purple", blurb: "Finger-paint with colors, brushes, and emoji stamps.", Component: DrawPad },
];

export const GROUP_ORDER = [
  "Just for Tots",
  "Letters & Words",
  "Numbers & Logic",
  "Games",
  "Discover the World",
  "Stories & Songs",
  "Feelings & Me",
  "Family & Home",
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
