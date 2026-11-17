import type { ReactNode } from "react";
import "@codenkay/video-ytplayer-ui/styles.css";

export const metadata = { title: "ytplayer-nextjs" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui",
          background: "#0f172a",
          color: "#e2e8f0",
        }}
      >
        {children}
      </body>
    </html>
  );
}
