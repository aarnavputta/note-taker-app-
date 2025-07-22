
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="relative" style={{ width: 458, height: 45 }}>
      <input
        type="text"
        placeholder="search ...."
        className="w-full h-full pl-10 pr-4 rounded-[30px] bg-white text-lg font-mono placeholder:opacity-40 placeholder:text-black focus:outline-none"
        style={{ opacity: 0.9, height: 45 }}
      />
      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40"
      />
    </div>
  );
}
