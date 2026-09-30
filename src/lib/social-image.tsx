/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialImageAlt = "MarketFools AI 트레이딩 매매일지 화면";
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logo}`;

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0b1326",
          padding: "58px 64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "620px",
            height: "620px",
            top: "-260px",
            right: "-120px",
            borderRadius: "999px",
            background: "rgba(56, 189, 248, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            bottom: "-360px",
            left: "-80px",
            borderRadius: "999px",
            background: "rgba(78, 222, 163, 0.16)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}>
          <img src={logoSrc} width={402} height={84} alt="MarketFools" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", flex: 1, alignItems: "center", gap: "42px", marginTop: "34px" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "330px", gap: "18px" }}>
              {['JOURNAL', 'REPORTS', 'FOOLIO AI'].map((label, index) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    color: index === 1 ? "#4edea3" : "#c3d3f0",
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                  }}
                >
                  <span style={{ color: "#7dd3fc", fontSize: "18px" }}>0{index + 1}</span>
                  {label}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: "350px",
                flexDirection: "column",
                gap: "22px",
                padding: "34px",
                border: "1px solid rgba(125, 211, 252, 0.35)",
                borderRadius: "24px",
                background: "rgba(26, 35, 56, 0.92)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "#8aa0c9", fontSize: "18px" }}>
                <span>REPORTS</span>
                <span style={{ color: "#4edea3" }}>PATTERN REVIEW</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", flex: 1, gap: "14px" }}>
                {[38, 62, 48, 82, 70, 96, 78, 110, 124].map((height, index) => (
                  <span
                    key={height}
                    style={{
                      width: "38px",
                      height: `${height}px`,
                      borderRadius: "8px 8px 3px 3px",
                      background: index > 5 ? "#4edea3" : "#38bdf8",
                      opacity: 0.55 + index * 0.05,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                <span style={{ flex: 1, height: "10px", borderRadius: "99px", background: "#22304d" }} />
                <span style={{ width: "42%", height: "10px", borderRadius: "99px", background: "#143047" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
