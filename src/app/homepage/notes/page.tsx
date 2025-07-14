"use client";
import { useRef, useState, useEffect } from 'react';

export default function Notes() {
  const [note, setNote] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea as user types
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [note]);

  // Copy note to clipboard
  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
    }
  };

  // Download note as .txt
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([note], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'note.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clear note
  const handleDelete = () => {
    setNote('');
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
    }}>
      <div style={{
        position: 'relative',
        left: 0,
        width: 'calc(100vw - 250px)', // Sidebar is 250px
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
        }}>notes.</span>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 'calc(100vh - 125px)',
      }}>
        <div style={{
          position: 'relative',
          width: 700,
          maxHeight: '80vh',
          background: '#f3f3f3',
          borderRadius: 24,
          boxShadow: '0 0 0 0 rgba(0,0,0,0)',
          marginTop: 32,
          padding: '32px 32px 32px 32px',
          overflowY: 'auto',
        }}>
          {/* Icons */}
          <div style={{
            position: 'absolute',
            top: 24,
            right: 32,
            display: 'flex',
            gap: 20,
          }}>
            <img src="/copy.svg" alt="Copy" title="Copy" style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={handleCopy} />
            <img src="/download-simple.svg" alt="Download" title="Download" style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={handleDownload} />
            <img src="/trash.svg" alt="Delete" title="Delete" style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={handleDelete} />
          </div>
          {/* Textarea */}
          <textarea
            ref={textAreaRef}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Type your notes here..."
            style={{
              width: '100%',
              minHeight: 40,
              resize: 'none',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 20,
              color: '#222',
              padding: 0,
              marginTop: 40,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
} 