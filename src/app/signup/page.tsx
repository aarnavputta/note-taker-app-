"use client";

import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeHover, setEyeHover] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [eyeConfirmHover, setEyeConfirmHover] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully!');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
      {/* Centered sign up box */}
      <div
        className="
          max-w-[600px]
          mx-auto
          mt-[48px]
          bg-[#f3f3f3]
          rounded-[4px]
          px-[32px]
          py-[64px]
          flex
          flex-col
          items-center
          shadow-none
        "
      >
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 26, marginBottom: 32, textAlign: 'center' }}>
          Sign up.
        </div>
        
        {/* Error/Success messages */}
        {error && (
          <div
            className="text-[#dc2626] text-[14px] mb-[16px] text-center px-[16px] py-[8px] bg-[#fef2f2] rounded-[4px] border border-[#fecaca]"
            style={{ fontFamily: 'Geist Mono, monospace' }}
          >
            {error}
          </div>
        )}
        
        {success && (
          <div
            className="text-[#16a34a] text-[14px] mb-[16px] text-center px-[16px] py-[8px] bg-[#f0fdf4] rounded-[4px] border border-[#bbf7d0]"
            style={{ fontFamily: 'Geist Mono, monospace' }}
          >
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="name"
          style={{ fontFamily: 'Geist Mono, monospace' }}
          className="w-[320px] text-[18px] px-[12px] py-[8px] bg-[#ddd] border-none rounded-[2px] mb-[16px] outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email"
          style={{ fontFamily: 'Geist Mono, monospace' }}
          className="w-[320px] text-[18px] px-[12px] py-[8px] bg-[#ddd] border-none rounded-[2px] mb-[16px] outline-none"
        />
        <div style={{ position: 'relative', width: 320, marginBottom: 16 }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="password"
            style={{ fontFamily: 'Geist Mono, monospace' }}
            className="w-full text-[18px] px-[12px] py-[8px] bg-[#ddd] border-none rounded-[2px] outline-none pr-10"
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
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="confirm password"
            style={{ fontFamily: 'Geist Mono, monospace' }}
            className="w-full text-[18px] px-[12px] py-[8px] bg-[#ddd] border-none rounded-[2px] outline-none pr-10"
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
          {isLoading ? 'Creating account...' : 'sign up'}
        </button>
        </form>
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