'use client';

import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


export default function StorageCredits() {
  // Free users get 10MB of storage
  const [mbUsed, setMBUsed] = useState(0.0);

  useEffect(() => {
    const userID = "testuser";

    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}/storage`);
      // const res = await fetch(`http://localhost:3001/users/${userID}/storage`);

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

  return (
    <div className="w-50 h-15 flex flex-col">
      <button
        className="w-full h-1/2 flex flex-row items-center gap-1"
      >
        <p className="font-mono text-sm">Storage Left</p>
        <div className="flex-1">
          <MdOutlineKeyboardArrowDown size={15}/>
        </div>
      </button>
      <div className="w-full h-1/2 flex items-center">
        <div className="w-full h-2/3 rounded-full bg-white">
          <div className={`h-full rounded-full bg-[#95CBED] transition-[width] duration-500`} style={{ width: `${Math.round(percentageUsed)}%` }}>

          </div>
        </div>
      </div>
    </div>
  );
}
