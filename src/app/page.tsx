"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { signIn } from 'next-auth/react';

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
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.ok) {
        router.push("/homepage/home");
      } else {
        if (res?.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError(res?.error || "Login failed");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div style={{ padding: 32 }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 40 }}>libello.</span>
      </div>
      {/* Centered login box */}
      <div
        className="max-w-[600px] mx-auto mt-[48px] bg-[#f3f3f3] rounded-[4px] px-[32px] py-[64px] flex flex-col items-center shadow-none"
      >
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 26, marginBottom: 32, textAlign: 'center' }}>
          Log in or sign up.
        </div>
        {error && (
          <div
            className="text-[#dc2626] text-[14px] mb-[16px] text-center bg-[#fef2f2] rounded-[4px] border border-[#fecaca]"
            style={{ fontFamily: 'Geist Mono, monospace', padding: '8px 16px' }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          className="w-[320px] text-[18px] bg-[#ddd] border-none rounded-[2px] mb-[16px] outline-none"
          style={{ fontFamily: 'Geist Mono, monospace', padding: '8px 12px' }}
        />
        <input
          type="password"
          placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          className="w-[320px] text-[18px] bg-[#ddd] border-none rounded-[2px] mb-[24px] outline-none"
          style={{ fontFamily: 'Geist Mono, monospace', padding: '8px 12px' }}
        />
        <button
            type="submit"
            disabled={isLoading}
          className="w-[200px] text-[18px] py-[10px] px-0 border-none rounded-[2px] mb-[32px]"
          style={{ 
            fontFamily: 'Geist Mono, monospace',
            background: isLoading ? '#666' : 'black',
            color: 'white',
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
          className="w-[320px] bg-[#ddd] text-black text-[18px] py-[10px] px-0 border-none rounded-[2px] mb-[16px] flex items-center justify-center cursor-pointer"
          style={{ fontFamily: 'Geist Mono, monospace', gap: 12 }}
          onClick={() => signIn('google', { callbackUrl: '/homepage/home' })}
        >
          <img src="/Google__G__logo.svg.png" alt="Google logo" width={24} height={24} />
          continue with Google
        </button>
        {/* Facebook button replaced with GitHub */}
        <button
          className="w-[320px] bg-[#ddd] text-black text-[18px] py-[10px] px-0 border-none rounded-[2px] flex items-center justify-start cursor-pointer"
          style={{ fontFamily: 'Geist Mono, monospace', gap: 12 }}
          onClick={() => signIn('github', { callbackUrl: '/homepage/home' })}
        >
          <img src="/github.png" alt="GitHub logo" width={28} height={28} style={{ marginLeft: 8 }} />
          <span style={{ marginLeft: 8 }}>continue with GitHub</span>
        </button>
      </div>
    </div>
  );
} 