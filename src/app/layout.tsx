import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "White Template",
  description: "A plain white Next.js template",
};

const boxLabels = [
  { label: "home.", href: "/" },
  { label: "add meeting.", href: "/add-meeting" },
  { label: "notes.", href: "/notes" },
  { label: "integrate.", href: "/integrate" },
  { label: "ask ai.", href: "/ask-ai" },
  { label: "settings.", href: "/settings" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: 'white',
          minHeight: '100vh',
        }}
      >
        {/* Sidebar (top-left box and 6 boxes) */}
        <div style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 20,
          background: '#e0e0e0',
        }}>
          {/* Small rectangle in the top left */}
          <div className="top-left-rect" />
          {/* Stack of 6 boxes below the top-left rectangle */}
          <div
            style={{
              marginTop: '79px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              zIndex: 10,
            }}
          >
            {boxLabels.map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="side-rect"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: 20,
                      color: '#111',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
            {/* Non-interactive grey area to fill remaining space */}
            <div style={{ flex: 1, background: 'rgba(217,217,217,0.4)', pointerEvents: 'none' }} />
          </div>
        </div>
        {/* Main content */}
        <div style={{ marginLeft: '250px' }}>{children}</div>
      </body>
    </html>
  );
}
