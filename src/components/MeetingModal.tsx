"use client";

import { useState } from "react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingModal({ isOpen, onClose }: MeetingModalProps) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [meetingPasscode, setMeetingPasscode] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const meetingTypes = [
    { value: "zoom", label: "Zoom" },
    { value: "google-meet", label: "Google Meet" },
    { value: "teams", label: "Microsoft Teams" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ meetingName, meetingType, meetingId, meetingPasscode });
    onClose();
  };

  const handleTypeSelect = (type: string) => {
    setMeetingType(type);
    setShowTypeDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 relative">
          <h2 className="font-mono text-xl text-gray-800">tell us about your meeting.</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-mono text-sm text-gray-800 mb-2">
              meeting name (optional)
            </label>
            <input
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              placeholder="name"
              className="w-full px-4 py-3 bg-gray-200 rounded-xl border-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block font-mono text-sm text-gray-800 mb-2">
              meeting type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="w-full px-4 py-3 bg-gray-200 rounded-xl border-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
              >
                <span className={meetingType ? "text-gray-800" : "text-gray-500"}>
                  {meetingType ? meetingTypes.find(t => t.value === meetingType)?.label : "-- Select an option --"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </button>
              
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {meetingTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleTypeSelect(type.value)}
                      className="w-full px-4 py-2 text-left font-mono text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-mono text-sm text-gray-800 mb-2">
              meeting id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              required
              placeholder="id"
              className="w-full px-4 py-3 bg-gray-200 rounded-xl border-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block font-mono text-sm text-gray-800 mb-2">
              meeting passcode (optional)
            </label>
            <input
              type="text"
              value={meetingPasscode}
              onChange={(e) => setMeetingPasscode(e.target.value)}
              placeholder="passcode"
              className="w-full px-4 py-3 bg-gray-200 rounded-xl border-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-mono text-lg py-3 rounded-xl hover:bg-gray-800 transition-colors mt-6"
          >
            Invite Now
          </button>
        </form>
      </div>
    </div>
  );
} 