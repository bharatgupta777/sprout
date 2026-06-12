import { useEffect, useState } from "react";
import { Onboarding } from "./components/Onboarding";
import { ParentGate } from "./components/ParentGate";
import { useApp } from "./context/AppContext";
import { getActivity } from "./lib/registry";
import { Garden } from "./screens/Garden";
import { Home } from "./screens/Home";
import { ParentDashboard } from "./screens/ParentDashboard";

type View = { kind: "home" } | { kind: "activity"; id: string } | { kind: "garden" };

export default function App() {
  const { state, settings, stopSpeech, completeOnboarding } = useApp();
  const [view, setView] = useState<View>({ kind: "home" });
  const [showGate, setShowGate] = useState(false);
  const [showParent, setShowParent] = useState(false);

  // Reflect the reduced-motion preference on the document root.
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", settings.reducedMotion);
  }, [settings.reducedMotion]);

  const goHome = () => {
    stopSpeech();
    setView({ kind: "home" });
  };

  const active = view.kind === "activity" ? getActivity(view.id) : undefined;

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="brand"
          onClick={goHome}
          aria-label="Sprout home"
          style={{ background: "none", border: "none" }}
        >
          🌱 Sprout
        </button>
        <div className="spacer" />
        <button
          className="icon-btn"
          aria-label="My garden"
          onClick={() => {
            stopSpeech();
            setView({ kind: "garden" });
          }}
        >
          🌻
        </button>
        <div className="pill" aria-label={`${state.stars} stars`}>
          <span className="star-count">⭐</span>
          <span>{state.stars}</span>
        </div>
        <button
          className="icon-btn"
          aria-label="Parent zone"
          onClick={() => {
            stopSpeech();
            setShowGate(true);
          }}
        >
          ⚙️
        </button>
      </header>

      <main style={{ flex: 1 }}>
        {view.kind === "home" && <Home onOpen={(id) => setView({ kind: "activity", id })} />}
        {view.kind === "garden" && <Garden onBack={goHome} />}
        {active && (
          <div className="container">
            <active.Component onBack={goHome} />
          </div>
        )}
        {view.kind === "activity" && !active && (
          <div className="container">
            <p>Activity not found.</p>
            <button className="btn" onClick={goHome}>
              🏠 Home
            </button>
          </div>
        )}
      </main>

      {showGate && (
        <ParentGate
          onClose={() => setShowGate(false)}
          onPass={() => {
            setShowGate(false);
            setShowParent(true);
          }}
        />
      )}
      {showParent && <ParentDashboard onClose={() => setShowParent(false)} />}
      {!state.onboarded && <Onboarding onDone={completeOnboarding} />}
    </div>
  );
}
