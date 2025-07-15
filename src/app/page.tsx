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
          className={`w-[200px] text-white text-[18px] py-[10px] px-0 border-none rounded-[2px] mb-[32px] ${isLoading ? 'bg-[#666] cursor-not-allowed opacity-70' : 'bg-black cursor-pointer opacity-100'}`}
          style={{ fontFamily: 'Geist Mono, monospace' }}
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
          className="w-[320px] bg-[#ddd] text-black text-[18px] py-[10px] px-0 border-none rounded-[2px] mb-4 flex items-center justify-center gap-3 cursor-pointer"
          style={{ fontFamily: 'Geist Mono, monospace' }}
        >
          <Image src="/Google__G__logo.svg.png" alt="Google logo" width={24} height={24} />
          continue with Google
        </button>
        {/* Facebook button */}
        <button
          className="w-[320px] bg-[#ddd] text-black text-[18px] py-[10px] px-0 border-none rounded-[2px] flex items-center justify-start gap-3 cursor-pointer"
          style={{ fontFamily: 'Geist Mono, monospace' }}
        >
          <Image src="/Facebook_Logo_2023.png" alt="Facebook logo" width={28} height={28} className="ml-2" />
          <span className="ml-2">continue with Facebook</span>
        </button>
      </div>
    </div>
  );
} 