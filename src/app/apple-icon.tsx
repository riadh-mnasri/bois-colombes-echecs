import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const knightSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
  <circle cx='12' cy='6.5' r='3.2' fill='#d9b877'/>
  <path d='M9.3 10.2c1.7 1 3.7 1 5.4 0l.9 2.1c-1 3-.4 4.3.9 6.7H8.5c1.3-2.4 1.9-3.7.9-6.7z' fill='#d9b877'/>
  <rect x='6.5' y='19' width='11' height='2.2' rx='1.1' fill='#d9b877'/>
</svg>`;

const knightDataUri = `data:image/svg+xml,${encodeURIComponent(knightSvg)}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#23392c",
        }}
      >
        <img src={knightDataUri} width={112} height={112} alt="" />
      </div>
    ),
    size
  );
}
