'use client';

import { usePathname } from "next/navigation";

export default function Header() {
  return (
    <div className="w-full h-full bg-[#D9D9D9]/20 flex items-center px-10">
      {/* <p className="w-full [font-family:var(--font-geist-mono),monospace] text-7xl pl-4">{text}</p> */}
      <p className="w-full font-mono text-7xl"></p>
    </div>
  );
}

type NavOptionType = {
  optionText: string,
  href: string
}
