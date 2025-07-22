import React from 'react';

interface TabsNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { label: 'recents', key: 'recents' },
  { label: 'analytics', key: 'analytics' },
];

export default function TabsNavBar({ activeTab, setActiveTab }: TabsNavBarProps) {
  return (
    <div className="w-full flex border-b border-gray-300 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-6 py-2 font-mono text-lg focus:outline-none transition border-b-2 ${
            activeTab === tab.key
              ? 'border-black text-black' // active
              : 'border-transparent text-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 