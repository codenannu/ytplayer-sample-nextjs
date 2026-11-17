"use client";

import { useState } from "react";
import { YouTubePlayerWithControls } from "@codenkay/video-ytplayer-ui";

export function Playground() {
  const [input, setInput] = useState("dQw4w9WgXcQ");
  const [active, setActive] = useState<string | null>("dQw4w9WgXcQ");
  const [watchTime, setWatchTime] = useState(0);

  return (
    <main style={{ maxWidth: 960, margin: "2rem auto", padding: 16 }}>
      <h1>YouTube Next.js sample</h1>
      <p style={{ color: "#94a3b8" }}>
        Port 3001 · Next.js 16.4 · Referrer-Policy{" "}
        <code>strict-origin-when-cross-origin</code> · no DRM BFF
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8 }}
          placeholder="YouTube URL or ID"
        />
        <button type="button" onClick={() => setActive(input.trim() || null)}>
          Load
        </button>
      </div>
      <p style={{ color: "#94a3b8" }}>Watch time: {watchTime.toFixed(1)}s</p>
      {active ? (
        <div style={{ aspectRatio: "16 / 9", background: "#000" }}>
          <YouTubePlayerWithControls
            key={active}
            videoId={active}
            audioAvailable={false}
            onWatchTime={setWatchTime}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </main>
  );
}
