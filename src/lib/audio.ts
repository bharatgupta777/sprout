// Audio narration engine built on the Web Speech API.
// Audio-first is the core of the product: a non-reading child must be able to
// play entirely by listening. We pick the friendliest available voice, speak
// slowly and clearly, and never let two prompts talk over each other.

type VoicePref = "auto" | string;

class AudioManager {
  private synth: SpeechSynthesis | null =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  private voices: SpeechSynthesisVoice[] = [];
  private chosen: SpeechSynthesisVoice | null = null;
  private pref: VoicePref = "auto";
  private enabled = true;
  private rate = 0.9; // a touch slower than default for toddlers
  private toneCtx: AudioContext | null = null;

  constructor() {
    if (this.synth) {
      this.loadVoices();
      this.synth.addEventListener?.("voiceschanged", () => this.loadVoices());
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.chosen = this.pickVoice();
  }

  /** Score a voice for warmth + quality. Higher = more human/natural. */
  private rankVoice(v: SpeechSynthesisVoice): number {
    const n = v.name.toLowerCase();
    let score = 0;
    // Network/neural voices are dramatically more natural than local robotic ones.
    if (v.localService === false) score += 40;
    if (/(neural|natural|premium|enhanced|online|wavenet|journey)/.test(n)) score += 35;
    if (n.includes("google")) score += 25;
    if (/microsoft/.test(n) && /(aria|jenny|guy|sonia|libby|natasha|clara)/.test(n)) score += 25;
    // Apple's nicer voices (and premium/Siri variants).
    if (/(samantha|siri|ava|allison|serena|moira|tessa|karen|kate|zoe|nicky)/.test(n)) score += 18;
    if (/siri/.test(n)) score += 12;
    // Lean slightly warmer/female-presenting for a friendly storyteller feel.
    if (/(female|aria|jenny|samantha|ava|sonia|libby|zoe)/.test(n)) score += 6;
    // Penalize obviously robotic/compact/eloquence voices.
    if (/(compact|eloquence|fred|albert|zarvox|trinoids|cellos|bells|organ|whisper|bad|boing|junior|ralph|kathy|robot|google india|deka|alex)/.test(n))
      score -= 12;
    // Prefer en-US/en-GB.
    if (/^en-(us|gb)/i.test(v.lang)) score += 5;
    return score;
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) return null;
    const en = this.voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
    const pool = en.length ? en : this.voices;
    if (this.pref !== "auto") {
      const match = pool.find((v) => v.name === this.pref);
      if (match) return match;
    }
    return pool.slice().sort((a, b) => this.rankVoice(b) - this.rankVoice(a))[0] ?? null;
  }

  /** English voices, best/most-natural first, each tagged as premium or standard. */
  listVoices(): { voice: SpeechSynthesisVoice; premium: boolean }[] {
    return this.voices
      .filter((v) => v.lang?.toLowerCase().startsWith("en"))
      .slice()
      .sort((a, b) => this.rankVoice(b) - this.rankVoice(a))
      .map((voice) => ({ voice, premium: this.rankVoice(voice) >= 30 }));
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) this.stop();
  }
  isEnabled() {
    return this.enabled;
  }
  setRate(r: number) {
    this.rate = Math.min(1.2, Math.max(0.6, r));
  }
  getRate() {
    return this.rate;
  }
  setVoicePref(pref: VoicePref) {
    this.pref = pref;
    this.chosen = this.pickVoice();
  }
  getVoicePref() {
    return this.pref;
  }

  stop() {
    try {
      this.synth?.cancel();
    } catch {
      /* no-op */
    }
  }

  private keepAlive: number | null = null;

  /** Tidy text so the voice phrases it naturally (gentle intonation + pauses). */
  private humanize(text: string): string {
    let t = text.trim().replace(/\s+/g, " ");
    // End on punctuation so most engines add a natural falling/ rising intonation.
    if (!/[.!?…]$/.test(t)) t += ".";
    return t;
  }

  /** Speak text. Cancels any in-progress speech so prompts never overlap. */
  speak(
    text: string,
    opts?: { rate?: number; pitch?: number; expressive?: boolean; onEnd?: () => void },
  ) {
    if (!this.enabled || !this.synth || !text) {
      opts?.onEnd?.();
      return;
    }
    this.stop();
    const u = new SpeechSynthesisUtterance(this.humanize(text));
    if (this.chosen) u.voice = this.chosen;
    // Expressive lines (praise) get a touch more lift + bounce; storyteller warmth otherwise.
    const jitter = opts?.expressive ? (Math.random() - 0.5) * 0.12 : 0;
    u.rate = (opts?.rate ?? this.rate) + (opts?.expressive ? 0.04 : 0);
    u.pitch = (opts?.pitch ?? 1.12) + jitter;
    u.lang = this.chosen?.lang ?? "en-US";
    u.onend = () => {
      this.stopKeepAlive();
      opts?.onEnd?.();
    };
    u.onerror = () => this.stopKeepAlive();
    // Some browsers (Chrome) pause synthesis mid-sentence; a soft heartbeat guards it.
    try {
      this.synth.resume();
      this.synth.speak(u);
      this.startKeepAlive();
    } catch {
      opts?.onEnd?.();
    }
  }

  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAlive = window.setInterval(() => {
      if (this.synth?.speaking) this.synth.resume();
      else this.stopKeepAlive();
    }, 5000);
  }
  private stopKeepAlive() {
    if (this.keepAlive !== null) {
      clearInterval(this.keepAlive);
      this.keepAlive = null;
    }
  }

  /** Speak a queue of phrases with pauses between (great for "B... buh... Bear"). */
  speakSequence(parts: string[], gapMs = 350) {
    if (!this.enabled || parts.length === 0) return;
    let i = 0;
    const next = () => {
      if (i >= parts.length) return;
      const part = parts[i++];
      this.speak(part, { onEnd: () => setTimeout(next, gapMs) });
    };
    next();
  }

  // --- Lightweight earcons (success / oops) via WebAudio, no asset files. ---
  private ctx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.toneCtx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (AC) this.toneCtx = new AC();
    }
    return this.toneCtx;
  }

  private tone(freq: number, start: number, dur: number, gain = 0.12) {
    const ctx = this.ctx();
    if (!ctx || !this.enabled) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime + start);
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.02);
  }

  chimeSuccess() {
    this.tone(523.25, 0, 0.18); // C5
    this.tone(659.25, 0.12, 0.18); // E5
    this.tone(783.99, 0.24, 0.3); // G5
  }
  chimeOops() {
    this.tone(311.13, 0, 0.16, 0.08); // soft, non-punishing
    this.tone(277.18, 0.12, 0.22, 0.08);
  }
  chimeTap() {
    this.tone(880, 0, 0.07, 0.05);
  }

  /** Play a single musical note (used by the Music Maker). Works even if
   *  narration is muted, since it's the whole point of that activity. */
  playNote(freq: number, durSec = 0.6) {
    const ctx = this.ctx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durSec);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durSec + 0.02);
  }
}

export const audio = new AudioManager();
