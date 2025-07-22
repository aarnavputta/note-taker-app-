"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SettingsNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(() => {
    if (pathname.includes('/security')) return 'security';
    if (pathname.includes('/subscription')) return 'subscription';
    return 'personal';
  });

  const handleTabClick = (tab: string) => {
    setSelected(tab);
    if (tab === 'personal') {
      router.push('/homepage/settings/personal');
    } else if (tab === 'security') {
      router.push('/homepage/settings/security');
    } else {
      router.push('/homepage/settings/subscription');
    }
  };

  return (
    <div className="w-full flex justify-start border-b border-gray-200">
      <div className="flex gap-10">
        <button
          onClick={() => handleTabClick('personal')}
          className={`font-mono text-2xl pb-2 px-2 transition-all duration-200 cursor-pointer ${
            selected === 'personal' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          personal details
        </button>
        <button
          onClick={() => handleTabClick('security')}
          className={`font-mono text-2xl pb-2 px-2 transition-all duration-200 cursor-pointer ${
            selected === 'security' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          security & privacy
        </button>
        <button
          onClick={() => handleTabClick('subscription')}
          className={`font-mono text-2xl pb-2 px-2 transition-all duration-200 cursor-pointer ${
            selected === 'subscription' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-600 hover:text-black'
          }`}
        >
          subscription
        </button>
      </div>
    </div>
  );
} 