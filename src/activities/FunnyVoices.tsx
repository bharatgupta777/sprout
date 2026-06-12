import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

type Status = "idle" | "recording" | "ready" | "denied" | "unsupported";

const EFFECTS = [
  { id: "normal", label: "Me", emoji: "🙂", rate: 1.0 },
  { id: "chipmunk", label: "Chipmunk", emoji: "🐿️", rate: 1.8 },
  { id: "mouse", label: "Mouse", emoji: "🐭", rate: 3.0 },
  { id: "bee", label: "Tiny Bee", emoji: "🐝", rate: 2.4 },
  { id: "robot", label: "Wobble", emoji: "🤖", rate: 1.35 },
  { id: "sleepy", label: "Sleepy", emoji: "😴", rate: 0.78 },
  { id: "monster", label: "Monster", emoji: "👹", rate: 0.6 },
  { id: "giant", label: "Giant", emoji: "🦖", rate: 0.45 },
  { id: "whale", label: "Whale", emoji: "🐋", rate: 0.35 },
];

export function FunnyVoices({ onBack }: { onBack: () => void }) {
  const { speak, tap, award, stopSpeech } = useApp();
  const [status, setStatus] = useState<Status>("idle");
  const [hasClip, setHasClip] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const urlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rewarded = useRef(false);

  useEffect(() => {
    const supported =
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof MediaRecorder !== "undefined";
    if (!supported) setStatus("unsupported");
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const startRec = async () => {
    stopSpeech();
    tap();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = URL.createObjectURL(blob);
        setHasClip(true);
        setStatus("ready");
        streamRef.current?.getTracks().forEach((t) => t.stop());
        if (!rewarded.current) {
          rewarded.current = true;
          award(2, "funny-voices");
        }
      };
      recRef.current = rec;
      rec.start();
      setStatus("recording");
    } catch {
      setStatus("denied");
    }
  };

  const stopRec = () => {
    tap();
    recRef.current?.state === "recording" && recRef.current.stop();
  };

  const play = (rate: number) => {
    if (!urlRef.current) return;
    tap();
    audioRef.current?.pause();
    const a = new Audio(urlRef.current);
    a.playbackRate = rate;
    // Let playbackRate change the pitch too (that's what makes it funny).
    (a as unknown as { preservesPitch: boolean }).preservesPitch = false;
    (a as unknown as { mozPreservesPitch: boolean }).mozPreservesPitch = false;
    (a as unknown as { webkitPreservesPitch: boolean }).webkitPreservesPitch = false;
    audioRef.current = a;
    a.play().catch(() => {});
  };

  return (
    <ActivityShell
      onBack={() => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        audioRef.current?.pause();
        onBack();
      }}
      prompt={<>Funny Voices! 🎤</>}
      caption="Record yourself, then hear silly voices!"
      onReplay={() => speak("Press the microphone and say something fun!")}
    >
      {status === "unsupported" && (
        <div className="story-card">
          <div className="story-art">🎤</div>
          <div className="story-text">This device can't record sound, but you can still play everything else!</div>
        </div>
      )}

      {status === "denied" && (
        <div className="story-card">
          <div className="story-art">🔒🎤</div>
          <div className="story-text">Ask a grown-up to allow the microphone, then try again.</div>
          <button className="btn btn-teal" style={{ marginTop: 14 }} onClick={() => setStatus("idle")}>
            Try again
          </button>
        </div>
      )}

      {(status === "idle" || status === "recording" || status === "ready") && (
        <>
          <div style={{ display: "grid", placeItems: "center", margin: "10px 0 18px" }}>
            <button
              aria-label={status === "recording" ? "Stop recording" : "Start recording"}
              onClick={status === "recording" ? stopRec : startRec}
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                fontSize: 60,
                color: "#fff",
                background: status === "recording" ? "var(--coral)" : "var(--primary)",
                boxShadow: status === "recording" ? "0 0 0 10px rgba(255,122,89,0.25)" : "var(--shadow)",
                animation: status === "recording" ? "pop 0.9s ease-in-out infinite" : "none",
                cursor: "pointer",
                border: "none",
              }}
            >
              {status === "recording" ? "⏹️" : "🎤"}
            </button>
            <div className="caption" style={{ marginTop: 12, fontSize: 18 }}>
              {status === "recording"
                ? "Listening… tap to stop!"
                : hasClip
                  ? "Tap a silly face to hear your voice!"
                  : "Tap the microphone and say something!"}
            </div>
          </div>

          {hasClip && status !== "recording" && (
            <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: 460, margin: "0 auto" }}>
              {EFFECTS.map((e) => (
                <button key={e.id} className="tile c-sun" aria-label={e.label} onClick={() => play(e.rate)}>
                  <span className="emoji">{e.emoji}</span>
                  <span className="label">{e.label}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </ActivityShell>
  );
}
