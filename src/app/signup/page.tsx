"use client";

import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeHover, setEyeHover] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [eyeConfirmHover, setEyeConfirmHover] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Logo */}
      <div style={{ padding: 32 }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 40 }}>libello.</span>
      </div>
      {/* Centered sign up box */}
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        marginTop: 48,
        background: '#f3f3f3',
        borderRadius: 4,
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      }}>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 26, marginBottom: 32, textAlign: 'center' }}>
          Sign up.
        </div>
        <input
          type="text"
          placeholder="name"
          style={{
            width: 320,
            fontFamily: 'Geist Mono, monospace',
            fontSize: 18,
            padding: '8px 12px',
            background: '#ddd',
            border: 'none',
            borderRadius: 2,
            marginBottom: 16,
            outline: 'none',
          }}
        />
        <input
          type="email"
          placeholder="email"
          style={{
            width: 320,
            fontFamily: 'Geist Mono, monospace',
            fontSize: 18,
            padding: '8px 12px',
            background: '#ddd',
            border: 'none',
            borderRadius: 2,
            marginBottom: 16,
            outline: 'none',
          }}
        />
        <div style={{ position: 'relative', width: 320, marginBottom: 24 }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            style={{
              width: '100%',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 18,
              padding: '8px 40px 8px 12px',
              background: '#ddd',
              border: 'none',
              borderRadius: 2,
              outline: 'none',
            }}
          />
          <img
            src="/eye.png"
            alt="Show password"
            onClick={() => setShowPassword((v) => !v)}
            onMouseEnter={() => setEyeHover(true)}
            onMouseLeave={() => setEyeHover(false)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 24,
              height: 24,
              opacity: showPassword ? 0.8 : (eyeHover ? 0.8 : 0.4),
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          />
        </div>
        <div style={{ position: 'relative', width: 320, marginBottom: 24 }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            style={{
              width: '100%',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 18,
              padding: '8px 40px 8px 12px',
              background: '#ddd',
              border: 'none',
              borderRadius: 2,
              outline: 'none',
            }}
          />
          <img
            src="/eye.png"
            alt="Show confirm password"
            onClick={() => setShowConfirmPassword((v) => !v)}
            onMouseEnter={() => setEyeConfirmHover(true)}
            onMouseLeave={() => setEyeConfirmHover(false)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 24,
              height: 24,
              opacity: showConfirmPassword ? 0.8 : (eyeConfirmHover ? 0.8 : 0.4),
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          />
        </div>
        <button
          style={{
            width: 200,
            background: 'black',
            color: 'white',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 18,
            padding: '10px 0',
            border: 'none',
            borderRadius: 2,
            marginBottom: 32,
            cursor: 'pointer',
          }}
        >
          sign up
        </button>
        <a
          href="/"
          style={{
            color: '#1a0dab',
            textDecoration: 'underline',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 14,
            marginTop: 16,
            cursor: 'pointer',
          }}
        >
          note -- signing in with google or facebook is easier ⟶
        </a>
      </div>
    </div>
  );
} 