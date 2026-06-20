import { useRef, useState } from "react";
import { ActivityShell } from "../components/ActivityShell";
import { useApp } from "../context/AppContext";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function FamilyPhotoAlbum({ onBack }: { onBack: () => void }) {
  const { familyData, updateFamilyData, tap, speak } = useApp();
  const [message, setMessage] = useState("Add a real family photo to save here.");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = async (file: File) => {
    const dataUrl = await readFileAsDataUrl(file);
    tap();
    updateFamilyData({
      ...familyData,
      photos: [...familyData.photos, dataUrl],
    });
    setMessage("Photo saved! Tap any picture to see it bigger.");
    speak("Photo added to your family album.");
  };

  return (
    <ActivityShell
      onBack={onBack}
      prompt={<>Family photo mode</>}
      caption={message}
      onReplay={() => speak(message)}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        <button
          className="btn btn-teal"
          onClick={() => inputRef.current?.click()}
        >
          📷 Add a family photo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              await handleAdd(file);
              event.target.value = "";
            }
          }}
        />
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))" }}>
          {familyData.photos.length === 0 ? (
            <div className="story-card" style={{ minHeight: 160 }}>
              No photos yet. Add one from your device.
            </div>
          ) : (
            familyData.photos.map((photo, index) => (
              <button
                key={index}
                className="tile c-sky"
                onClick={() => speak("Family photo saved.")}
                style={{ padding: 0, minHeight: 140 }}
              >
                <img src={photo} alt={`Family photo ${index + 1}`} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: "24px" }} />
              </button>
            ))
          )}
        </div>
      </div>
    </ActivityShell>
  );
}
