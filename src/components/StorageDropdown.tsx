"use client";
import { useState } from "react";

export default function StorageDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative flex items-center cursor-pointer select-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <span className="font-mono text-lg mr-2">Storage Left</span>
      <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      {/* Storage bar (placeholder) */}
      <div className="ml-4 w-40 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-200" style={{ width: '40%' }} />
      </div>
      {open && (
        <div className="absolute left-0 top-8 min-w-[140px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          <button
            className="w-full text-left px-4 py-2 font-mono text-base hover:bg-gray-100 focus:outline-none"
            onClick={() => {/* Add storage logic here */}}
          >
            Add storage
          </button>
        </div>
      )}
    </div>
  );
} 