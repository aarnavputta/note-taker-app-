'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabOption({ text, href }: { text: string, href: string }) {
  const path = usePathname();
  const selected = path === href;

  return (
    <Link className={`w-full h-full flex items-end border-[#111] ${selected ? "border-b-2" : ""}`} href={href}>
      <p className={`w-full text-center font-mono text-2xl ${selected ? "font-medium" : ""}`}>{text}</p>
    </Link>
  );
}
