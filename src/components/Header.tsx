'use client';

import { usePathname } from "next/navigation";
// import ClientAccountMenu from "./ClientAccountMenu";
import { useSession } from "next-auth/react";
// import CgProfile from "react-icons/cg/CgProfile";
import { RefObject, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import StorageCredits from "./StorageCredits";
import TranscriptionCredits from "./TranscriptionCredits";
import { signOut } from "next-auth/react";
import Image from "next/image";
// import { MdOutlineKeyboardArrowDown } from "react-icons/lib/md/MdOutlineKeyboardArrowDown";
import MeetingModal from "./MeetingModal";

export default function Header() {
  // const { data: session } = useSession();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full min-h-15 bg-[#D9D9D9]/40 flex items-center px-10" ref={headerRef}>
        {/* <p className="w-full [font-family:var(--font-geist-mono),monospace] text-7xl pl-4">{text}</p> */}
        {/* <ClientAccountMenu userName={session?.user?.name || "not found"} /> */}
        <div className="flex-1 flex items-center pr-30">
          {/* <div className="w-full h-10 bg-white rounded-full "></div> */}
          <SearchBar />
        </div>
        <div className="flex flex-row items-center w-max gap-16">
          <StorageCredits />
          <TranscriptionCredits />
          <div className="flex flex-row items-center gap-6 ml-8">
            <Image src="/bell.svg" alt="Bell" width={40} height={40} className="cursor-pointer" />
            <Image 
              src="/calendar.svg" 
              alt="Calendar" 
              width={40} 
              height={40} 
              className="cursor-pointer" 
              onClick={() => setIsMeetingModalOpen(true)}
            />
            <ProfileButton headerRef={headerRef} />
          </div>
        </div>
      </div>
      
      <MeetingModal 
        isOpen={isMeetingModalOpen} 
        onClose={() => setIsMeetingModalOpen(false)} 
      />
    </>
  );
}





function ProfileButton({ headerRef }: { headerRef: RefObject<HTMLDivElement> }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-15 h-15 flex items-center justify-center">
      {expanded &&
        <ProfilePopup headerRef={headerRef} handleClick={() => setExpanded(false)} />
      }
      
      <Image src="/account.svg" alt="Account" width={40} height={40} className="cursor-pointer" onClick={() => setExpanded(!expanded)} />
    </div>
  );
}

function ProfilePopup({ headerRef, handleClick }: { headerRef: RefObject<HTMLDivElement>, handleClick: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const items = [
    {text: "sign out", clickFunc: () => signOut()}
  ];

  useEffect(() => {
    setMounted(true)
  }, []);

  return (
    <div
      className={`fixed transition-all duration-300 w-screen h-screen z-10 ${mounted ? "backdrop-blur-sm" : ""}`}
      style={{ left: 0, top: headerRef.current?.getBoundingClientRect().height }}
      onClick={() => {
        handleClick()
      }}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute top-0 right-0 w-60 h-40
            flex flex-col h-max z-20
            transition-all duration-300 ${mounted ? "opacity-100" : "opacity-0"}
            bg-[#D9D9D9]/40`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-15 px-2">
            <p className="font-mono font-medium text-lg">{session?.user?.name || 'User'}</p>
            <p className="font-mono text-sm text-[#A1A1A1]">{session?.user?.email || 'user@example.com'}</p>
          </div>
          <div className="w-full h-21 flex flex-col h-max">
            {items.map((item, i) => (
              <button
                key={i}
                className="w-full h-10 hover:bg-[#D9D9D9] p-2"
                onClick={item.clickFunc}
              >
                <p className="w-full text-start font-mono text-sm ">{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    
    </div>
  );
}

type NavOptionType = {
  optionText: string,
  href: string
};
