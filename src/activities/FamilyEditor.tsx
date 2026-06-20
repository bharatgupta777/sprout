import { useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

export function FamilyEditor({ onBack }: { onBack: () => void }) {
  const { familyData, updateFamilyData, tap, speak } = useApp();
  const [members, setMembers] = useState(familyData.members);
  const [vocab, setVocab] = useState(familyData.vocabulary);

  const save = () => {
    tap();
    updateFamilyData({ ...familyData, members, vocabulary: vocab });
    speak("Family information saved.");
  };

  return (
    <ActivityShell onBack={onBack} prompt={<>Family content editor</>} caption="Edit names, roles, and vocabulary." onReplay={() => speak("Edit family names and vocabulary.")}
    >
      <div className="story-card" style={{ marginBottom: 18, textAlign: "left" }}>
        <h3 style={{ marginBottom: 12 }}>Family members</h3>
        {members.map((member, index) => (
          <div key={`${member.name}-${index}`} className="field" style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={member.name}
              placeholder="Name"
              onChange={(e) => {
                const next = [...members];
                next[index] = { ...next[index], name: e.target.value };
                setMembers(next);
              }}
            />
            <input
              type="text"
              value={member.role}
              placeholder="Role"
              onChange={(e) => {
                const next = [...members];
                next[index] = { ...next[index], role: e.target.value };
                setMembers(next);
              }}
            />
          </div>
        ))}
        <button className="btn btn-ghost" onClick={() => setMembers([...members, { name: "", role: "" }])}>
          + Add family member
        </button>
      </div>

      <div className="story-card" style={{ marginBottom: 18, textAlign: "left" }}>
        <h3 style={{ marginBottom: 12 }}>Vocabulary</h3>
        {vocab.map((item, index) => (
          <div key={`${item.english}-${index}`} className="field" style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={item.english}
              placeholder="English"
              onChange={(e) => {
                const next = [...vocab];
                next[index] = { ...next[index], english: e.target.value };
                setVocab(next);
              }}
            />
            <input
              type="text"
              value={item.hindi}
              placeholder="Hindi"
              onChange={(e) => {
                const next = [...vocab];
                next[index] = { ...next[index], hindi: e.target.value };
                setVocab(next);
              }}
            />
          </div>
        ))}
        <button className="btn btn-ghost" onClick={() => setVocab([...vocab, { english: "", hindi: "" }])}>
          + Add vocabulary word
        </button>
      </div>

      <button className="btn btn-teal" style={{ width: "100%" }} onClick={save}>
        Save family content
      </button>
    </ActivityShell>
  );
}
