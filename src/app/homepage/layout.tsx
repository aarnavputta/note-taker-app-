import Link from "next/link";
import "../globals.css";

const boxLabels = [
  { label: "home.", href: "/homepage/home" },
  { label: "add meeting.", href: "/homepage/add-meeting" },
  { label: "notes.", href: "/homepage/notes" },
  { label: "integrate.", href: "/homepage/integrate" },
  { label: "ask ai.", href: "/homepage/ask-ai" },
  { label: "settings.", href: "/homepage/settings" },
];

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 20,
          background: '#e0e0e0',
        }}
      >
        {/* Small rectangle in the top left */}
        <div className="top-left-rect" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: 32,
              color: '#111',
            }}
          >
            libello.
          </span>
        </div>
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
                    fontFamily: 'var(--font-geist-mono), monospace',
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
          <div style={{ flex: 1, background: '#e0e0e0', pointerEvents: 'none' }} />
        </div>
      </div>
      {/* Main content */}
      <div style={{ marginLeft: '250px' }}>{children}</div>
    </div>
  );
} 