"use client";

import Link from "next/link";
import "../globals.css";
import { useState } from 'react';

const boxLabels = [
  { label: "home.", href: "/homepage/home" },
  { label: "add meeting.", href: "/homepage/add-meeting" },
  { label: "notes.", href: "/homepage/notes" },
  { label: "integrate.", href: "/homepage/integrate" },
  { label: "ask ai.", href: "/homepage/ask-ai" },
  { label: "settings.", href: "/homepage/settings" },
];

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
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
      {/* Account icon and name with expanded hoverable area */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: 40,
          zIndex: 50,
          height: 90,
          width: 160,
          pointerEvents: 'auto',
        }}
        onMouseEnter={() => setAccountDropdownOpen(true)}
        onMouseLeave={() => setAccountDropdownOpen(false)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            position: 'relative',
            background: 'transparent',
            width: 'fit-content',
            marginLeft: 'auto',
          }}
          onClick={() => setAccountDropdownOpen((v) => !v)}
        >
          <img src="/account.svg" alt="Account" width={36} height={36} style={{ display: 'block' }} />
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222', marginLeft: 4 }}>account</span>
        </div>
        {accountDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: 48,
              right: 0,
              minWidth: 120,
              background: 'rgba(255,255,255,0.85)',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              padding: '8px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: '1px solid #e0e0e0',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 16,
              color: '#222',
              textAlign: 'left',
              transition: 'opacity 0.2s',
              opacity: 1,
              pointerEvents: 'auto',
            }}
          >
            <a
              href="/"
              style={{
                width: '100%',
                padding: '8px 20px',
                fontFamily: 'Geist Mono, monospace',
                fontSize: 16,
                color: '#222',
                textDecoration: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 6,
                transition: 'background 0.15s',
                display: 'block',
                textAlign: 'left',
              }}
              onClick={() => setAccountDropdownOpen(false)}
              onMouseDown={e => e.preventDefault()}
            >
              Log out
            </a>
          </div>
        )}
      </div>
      {/* Main content */}
      <div style={{ marginLeft: '250px' }}>{children}</div>
    </div>
  );
} 