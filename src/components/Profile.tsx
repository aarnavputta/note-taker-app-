'use client';

import { useSession } from "next-auth/react";

export default function Profile({ className }: { className: string }) {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full border">

    </div>
  );
}
