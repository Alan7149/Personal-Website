import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#070b16",
          backgroundImage:
            "radial-gradient(1000px 500px at 20% 0%, rgba(59,130,246,0.18), transparent), radial-gradient(900px 500px at 100% 100%, rgba(99,102,241,0.16), transparent)",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          <span style={{ color: "#e8edf7" }}>Hi, I&apos;m&nbsp;</span>
          <span style={{ color: "#3b82f6" }}>{profile.name}</span>
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 42, color: "#9fb0cc" }}>
          Full-Stack Developer
        </div>
        <div
          style={{
            marginTop: 20,
            height: 6,
            width: 130,
            background: "#3b82f6",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            color: "#7f8ea8",
            maxWidth: 940,
            lineHeight: 1.4,
          }}
        >
          {profile.headline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 60,
            fontSize: 26,
            color: "#5b6a86",
          }}
        >
          alan7149.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
