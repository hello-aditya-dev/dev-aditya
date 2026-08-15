import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aditya — Independent Web Designer & Frontend Developer based in Delhi, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0B0B0B",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              background: "#FFFFFF",
              border: "3px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#0B0B0B",
            }}
          >
            A
          </div>
          <div style={{ fontSize: "24px", fontWeight: 600, color: "#8A8A8B" }}>
            Aditya · Delhi, India
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "40px", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            I build corporate websites that earn trust and create opportunities.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF" }}>
            dev-aditya.com
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#FF4A60" }}>
            Available for selected projects
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
