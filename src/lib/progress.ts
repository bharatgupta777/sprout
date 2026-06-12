// Progress + settings persistence. Local only — no accounts, no PII, no network.
// COPPA-friendly by construction.

export type AgeMode = "younger" | "older";

export interface Settings {
  narration: boolean;
  speechRate: number;
  reducedMotion: boolean;
  ageMode: AgeMode;
  childName: string;
  voicePref: string; // "auto" or a voice name
}

export interface ProgressState {
  stars: number;
  plays: Record<string, number>; // activityId -> times played
  lastPlayedDate: string; // YYYY-MM-DD
  streak: number;
  badges: string[];
  garden: string[]; // collected plant emojis — a no-pressure "growing" reward
  onboarded: boolean;
  settings: Settings;
}

const KEY = "sprout.v1";

const defaultState: ProgressState = {
  stars: 0,
  plays: {},
  lastPlayedDate: "",
  streak: 0,
  badges: [],
  garden: [],
  onboarded: false,
  settings: {
    narration: true,
    speechRate: 0.9,
    reducedMotion: false,
    ageMode: "younger",
    childName: "",
    voicePref: "auto",
  },
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return structuredClone(defaultState);
  }
}

export function saveState(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable; app still works in-memory */
  }
}

export function registerVisitStreak(state: ProgressState): ProgressState {
  const today = todayStr();
  if (state.lastPlayedDate === today) return state;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = state.lastPlayedDate === yesterday ? state.streak + 1 : 1;
  return { ...state, lastPlayedDate: today, streak };
}

const PLANTS = ["🌱", "🌿", "🌷", "🌸", "🌼", "🌻", "🌹", "🪻", "🌺", "🍀", "🌳", "🌴"];

export function awardStars(state: ProgressState, n: number, activityId?: string): ProgressState {
  const plays = { ...state.plays };
  const garden = [...state.garden];
  if (activityId) {
    plays[activityId] = (plays[activityId] ?? 0) + 1;
    // Completing an activity grows one new plant in the garden (no-pressure collecting).
    garden.push(PLANTS[Math.floor(Math.random() * PLANTS.length)]);
  }
  return { ...state, stars: state.stars + n, plays, garden };
}

export function setOnboarded(state: ProgressState): ProgressState {
  return { ...state, onboarded: true };
}

export function resetState(): ProgressState {
  const s = structuredClone(defaultState);
  saveState(s);
  return s;
}
