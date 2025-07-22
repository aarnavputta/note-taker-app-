import HomeNavbar from "@/components/HomeNavbar";
import Image from "next/image";

export default function RecentsPage() {
  return (
    <div className="w-full h-full flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="px-6 py-4">
          <HomeNavbar />
        </div>
        
        {/* Content Containers */}
        <div className="flex-1 px-6 pb-6">
          <div className="flex flex-col gap-6">
            {/* Four empty containers */}
            <div className="w-full h-32 bg-[#d9d9d9]/30 border border-gray-200 rounded-lg shadow-sm hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer"></div>
            <div className="w-full h-32 bg-[#d9d9d9]/30 border border-gray-200 rounded-lg shadow-sm hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer"></div>
            <div className="w-full h-32 bg-[#d9d9d9]/30 border border-gray-200 rounded-lg shadow-sm hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer"></div>
            <div className="w-full h-32 bg-[#d9d9d9]/30 border border-gray-200 rounded-lg shadow-sm hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer"></div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-6">
            <Image 
              src="/down.svg" 
              alt="Scroll down" 
              width={90} 
              height={60} 
              className="opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer" 
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="flex flex-col gap-6">
          {/* Minutes Used Widget */}
          <div className="bg-[#d9d9d9]/30 border border-gray-200 rounded-lg p-4 shadow-sm h-24 hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer">
            <h3 className="font-mono text-sm text-gray-600 mb-2">minutes used this week....</h3>
            <div className="text-center">
              <span className="font-mono text-3xl font-bold text-black">17m</span>
            </div>
          </div>

          {/* Points of Focus Widget */}
          <div className="bg-[#d9d9d9]/30 border border-gray-200 rounded-lg p-4 shadow-sm h-40 hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer">
            <h3 className="font-mono text-sm text-gray-600 mb-3">points of focus:</h3>
            <ul className="space-y-2 mb-2">
              <li className="font-mono text-sm text-black">-gandu nikhil</li>
              <li className="font-mono text-sm text-black">-lauda nikhil</li>
            </ul>
            <button className="text-blue-600 font-mono text-sm hover:text-blue-800">
              View full list →
            </button>
          </div>

          {/* Analytics Widget */}
          <div className="bg-[#d9d9d9]/30 border border-gray-200 rounded-lg p-4 shadow-sm h-44 hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer">
            <h3 className="font-mono text-sm text-gray-600 mb-3">some bs analytics:</h3>
            <div className="flex justify-center">
              <div className="w-24 h-24 relative">
                {/* Pie chart - simplified with colored divs */}
                <div className="absolute inset-0 rounded-full bg-red-500" style={{ clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 rounded-full bg-yellow-500" style={{ clipPath: 'polygon(50% 50%, 0% 100%, 100% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 rounded-full bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 0% 0%, 0% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 rounded-full bg-green-500" style={{ clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%, 50% 50%)' }}></div>
              </div>
            </div>
          </div>

          {/* New Container */}
          <div className="bg-[#d9d9d9]/30 border border-gray-200 rounded-lg p-4 shadow-sm h-32 hover:bg-[#d9d9d9]/40 hover:shadow-md transition-all duration-200 cursor-pointer">
            <h3 className="font-mono text-sm text-gray-600 mb-3">new container:</h3>
            <div className="text-center">
              <span className="font-mono text-lg text-black">Content here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 