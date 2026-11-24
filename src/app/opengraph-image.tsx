import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nortem Log | Kapsamlı lojistik çözümleriyle sınırları aşın";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-black.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        <img src={logoSrc} width={900} height={214} alt="" />
        <div style={{ fontSize: 40, color: "#33363d", display: "flex" }}>
          Kapsamlı lojistik çözümleriyle sınırları aşın
        </div>
      </div>
    ),
    size,
  );
}
