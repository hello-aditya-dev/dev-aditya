import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aditya — Web Design & Frontend Development",
    short_name: "Aditya",
    description:
      "Aditya designs and develops clear, high-performance websites for B2B and professional-service firms.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#FAF9F6",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
