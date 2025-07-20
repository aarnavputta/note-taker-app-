'use client';

import { useState } from "react";

export default function AddMeetingButton({ className="" }: { className?: string }) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {/* Popup */}
      {clicked && <MeetingPopup setClicked={setClicked} />}

      {/* Button */}
      <button
        className={`w-40 h-20 rounded-full border border-[#111] flex items-center ${className}`}
        onClick={() => setClicked(!clicked)}
      >
        {/* <p className="w-full text-center [font-family:var(--font-geist-mono),monospace]">Add Meeting</p> */}
        <p className="w-full text-center font-mono text-2xl">Add Meeting</p>
      </button>
    </>
  );
}

function MeetingPopup({ setClicked }: { setClicked: (bool: boolean) => void }) {
  const [meetingType, setMeetingType] = useState("");
  const [meetingID, setMeetingID] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [statusText, setStatusText] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`Meeting Type: ${meetingType}`);
    console.log(`Meeting ID: ${meetingID}`);
    console.log(`Meeting Password: ${meetingPassword}`);

    if(meetingType && meetingID && meetingPassword) {
      // const formData = new FormData();
      // formData.append("platform", meetingType);
      // formData.append("meetingID", meetingID);
      // formData.append("meetingPassword", meetingPassword);
      // formData.append("userID", "testuser");
      const bodyJSON = {
        platform: meetingType,
        meetingID: meetingID,
        meetingPassword: meetingPassword,
        userID: "testuser"
      };

      const res = await fetch("http://localhost:3001/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyJSON)
      });

      if(!res.ok) {
        const data = await res.json();
        setStatusText(`Error Joining Meeting: ${data.error}`);
      } else {
        const data = await res.json();
        setStatusText(`Joined Meeting, ${data.message}`);
      }
    } else {
      setStatusText("Invalid Inputs");
    }
  }

  return (
    <div
      className="fixed w-screen h-screen backdrop-blur-sm z-20 top-0 left-0 flex items-center justify-center"
      // onClick={() => setClicked(false)}
    >
      <div className="w-1/2 h-3/5 rounded-3xl bg-[#D9D9D9]/20 border border-black flex flex-col">
        {/* Header Text */}
        <div className="w-full h-[10%] rounded-t-3xl bg-[#D9D9D9] flex flex-row items-center">
          <div className="w-[7.5%]"/>
          <p className="w-[85%] text-left font-mono text-3xl">Tell us about your meeting.</p>
          <button
            className="flex w-[7.5%] items-center"
            onClick={() => setClicked(false)}
          >
            <p className="w-full text-center text-4xl">x</p>
          </button>
        </div>

        <div className="w-full h-[90%] flex flex-col items-center justify-center gap-5">
          <div className="w-1/2 h-[15%] flex flex-col">
            <div className="w-full h-1/3 flex items-center px-5">
              <p className="font-mono">Meeting Type</p>
            </div>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className="w-full h-2/3 rounded-full bg-[#D9D9D9]/40 px-5 font-mono text-lg"
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="googlemeet" className="text-red-500">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
          
          <div className="w-1/2 h-[15%] flex flex-col">
            <div className="w-full h-1/3 flex items-center px-5">
              <p className="font-mono">Meeting ID</p>
            </div>
            <input
              className="w-full h-2/3 rounded-full bg-[#D9D9D9]/40 px-5 font-mono text-xl"
              type="text"
              placeholder="id"
              value={meetingID}
              onChange={(e) => setMeetingID(e.target.value)}
            />
          </div>

          <div className="w-1/2 h-[15%] flex flex-col">
            <div className="w-full h-1/3 flex items-center px-5">
              <p className="font-mono">Meeting Password(optional)</p>
            </div>
            <input
              className="w-full h-2/3 rounded-full bg-[#D9D9D9]/40 px-5 font-mono text-xl"
              type="text"
              placeholder="passcode"
              value={meetingPassword}
              onChange={(e) => setMeetingPassword(e.target.value)}
            />
          </div>

          <div className="w-1/2 h-[30%] flex flex-col items-center">
            <p className="w-full h-1/5"></p>
            <button
              className="w-full h-1/3 rounded-full bg-[#D9D9D9] flex items-center"
              onClick={handleSubmit}
            >
              <p className="w-full text-center font-mono text-xl">Join Meeting</p>
            </button>
            <p className="w-full h-1/6 text-center text-red-500">{statusText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
