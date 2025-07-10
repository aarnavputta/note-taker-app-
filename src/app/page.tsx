"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/homepage/home");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Logo */}
      <div style={{ padding: 32 }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 40 }}>libello.</span>
      </div>
      {/* Centered login box */}
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
          Log in or sign up.
        </div>
        {error && (
          <div style={{
            color: '#dc2626',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 14,
            marginBottom: 16,
            textAlign: 'center',
            padding: '8px 16px',
            background: '#fef2f2',
            borderRadius: 4,
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: 320,
              fontFamily: 'Geist Mono, monospace',
              fontSize: 18,
              padding: '8px 12px',
              background: '#ddd',
              border: 'none',
              borderRadius: 2,
              marginBottom: 24,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: 200,
              background: isLoading ? '#666' : 'black',
              color: 'white',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 18,
              padding: '10px 0',
              border: 'none',
              borderRadius: 2,
              marginBottom: 32,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Logging in...' : 'continue'}
          </button>
        </form>
        <div style={{ marginBottom: 16, fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222', textAlign: 'center' }}>
          No account? <Link href="/signup" style={{ color: '#1a0dab', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</Link>
        </div>
        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', width: 400, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#ddd' }} />
          <span style={{ margin: '0 16px', color: '#444', fontFamily: 'Geist Mono, monospace', fontSize: 18 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#ddd' }} />
        </div>
        {/* Google button */}
        <button
          style={{
            width: 320,
            background: '#ddd',
            color: 'black',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 18,
            padding: '10px 0',
            border: 'none',
            borderRadius: 2,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <Image src="/Google__G__logo.svg.png" alt="Google logo" width={24} height={24} />
          continue with Google
        </button>
        {/* Facebook button */}
        <button
          style={{
            width: 320,
            background: '#ddd',
            color: 'black',
            fontFamily: 'Geist Mono, monospace',
            fontSize: 18,
            padding: '10px 0',
            border: 'none',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <Image src="/Facebook_Logo_2023.png" alt="Facebook logo" width={28} height={28} style={{ marginLeft: 8 }} />
          <span style={{ marginLeft: 8 }}>continue with Facebook</span>
        </button>
      </div>
    </div>
  );
} 