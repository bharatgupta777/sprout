import { useState } from "react";
import { audio } from "../lib/audio";
import { ACTIVITIES } from "../lib/registry";
import { useApp } from "../context/AppContext";
import { GrowthGuide } from "./GrowthGuide";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return <button className={`toggle${on ? " on" : ""}`} aria-pressed={on} onClick={onClick} />;
}

export function ParentDashboard({ onClose }: { onClose: () => void }) {
  const { state, settings, updateSettings, reset } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const voices = audio.listVoices();
  const hasPremium = voices.some((v) => v.premium);

  const totalPlays = Object.values(state.plays).reduce((a, b) => a + b, 0);
  const favourite =
    Object.entries(state.plays).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const favTitle = ACTIVITIES.find((a) => a.id === favourite)?.title ?? "Not yet";

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, color: "var(--primary-dark)" }}>Parent Zone 🌿</h2>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat">
            <div className="num">{state.stars} ⭐</div>
            <div className="cap">Stars earned</div>
          </div>
          <div className="stat">
            <div className="num">{state.streak}🔥</div>
            <div className="cap">Day streak</div>
          </div>
          <div className="stat">
            <div className="num">{totalPlays}</div>
            <div className="cap">Activities played</div>
          </div>
          <div className="stat">
            <div className="num" style={{ fontSize: 20 }}>{favTitle}</div>
            <div className="cap">Favorite</div>
          </div>
        </div>

        <h3 style={{ marginBottom: 4 }}>Settings</h3>

        <div className="field">
          <label>Child's name (used in greetings)</label>
          <input
            type="text"
            value={settings.childName}
            placeholder="e.g. Aria"
            maxLength={20}
            onChange={(e) => updateSettings({ childName: e.target.value })}
          />
        </div>

        <div className="row">
          <span>Age level: <strong>{settings.ageMode === "younger" ? "Younger (2–3)" : "Older (4–6)"}</strong></span>
          <button
            className="btn btn-ghost"
            style={{ padding: "8px 14px" }}
            onClick={() => updateSettings({ ageMode: settings.ageMode === "younger" ? "older" : "younger" })}
          >
            Switch
          </button>
        </div>

        <div className="row">
          <span>🔊 Narration (talking)</span>
          <Toggle on={settings.narration} onClick={() => updateSettings({ narration: !settings.narration })} />
        </div>

        <div className="row">
          <span>🐢 Slower speech</span>
          <Toggle
            on={settings.speechRate <= 0.82}
            onClick={() => updateSettings({ speechRate: settings.speechRate <= 0.82 ? 0.95 : 0.75 })}
          />
        </div>

        <div className="row">
          <span>🌙 Reduce motion</span>
          <Toggle on={settings.reducedMotion} onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })} />
        </div>

        {voices.length > 0 && (
          <div className="field">
            <label>Narrator voice {hasPremium ? "(✨ = more natural)" : ""}</label>
            <select
              value={settings.voicePref}
              onChange={(e) => {
                updateSettings({ voicePref: e.target.value });
                audio.speak("Hi there! I will be your friendly helper.", { expressive: true });
              }}
            >
              <option value="auto">Automatic (best &amp; most natural)</option>
              {voices.map(({ voice, premium }) => (
                <option key={voice.name} value={voice.name}>
                  {premium ? "✨ " : ""}
                  {voice.name}
                </option>
              ))}
            </select>
            <span className="note" style={{ color: "var(--ink-soft)", fontWeight: 600, fontSize: 13 }}>
              Tip: ✨ voices are the most human-sounding. On phones, try the Google or Siri voices.
            </span>
          </div>
        )}

        <button
          className="btn"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => setShowGuide(true)}
        >
          📖 Growth & Health Guide
        </button>

        <button
          className="btn btn-teal"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => window.open(`${import.meta.env.BASE_URL}printables/activity-pack.html`, "_blank")}
        >
          🖨️ Open printable activity pack
        </button>

        {showGuide && <GrowthGuide onClose={() => setShowGuide(false)} />}

        <h3 style={{ marginBottom: 4, marginTop: 18 }}>Tips for grown-ups</h3>
        <ul style={{ color: "var(--ink-soft)", fontWeight: 600, lineHeight: 1.5, paddingLeft: 18 }}>
          <li>Sit together — narrate, point, and repeat words for the youngest.</li>
          <li>Short sessions (5–10 min) work best at this age.</li>
          <li>There are no wrong answers — every tap gets a gentle, kind response.</li>
          <li>Use the printable pack for screen-free days (see the README).</li>
        </ul>

        {!confirmReset ? (
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => setConfirmReset(true)}>
            Reset progress
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              className="btn btn-coral"
              style={{ flex: 1 }}
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
            >
              Yes, reset
            </button>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmReset(false)}>
              Keep
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
