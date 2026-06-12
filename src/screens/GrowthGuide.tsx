import {
  EATING_TIPS,
  GROWTH,
  GUIDE_DISCLAIMER,
  HEALTH_HABITS,
  MEALS,
  MILESTONES,
  SNACKS,
  type MealSection,
} from "../content/parentGuide";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ color: "var(--ink-soft)", fontWeight: 600, lineHeight: 1.55, paddingLeft: 18, margin: "6px 0" }}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function MealCard({ section }: { section: MealSection }) {
  return (
    <div style={{ marginTop: 10 }}>
      <h4 style={{ margin: "4px 0", color: "var(--primary-dark)" }}>
        {section.emoji} {section.title}
      </h4>
      <Bullets items={section.items} />
    </div>
  );
}

/** Parent-gated growth, milestones, and healthy-eating guide (ages 2–6). */
export function GrowthGuide({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, color: "var(--primary-dark)" }}>Growth & Health Guide 📖</h2>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>

        <p
          style={{
            background: "#fff4e0",
            border: "2px solid #ffd79a",
            borderRadius: 14,
            padding: "10px 14px",
            color: "#8a5a00",
            fontWeight: 700,
            fontSize: 13,
            lineHeight: 1.45,
          }}
        >
          ⚠️ {GUIDE_DISCLAIMER}
        </p>

        <h3 style={{ marginBottom: 4 }}>📏 Typical Weight & Height (ages 2–6)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontWeight: 600 }}>
            <thead>
              <tr style={{ color: "var(--primary-dark)", textAlign: "left" }}>
                <th style={{ padding: "6px 6px" }}>Age</th>
                <th style={{ padding: "6px 6px" }}>👧 Weight</th>
                <th style={{ padding: "6px 6px" }}>👧 Height</th>
                <th style={{ padding: "6px 6px" }}>👦 Weight</th>
                <th style={{ padding: "6px 6px" }}>👦 Height</th>
              </tr>
            </thead>
            <tbody>
              {GROWTH.map((r) => (
                <tr key={r.age} style={{ borderTop: "1px solid #eee", color: "var(--ink-soft)" }}>
                  <td style={{ padding: "6px 6px", fontWeight: 800, color: "var(--ink)" }}>{r.age}</td>
                  <td style={{ padding: "6px 6px" }}>{r.girlWeight}</td>
                  <td style={{ padding: "6px 6px" }}>{r.girlHeight}</td>
                  <td style={{ padding: "6px 6px" }}>{r.boyWeight}</td>
                  <td style={{ padding: "6px 6px" }}>{r.boyHeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ marginBottom: 4, marginTop: 18 }}>🌟 Developmental Milestones</h3>
        {MILESTONES.map((m) => (
          <details key={m.age} style={{ marginBottom: 6 }}>
            <summary style={{ cursor: "pointer", fontWeight: 800, color: "var(--ink)", padding: "6px 0" }}>
              {m.emoji} {m.age}
            </summary>
            <div style={{ paddingLeft: 6 }}>
              <strong style={{ color: "var(--primary-dark)" }}>🏃 Movement</strong>
              <Bullets items={m.movement} />
              <strong style={{ color: "var(--primary-dark)" }}>💬 Language</strong>
              <Bullets items={m.language} />
              <strong style={{ color: "var(--primary-dark)" }}>🤝 Social</strong>
              <Bullets items={m.social} />
              <strong style={{ color: "var(--primary-dark)" }}>🧠 Thinking</strong>
              <Bullets items={m.thinking} />
            </div>
          </details>
        ))}

        <h3 style={{ marginBottom: 4, marginTop: 18 }}>🍽️ Eating Ideas (India)</h3>
        {MEALS.map((s) => (
          <MealCard key={s.title} section={s} />
        ))}
        <MealCard section={SNACKS} />

        <h3 style={{ marginBottom: 4, marginTop: 18 }}>🥗 Healthy Eating Tips</h3>
        <Bullets items={EATING_TIPS} />

        <h3 style={{ marginBottom: 4, marginTop: 18 }}>💚 Daily Health Habits</h3>
        <Bullets items={HEALTH_HABITS} />

        <button className="btn btn-teal" style={{ width: "100%", marginTop: 14 }} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
