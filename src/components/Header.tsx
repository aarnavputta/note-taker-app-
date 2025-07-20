'use client';

import { usePathname } from "next/navigation";
// import ClientAccountMenu from "./ClientAccountMenu";
import { useSession } from "next-auth/react";

export default function Header() {
  // const { data: session } = useSession();

  return (
    <div className="w-full h-full bg-[#D9D9D9]/20 flex items-center px-10">
      {/* <p className="w-full [font-family:var(--font-geist-mono),monospace] text-7xl pl-4">{text}</p> */}
      <p className="w-full font-mono text-7xl"></p>
      {/* <ClientAccountMenu userName={session?.user?.name || "not found"} /> */}
    </div>
  );
}

type NavOptionType = {
  optionText: string,
  href: string
}
