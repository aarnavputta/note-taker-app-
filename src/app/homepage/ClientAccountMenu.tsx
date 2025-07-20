"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ClientAccountMenu({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);
  return (
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
        onClick={() => setOpen((v) => !v)}
      >
        <img src="/account.svg" alt="Account" width={36} height={36} style={{ display: 'block' }} />
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222', marginLeft: 4 }}>{userName}</span>
      </div>
      {open && (
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
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
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
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
} 