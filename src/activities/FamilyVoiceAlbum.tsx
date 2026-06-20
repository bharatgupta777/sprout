import { useEffect, useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

export function FamilyVoiceAlbum({ onBack }: { onBack: () => void }) {
  const { familyData, updateFamilyData, tap, speak } = useApp();
  const [recording, setRecording] = useState(false);
  const [message, setMessage] = useState("Record a family voice for the album.");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage("Audio recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        updateFamilyData({
          ...familyData,
          voices: [...familyData.voices, url],
        });
        setMessage("Recorded! Tap a voice to play it.");
        speak("Family voice saved.");
      };
      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
      setMessage("Recording... speak into the microphone.");
      tap();
    } catch {
      setMessage("Cannot access microphone. Please allow audio recording.");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    recorderRef.current = null;
    setRecording(false);
  };

  const playVoice = (voiceUrl: string) => {
    tap();
    const audioEl = new Audio(voiceUrl);
    audioEl.play();
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Family voice album</>}
      caption={message}
      onReplay={() => speak(message)}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn btn-teal" onClick={recording ? stopRecording : startRecording}>
          {recording ? "Stop recording" : "Record family voice"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            tap();
            setMessage("Tap any saved voice to hear it again.");
          }}
        >
          Help
        </button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", marginTop: 16 }}>
        {familyData.voices.length === 0 ? (
          <div className="story-card" style={{ minHeight: 160 }}>
            No family voices yet. Record one to hear it anytime.
          </div>
        ) : (
          familyData.voices.map((voice, index) => (
            <button
              key={voice}
              className="tile c-sky"
              style={{ minHeight: 120 }}
              onClick={() => playVoice(voice)}
            >
              <span className="emoji">🎙️</span>
              <span className="label">Voice {index + 1}</span>
            </button>
          ))
        )}
      </div>
    </ActivityShell>
  );
}
