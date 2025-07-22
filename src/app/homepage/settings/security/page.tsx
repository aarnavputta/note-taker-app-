import SettingsNavbar from "@/components/SettingsNavbar";

export default function SecurityPrivacyPage() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
      <div className="px-6 py-4">
        <SettingsNavbar />
      </div>
      
      {/* Content Area */}
      <div className="flex-1 px-6 pb-6">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-mono text-2xl text-gray-600 mb-2">Security & Privacy</h2>
            <p className="font-mono text-sm text-gray-500">Security and privacy settings will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
} 