"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
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
        <input
          type="password"
          placeholder="password"
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
          onClick={() => router.push('/homepage/home')}
        >
          continue
        </button>
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