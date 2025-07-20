import Link from "next/link";
import TabOption from "@/components/TabOption";

export default function AddMeetingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const options = [
    { text: "new meeting", href: "/homepage/add-meeting/new-meeting" },
    { text: "calendar", href: "/homepage/add-meeting/calendar" }
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] pl-4 flex flex-row border-b-2 border-[#e0e0e0]">
        {options.map((item, i) => (
          <div key={i} className="w-[12%] h-full">
            <TabOption key={i} text={item.text} href={item.href} />
          </div>
        ))}
      </div>
      <div className="w-full h-[90%]">
        {children}
      </div>
    </div>
  );
}
