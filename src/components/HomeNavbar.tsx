"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HomeNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(() => {
    if (pathname.includes('/analytics')) return 'analytics';
    return 'recents';
  });

  const handleTabClick = (tab: string) => {
    setSelected(tab);
    if (tab === 'recents') {
      router.push('/homepage/home/recents');
    } else {
      router.push('/homepage/home/analytics');
    }
  };

  return (
    <div className="w-full flex justify-start border-b border-gray-200">
      <div className="flex gap-10">
        <button
          onClick={() => handleTabClick('recents')}
          className={`font-mono text-2xl pb-2 px-2 transition-all duration-200 cursor-pointer ${
            selected === 'recents' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          recents
        </button>
        <button
          onClick={() => handleTabClick('analytics')}
          className={`font-mono text-2xl pb-2 px-2 transition-all duration-200 cursor-pointer ${
            selected === 'analytics' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          analytics
        </button>
      </div>
    </div>
  );
} 