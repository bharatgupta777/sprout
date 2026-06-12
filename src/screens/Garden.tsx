import { useApp } from "../context/AppContext";
import { Mascot } from "../components/Mascot";

/** "My Garden": every finished activity grows a plant. A calm, collect-forever
 *  reward with no streaks or pressure — a missed day costs nothing. */
export function Garden({ onBack }: { onBack: () => void }) {
  const { state, speak, tap } = useApp();
  const garden = state.garden;

  return (
    <div className="container">
      <div className="frame">
        <div style={{ display: "flex", width: "100%", alignItems: "center", gap: 12 }}>
          <button
            className="icon-btn"
            aria-label="Go back home"
            onClick={() => {
              tap();
              onBack();
            }}
          >
            🏠
          </button>
          <div style={{ flex: 1 }} />
        </div>

        <Mascot message="Look how much you've grown!" size={1} />
        <h1 className="h-hero" style={{ color: "var(--leaf)" }}>My Garden 🌻</h1>
        <p className="h-sub">
          You've grown <strong>{garden.length}</strong> {garden.length === 1 ? "plant" : "plants"}!
        </p>

        {garden.length === 0 ? (
          <div className="story-card">
            <div className="story-art">🪴</div>
            <div className="story-text">Play an activity to grow your first plant!</div>
          </div>
        ) : (
          <div
            className="story-card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))",
              gap: 6,
              background: "linear-gradient(180deg,#eafff0,#d9f7e2)",
              maxWidth: 640,
            }}
          >
            {garden.map((p, i) => (
              <button
                key={i}
                aria-label="plant"
                onClick={() => {
                  tap();
                  speak("Pretty!");
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(28px,7vw,40px)",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
