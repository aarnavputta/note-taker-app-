"use client";
import { useState } from 'react';

export default function AddMeeting() {
  const [selected, setSelected] = useState('new');
  const [popupOpen, setPopupOpen] = useState(false);
  const [meetingType, setMeetingType] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingPasscode, setMeetingPasscode] = useState('');
  const [name, setName] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const navItems = [
    { label: 'new meeting', key: 'new' },
    { label: 'calendar', key: 'calendar' },
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blur overlay when popup is open */}
      {popupOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.08)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
        }} />
      )}
      {/* Remove the account icon and name section from this file */}
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
        }}>add meeting.</span>
      </div>
      {/* NavBar */}
      <div style={{
        width: '90%',
        maxWidth: '1600px',
        margin: '0 auto',
        paddingLeft: 16,
        paddingRight: 16,
        boxSizing: 'border-box',
      }}>
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
                  marginBottom: '-1px',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* Row directly under nav for invite to meeting */}
        {selected === 'new' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 48, marginLeft: 0 }}>
            <div
              tabIndex={0}
              role="button"
              onClick={() => setPopupOpen(true)}
              style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: 18,
                color: '#111',
                cursor: 'pointer',
                padding: '6px 16px 4px 8px',
                borderBottom: '2px solid #e0e0e0',
                flex: 'none',
                lineHeight: 1.2,
                minWidth: 0,
                textAlign: 'left',
                width: 260,
                background: 'none',
                transition: 'background 0.15s',
                borderRadius: 0,
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                boxShadow: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#bdbdbd'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
              onFocus={e => e.currentTarget.style.background = '#bdbdbd'}
              onBlur={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ flex: 1 }}>invite to meeting</span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  cursor: 'pointer',
                  userSelect: 'none',
                  marginLeft: 12,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 0,
                  boxShadow: 'none',
                }}
              >
                +
              </span>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
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
        }
      `}</style>
      {/* Tab content */}
      <div style={{
        width: '80%',
        margin: '0 auto',
        background: 'white',
        minHeight: 200,
        borderRadius: 8,
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        padding: 32,
        marginTop: 24,
        position: 'relative',
      }}>
        {selected === 'calendar' && (
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 20, color: '#888' }}>
            Integrate will your google calendar. Coming Soon...
          </div>
        )}
      </div>
      {/* Popup for meeting details */}
      {popupOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
        }}>
          <div style={{
            background: '#f3f3f3',
            borderRadius: 20,
            boxShadow: 'none',
            padding: 0,
            minWidth: 520,
            minHeight: 420,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            {/* Popup header */}
            <div style={{
              width: '100%',
              background: '#e0e0e0',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              padding: '22px 0 18px 32px',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 24,
              color: '#222',
              textAlign: 'left',
              position: 'relative',
              boxSizing: 'border-box',
            }}>
              tell us about your meeting.
              {/* X icon */}
              <button
                onClick={() => setPopupOpen(false)}
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  zIndex: 10,
                }}
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            {/* Popup form */}
            <form
              onSubmit={e => { e.preventDefault(); setPopupOpen(false); }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18, padding: '36px 48px 40px 48px', boxSizing: 'border-box' }}>
              <label style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222' }}>
                meeting name<span style={{ color: 'red' }}>*</span>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    marginTop: 6,
                    marginBottom: 8,
                    padding: '8px 12px',
                    borderRadius: 16,
                    border: 'none',
                    background: 'rgba(217,217,217,0.6)',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: 16,
                    color: '#222',
                  }}
                />
              </label>
              <label style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222', position: 'relative', display: 'block' }}>
                meeting type<span style={{ color: 'red' }}>*</span>
                <div style={{ position: 'relative', width: '100%' }}>
                  <select
                    value={meetingType}
                    onChange={e => setMeetingType(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      marginTop: 6,
                      marginBottom: 8,
                      padding: '8px 12px',
                      borderRadius: 16,
                      border: 'none',
                      background: 'rgba(217,217,217,0.6)', // #D9D9D9 at 60% opacity
                      fontFamily: 'Geist Mono, monospace',
                      fontSize: 16,
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      outline: 'none',
                      color: '#222',
                      boxShadow: 'none',
                      paddingRight: 36, // space for arrow
                    }}
                  >
                    <option value="" disabled>Select type</option>
                    <option value="zoom">Zoom</option>
                    <option value="google meet">Google Meet</option>
                    <option value="teams">Teams</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <span style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18"><polyline points="4,7 9,12 14,7" style={{ fill: 'none', stroke: '#111', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} /></svg>
                  </span>
                </div>
              </label>
              <label style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222' }}>
                meeting id<span style={{ color: 'red' }}>*</span>
                <input
                  type="text"
                  value={meetingId}
                  onChange={e => setMeetingId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    marginTop: 6,
                    marginBottom: 8,
                    padding: '8px 12px',
                    borderRadius: 16,
                    border: 'none',
                    background: 'rgba(217,217,217,0.6)', // #D9D9D9 at 60% opacity
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: 16,
                    color: '#222',
                  }}
                />
              </label>
              <label style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, color: '#222' }}>
                meeting passcode(optional)
                <input
                  type="text"
                  value={meetingPasscode}
                  onChange={e => setMeetingPasscode(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: 6,
                    marginBottom: 8,
                    padding: '8px 12px',
                    borderRadius: 16,
                    border: 'none',
                    background: 'rgba(217,217,217,0.6)', // #D9D9D9 at 60% opacity
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: 16,
                    color: '#222',
                  }}
                />
              </label>
              <button
                type="submit"
                style={{
                  marginTop: 16,
                  width: '100%',
                  padding: '12px 0',
                  background: '#222',
                  color: '#fff',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: 18,
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 