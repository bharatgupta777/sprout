import { useMemo } from "react";
import { Mascot } from "../components/Mascot";
import { ACTIVITIES, activitiesByGroup } from "../lib/registry";
import { useApp } from "../context/AppContext";
import { todaySeed } from "../lib/random";

export function Home({ onOpen }: { onOpen: (id: string) => void }) {
  const { speak, tap, settings, state } = useApp();

  // "Today's Adventure": a stable-for-the-day pick of 3 activities.
  const daily = useMemo(() => {
    const seed = todaySeed();
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const arr = ACTIVITIES.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 3);
  }, []);

  const greetName = settings.childName ? `, ${settings.childName}` : "";

  const open = (id: string, title: string) => {
    tap();
    speak(title);
    onOpen(id);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          margin: "22px 0 6px",
        }}
      >
        <Mascot message={`Hi${greetName}! What shall we play today?`} size={1} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 className="h-hero">Let's Play &amp; Learn!</h1>
          <p className="h-sub">
            Tap a picture to start. {state.streak > 1 ? `🔥 ${state.streak}-day streak!` : ""}
          </p>
        </div>
      </div>

      <h2 style={{ color: "var(--coral)", margin: "18px 0 8px" }}>🌟 Today's Adventure</h2>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
        {daily.map((a) => (
          <button
            key={a.id}
            className={`tile ${a.color}`}
            onClick={() => open(a.id, a.title)}
            aria-label={a.title}
            style={{ outline: "3px solid var(--sun)" }}
          >
            <span className="emoji">{a.emoji}</span>
            <span className="label">{a.title}</span>
            <span className="tag">{a.subject}</span>
          </button>
        ))}
      </div>

      {activitiesByGroup().map(({ group, items }) => (
        <section key={group}>
          <h2 style={{ color: "var(--primary-dark)", margin: "24px 0 8px" }}>{group}</h2>
          <div className="grid">
            {items.map((a) => (
              <button
                key={a.id}
                className={`tile ${a.color}`}
                onClick={() => open(a.id, a.title)}
                aria-label={a.title}
              >
                <span className="emoji">{a.emoji}</span>
                <span className="label">{a.title}</span>
                <span className="tag">{a.subject}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
