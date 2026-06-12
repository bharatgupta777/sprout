import { useMemo, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { Confetti } from "../components/Confetti";
import { COLOR_PICS, type ColorPic, type Region } from "../content/colorPics";
import { useApp } from "../context/AppContext";

const PALETTE = [
  { hex: "#ff5d5d", name: "Red" }, { hex: "#ff9f43", name: "Orange" },
  { hex: "#ffd23c", name: "Yellow" }, { hex: "#4cc66a", name: "Green" },
  { hex: "#19c3b3", name: "Teal" }, { hex: "#4cb8ff", name: "Blue" },
  { hex: "#7c5cff", name: "Purple" }, { hex: "#ff6fb5", name: "Pink" },
  { hex: "#9b6b43", name: "Brown" }, { hex: "#2b2350", name: "Black" },
];

function RegionShape({
  region,
  fill,
  onTap,
}: {
  region: Region;
  fill: string;
  onTap: () => void;
}) {
  const common = {
    fill: fill || "#ffffff",
    stroke: "#2b2350",
    strokeWidth: 2.5,
    style: { cursor: "pointer" as const },
    onClick: onTap,
  };
  switch (region.type) {
    case "circle":
      return <circle cx={region.cx} cy={region.cy} r={region.r} {...common} />;
    case "ellipse":
      return <ellipse cx={region.cx} cy={region.cy} rx={region.rx} ry={region.ry} {...common} />;
    case "rect":
      return <rect x={region.x} y={region.y} width={region.w} height={region.h} rx={region.rx ?? 0} {...common} />;
    case "polygon":
      return <polygon points={region.points} {...common} />;
  }
}

export function ColorIn({ onBack }: { onBack: () => void }) {
  const { speak, tap, award } = useApp();
  const [pic, setPic] = useState<ColorPic | null>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [fills, setFills] = useState<Record<string, string>>({});
  const [confetti, setConfetti] = useState(0);
  const [rewarded, setRewarded] = useState(false);

  const allFilled = useMemo(
    () => (pic ? pic.regions.every((r) => fills[r.id]) : false),
    [pic, fills],
  );

  if (!pic) {
    return (
      <ActivityShell onBack={onBack} prompt={<>Pick a picture to color</>} caption="Tap a picture">
        <div className="grid">
          {COLOR_PICS.map((p) => (
            <button
              key={p.id}
              className="tile c-purple"
              onClick={() => {
                tap();
                speak(`Let's color the ${p.title}!`);
                setPic(p);
                setFills({});
                setRewarded(false);
              }}
            >
              <span className="emoji">{p.emoji}</span>
              <span className="label">{p.title}</span>
            </button>
          ))}
        </div>
      </ActivityShell>
    );
  }

  const fillRegion = (id: string) => {
    tap();
    const next = { ...fills, [id]: color.hex };
    setFills(next);
    const done = pic.regions.every((r) => next[r.id]);
    if (done && !rewarded) {
      setRewarded(true);
      setConfetti((c) => c + 1);
      award(3, "color-in");
      setTimeout(() => speak("Beautiful! You colored the whole picture!", { expressive: true }), 400);
    }
  };

  return (
    <ActivityShell
      onBack={() => setPic(null)}
      prompt={<>Color the {pic.title}! 🖍️</>}
      caption={allFilled ? "All done — gorgeous!" : `Picked: ${color.name}. Tap a part to color it.`}
    >
      <Confetti fire={confetti} />
      <svg
        viewBox="0 0 200 200"
        style={{
          width: "min(420px, 84vw)",
          height: "auto",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "var(--shadow)",
          border: "4px solid #ece7ff",
          display: "block",
          margin: "0 auto 14px",
        }}
      >
        {pic.regions.map((r) => (
          <RegionShape key={r.id} region={r} fill={fills[r.id]} onTap={() => fillRegion(r.id)} />
        ))}
        {pic.overlay?.map((o, i) =>
          o.type === "circle" ? (
            <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.fill} />
          ) : (
            <line key={i} x1={o.x1} y1={o.y1} x2={o.x2} y2={o.y2} stroke="#2b2350" strokeWidth={2.5} />
          ),
        )}
      </svg>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {PALETTE.map((c) => (
          <button
            key={c.hex}
            aria-label={c.name}
            onClick={() => {
              setColor(c);
              tap();
              speak(c.name);
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: c.hex,
              border: color.hex === c.hex ? "4px solid var(--ink)" : "3px solid #fff",
              boxShadow: "var(--shadow-press)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <button
        className="btn btn-ghost"
        style={{ marginTop: 12, padding: "10px 18px" }}
        onClick={() => {
          tap();
          setFills({});
        }}
      >
        🧽 Start over
      </button>
    </ActivityShell>
  );
}
