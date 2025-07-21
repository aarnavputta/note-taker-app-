'use client';

import { usePathname } from "next/navigation";
// import ClientAccountMenu from "./ClientAccountMenu";
import { useSession } from "next-auth/react";
// import CgProfile from "react-icons/cg/CgProfile";
import { CgProfile } from "react-icons/cg";
import { RefObject, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import StorageCredits from "./StorageCredits";
import TranscriptionCredits from "./TranscriptionCredits";
import { signOut } from "next-auth/react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/lib/md/MdOutlineKeyboardArrowDown";

export default function Header() {
  // const { data: session } = useSession();
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full min-h-15 bg-[#D9D9D9]/40 flex items-center px-10" ref={headerRef}>
      {/* <p className="w-full [font-family:var(--font-geist-mono),monospace] text-7xl pl-4">{text}</p> */}
      {/* <ClientAccountMenu userName={session?.user?.name || "not found"} /> */}
      <div className="flex-1 flex items-center pr-30">
        {/* <div className="w-full h-10 bg-white rounded-full "></div> */}
        <SearchBar />
      </div>
      <div className="flex flex-row items-center w-max gap-10">
        <StorageCredits />
        <TranscriptionCredits />
        <ProfileButton headerRef={headerRef} />
      </div>
    </div>
  );
}





function ProfileButton({ headerRef }: { headerRef: RefObject<HTMLDivElement> }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-15 h-15 flex items-center justify-center">
      {expanded &&
        <ProfilePopup headerRef={headerRef} handleClick={() => setExpanded(false)} />
      }
      
      <CgProfile className="w-10 h-10 cursor-pointer" onClick={() => setExpanded(!expanded)} />
    </div>
  );
}

function ProfilePopup({ headerRef, handleClick }: { headerRef: RefObject<HTMLDivElement>, handleClick: () => void }) {
  const [mounted, setMounted] = useState(false);
  const items = [
    {text: "sign out", clickFunc: () => signOut()}
  ];

  useEffect(() => {
    setMounted(true)
  }, []);

  return (
    <div
      className={`fixed transition-all duration-300 w-screen h-screen z-10 ${mounted ? "backdrop-blur-sm" : ""}`}
      style={{ left: 0, top: headerRef.current?.getBoundingClientRect().height}}
      onClick={() => {
        console.log("clicked")
        handleClick()
      }}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute top-0 right-10 w-60 h-40
            flex flex-col h-max z-20
            transition-all duration-300 ${mounted ? "opacity-100" : "opacity-0"}
            bg-[#D9D9D9]/40`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-15 px-2">
            <p className="font-mono font-medium text-lg">Nikhil Jain</p>
            <p className="font-mono text-sm text-[#A1A1A1]">nikhil.ja2004@gmail.com</p>
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
