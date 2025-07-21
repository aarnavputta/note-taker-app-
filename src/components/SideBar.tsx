'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar({ navOptions }: { navOptions: NavOptionType[] }) {
  const path = usePathname();
  // console.log(`Path: ${path}`);

  return (
    <div className="w-full h-full bg-[#D9D9D9]">
      <div className="w-full h-[10%] flex items-center">
        <p className="w-full [font-family:var(--font-geist-mono),monospace] text-center text-3xl">libello.</p>
      </div>
      <div className="w-full h-[90%] flex flex-col gap-5 py-5">
        {navOptions.map((item, i) => (
          <div key={i} className="w-full h-[8%]">
            <SideBarOption key={i} text={item.optionText} href={item.href} selected={path.startsWith(item.href)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SideBarOption({ text, href, selected }: { text: string, href: string, selected: boolean }) {
  return (
    <Link
      className={`w-full h-full flex items-center ${selected ? "bg-[#bbb]" : "hover:bg-[#bbb]"}`}
      href={href}
    >
      <p className="w-full text-center font-mono text-2xl">{text}</p>
    </Link>
  );
}

type NavOptionType = {
  optionText: string,
  href: string
}
