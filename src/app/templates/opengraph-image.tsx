import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Premium websites. Ready to launch. — Aditya's template collection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAF9F6",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0B0B0B22 0.5px, transparent 0)",
          backgroundSize: "20px 20px",
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
              border: "3px solid #0B0B0B",
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
          <div style={{ fontSize: "24px", fontWeight: 600, color: "#5E5E5F" }}>
            Aditya · Digital Products
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#0B0B0B",
              lineHeight: 1.05,
              maxWidth: "960px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Premium websites.&nbsp;</span>
            <span
              style={{
                background: "#FF4A60",
                color: "#FFFFFF",
                padding: "0 12px",
                borderRadius: "4px",
              }}
            >
              Ready to launch.
            </span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "26px",
              fontWeight: 600,
              color: "#5E5E5F",
            }}
          >
            Six production-ready template systems for AI, SaaS, agencies and business.
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
          {["06 Templates", "Framer", "Responsive", "CMS-Ready"].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "20px",
                fontWeight: 600,
                color: "#0B0B0B",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: "#1C92FF",
                }}
              />
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px",
            paddingTop: "30px",
            borderTop: "2px solid #0B0B0B",
          }}
        >
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#0B0B0B" }}>
            dev-aditya.com/templates
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#5E5E5F" }}>
            Live previews included
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
