import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { audio } from "../lib/audio";
import {
  awardStars as awardStarsFn,
  loadState,
  registerVisitStreak,
  resetState,
  saveState,
  setOnboarded,
  type AgeMode,
  type ProgressState,
  type Settings,
  type FamilyData,
} from "../lib/progress";

interface AppContextValue {
  state: ProgressState;
  settings: Settings;
  ageMode: AgeMode;
  familyData: FamilyData;
  speak: (
    text: string,
    opts?: { rate?: number; pitch?: number; expressive?: boolean; onEnd?: () => void },
  ) => void;
  speakSequence: (parts: string[], gapMs?: number) => void;
  stopSpeech: () => void;
  cheer: (text?: string) => void;
  oops: (text?: string) => void;
  tap: () => void;
  award: (n: number, activityId?: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  updateFamilyData: (familyData: FamilyData) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const CHEERS = [
  "Hooray! You did it!",
  "Wonderful work!",
  "Great job, my friend!",
  "You're a superstar!",
  "Amazing!",
  "Yes! Well done!",
  "Brilliant!",
  "Wow, you are so clever!",
  "Fantastic!",
  "You got it! High five!",
  "Woohoo! That's right!",
  "Beautiful! I'm so proud of you!",
  "Yippee! You're learning so much!",
  "Super duper!",
];
const NUDGES = [
  "Try again, you can do it!",
  "Almost! Give it one more try.",
  "Oops! Let's try that again.",
  "So close! Have another go.",
  "Not yet, but keep trying!",
  "Good try! Try once more.",
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadState());
  const stateRef = useRef(state);
  stateRef.current = state;

  // Apply settings to the audio engine + count today's visit once on mount.
  useEffect(() => {
    audio.setEnabled(state.settings.narration);
    audio.setRate(state.settings.speechRate);
    audio.setVoicePref(state.settings.voicePref);
    setState((s) => {
      const next = registerVisitStreak(s);
      saveState(next);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: ProgressState) => {
    saveState(next);
    setState(next);
  };

  const speak: AppContextValue["speak"] = (text, opts) => audio.speak(text, opts);
  const speakSequence: AppContextValue["speakSequence"] = (parts, gap) =>
    audio.speakSequence(parts, gap);
  const stopSpeech = () => audio.stop();

  const cheer: AppContextValue["cheer"] = (text) => {
    audio.chimeSuccess();
    const phrase = text ?? CHEERS[Math.floor(Math.random() * CHEERS.length)];
    setTimeout(() => audio.speak(phrase, { pitch: 1.22, expressive: true }), 180);
  };

  const oops: AppContextValue["oops"] = (text) => {
    audio.chimeOops();
    const phrase = text ?? NUDGES[Math.floor(Math.random() * NUDGES.length)];
    setTimeout(() => audio.speak(phrase, { pitch: 1.08 }), 120);
  };

  const tap = () => audio.chimeTap();

  const award: AppContextValue["award"] = (n, activityId) => {
    persist(awardStarsFn(stateRef.current, n, activityId));
  };

  const updateSettings: AppContextValue["updateSettings"] = (patch) => {
    const settings = { ...stateRef.current.settings, ...patch };
    audio.setEnabled(settings.narration);
    audio.setRate(settings.speechRate);
    audio.setVoicePref(settings.voicePref);
    persist({ ...stateRef.current, settings });
  };

  const updateFamilyData: AppContextValue["updateFamilyData"] = (familyData) => {
    persist({ ...stateRef.current, familyData });
  };

  const completeOnboarding = () => persist(setOnboarded(stateRef.current));

  const reset = () => setState(resetState());

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      settings: state.settings,
      ageMode: state.settings.ageMode,
      familyData: state.familyData,
      speak,
      speakSequence,
      stopSpeech,
      cheer,
      oops,
      tap,
      award,
      updateSettings,
      updateFamilyData,
      completeOnboarding,
      reset,
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
