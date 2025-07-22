'use client';

import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function StorageCredits() {
  // Free users get 10MB of storage
  const [mbUsed, setMBUsed] = useState(0.0);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number}>({top: 0, left: 0});

  useEffect(() => {
    const userID = "testuser";
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}/storage`);
      if(res.ok) {
        const data = await res.json();
        setMBUsed(data.totalSizeMB);
        console.log(`Storage Used: ${data.totalSizeMB}MB`);
      } else {
        console.log(`Failed to fetch storage used`);
      }
    };
    fetchData();
  }, []);

  const totalMB = 10;
  const percentageUsed = (mbUsed / totalMB) * 100;

  // When opening, set dropdown position
  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(true);
  };

  return (
    <div className="w-50 h-15 flex flex-col relative" ref={buttonRef}>
      <button
        className="w-full h-1/2 flex flex-row items-center gap-1"
        onClick={open ? () => setOpen(false) : handleOpen}
        type="button"
      >
        <p className="font-mono text-sm">Storage Left</p>
        <div className="flex-1">
          <MdOutlineKeyboardArrowDown size={15}/>
        </div>
      </button>
      <div className="w-full h-1/2 flex items-center">
        <div className="bg-white" style={{ width: 245, height: 16, borderRadius: 5 }}>
          <div className={`h-full rounded-[5px] bg-[#95CBED] transition-[width] duration-500`} style={{ width: `${Math.round(percentageUsed)}%` }}>
          </div>
        </div>
      </div>
      {open && (
        <StoragePopup handleClose={() => setOpen(false)} pos={dropdownPos} />
      )}
    </div>
  );
}

function StoragePopup({ handleClose, pos }: { handleClose: () => void, pos: {top: number, left: number} }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      handleClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClose]);

  return (
    <div
      className={`fixed transition-all duration-300 z-10 ${mounted ? "backdrop-blur-sm" : ""}`}
      style={{ left: 0, top: 80, width: '100vw', height: 'calc(100vh - 80px)' }}
      onClick={() => {
        handleClose()
      }}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute w-60 h-40
            flex flex-col h-max z-20
            transition-all duration-300 ${mounted ? "opacity-100" : "opacity-0"}
            bg-[#D9D9D9]/40`}
          style={{ top: pos.top - 80, left: pos.left }}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full h-15 px-2">
            <p className="font-mono font-medium text-lg">Storage Left</p>
            <p className="font-mono text-sm text-[#A1A1A1]">4.2 MB available</p>
          </div>
          <div className="w-full h-21 flex flex-col h-max">
            <button
              className="w-full h-10 hover:bg-[#D9D9D9] p-2"
              onClick={() => {/* Add storage logic here */}}
            >
              <p className="w-full text-start font-mono text-sm">Add storage</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


