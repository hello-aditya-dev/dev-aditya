import { ImageResponse } from "next/og";
import { TEMPLATES } from "@/config/templates";

/**
 * Per-template Open Graph image for /templates/[slug].
 *
 * A paperfolio-styled typographic card: template number, category,
 * oversized name, price and the site's metadata line. Same visual
 * system as the collection OG image (paper grain, hard borders,
 * coral pill) so social shares stay on-brand per product.
 */

export const alt = "Aditya template — premium website system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = TEMPLATES.findIndex((t) => t.slug === slug);
  const template = TEMPLATES[index] ?? TEMPLATES[0];
  const num = String((index >= 0 ? index : 0) + 1).padStart(2, "0");

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
        {/* Top row — brand + template number */}
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
          <div style={{ fontSize: "24px", fontWeight: 600, color: "#5E5E5F", display: "flex" }}>
            Aditya · Digital Products
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: 700,
              color: "#0B0B0B",
              fontFamily: "monospace",
            }}
          >
            {num} / 06
          </div>
        </div>

        {/* Middle — category, name, description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#5E5E5F",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#FF4A60",
              }}
            />
            {template.category} · Template
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "18px",
              fontSize: template.name.length > 8 ? "84px" : "110px",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#0B0B0B",
              lineHeight: 1.02,
            }}
          >
            {template.name}
          </div>

          <div
            style={{
              marginTop: "22px",
              fontSize: "26px",
              fontWeight: 500,
              color: "#5E5E5F",
              lineHeight: 1.4,
              maxWidth: "860px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {template.description}
          </div>
        </div>

        {/* Bottom — price pill + metadata + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "36px",
            paddingTop: "30px",
            borderTop: "2px solid #0B0B0B",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#FF4A60",
                border: "3px solid #0B0B0B",
                borderRadius: "10px",
                padding: "8px 20px",
                fontSize: "30px",
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              {template.price}
            </div>
            <div style={{ display: "flex", fontSize: "20px", fontWeight: 600, color: "#0B0B0B" }}>
              Framer · Responsive · CMS-Ready
            </div>
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#5E5E5F", display: "flex" }}>
            dev-aditya.com/templates
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
