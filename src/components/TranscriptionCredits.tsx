'use client';

import { useEffect, useState } from "react";

export default function TranscriptionCredits() {
  const [creditsUsed, setCreditsUsed] = useState(0);

  useEffect(() => {
    const userID = "testuser";

    const fetchData = async () => {
      // const res = await fetch(`http://localhost:3001/users/${userID}/transcriptions`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}/transcriptions`);

      if(res.ok) {
        const data = await res.json();
        setCreditsUsed(data.transcriptionCount);
        console.log(`Transcriptions: ${data.transcriptionCount}`);
      } else {
        console.log("Error fetching transcription credits");
      }
    };

    fetchData();
  }, []);
  // Free Users get 5 credits
  const totalCredits = 5;

  return (
    <div className="w-45 h-15 flex flex-col">
      <div className="w-full h-1/2 flex items-center">
        <p className="font-mono text-sm">Transcription Credits</p>
      </div>
      <div className="w-full h-1/2 flex items-center">
        <p className="font-mono text-[#A1A1A1] text-sm">{`${totalCredits - creditsUsed} credits left`}</p>
      </div>
    </div>
  );
}