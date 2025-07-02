"use client";
import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";
// TODO: Import Geist Mono font for production use

export default function Home() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const navItems = [
    { label: "recents", key: "recents" },
    { label: "schedule", key: "about" },
    { label: "FAQ", key: "how" },
  ];
  const [selected, setSelected] = useState("recents");

  const renderTabContent = () => {
    switch (selected) {
      case "recents":
        return <div>Recents content goes here.</div>;
      case "about":
        return <div>About us content goes here.</div>;
      case "how":
        return <div>How to use content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
    }}>
      {/* Large heading at the top */}
      <div style={{
        width: '100%',
        height: '125px',
        backgroundColor: 'rgba(217,217,217,0.2)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '24px',
        margin: 0,
        marginBottom: '32px',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 80,
          color: '#000',
          lineHeight: 1,
        }}>home.</span>
      </div>
      {/* NavBar */}
      <div className="responsive-container">
        <nav className="responsive-navbar">
          {navItems.map((item) => {
            const isActive = selected === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelected(item.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: 24,
                  color: '#111',
                  padding: '8px 8px 4px 8px',
                  borderBottom: isActive ? '2px solid #111' : '2px solid transparent',
                  transition: 'border-bottom 0.2s',
                  cursor: 'pointer',
                  minWidth: 80,
                  textAlign: 'center',
                  marginBottom: '-1px', // Overlay dark underline
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <style jsx>{`
        .responsive-container {
          width: 100%;
          max-width: 1192px;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
          box-sizing: border-box;
        }
        .responsive-navbar {
          display: flex;
          justify-content: flex-start;
          gap: 40px;
          border-bottom: 1px solid #e0e0e0;
          overflow-x: auto;
        }
        @media (max-width: 700px) {
          .responsive-navbar {
            gap: 16px;
          }
          .responsive-container {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
      `}</style>
      {/* Tab content box */}
      <div style={{
        width: '80%',
        margin: '0 auto',
        background: 'white',
        minHeight: 200,
        borderRadius: 8,
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        padding: 32,
        marginTop: 24,
      }}>
        {renderTabContent()}
      </div>
    </div>
    
  );
}
