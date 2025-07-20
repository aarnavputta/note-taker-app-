import Link from "next/link";
import "../globals.css";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import ClientAccountMenu from "./ClientAccountMenu";

const boxLabels = [
  { label: "home.", href: "/homepage/home" },
  { label: "add meeting.", href: "/homepage/add-meeting" },
  { label: "notes.", href: "/homepage/notes" },
  { label: "integrate.", href: "/homepage/integrate" },
  { label: "ask ai.", href: "/homepage/ask-ai" },
  { label: "settings.", href: "/homepage/settings" },
];

export default async function HomepageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  return (
    <div>
      {/* Sidebar */}
      <div className="w-[15%] h-full">
        <Sidebar navOptions={tabs}/>
      </div>

      <div className="w-[85%] h-full flex flex-col">
        {/* Header */}
        <div className="w-full h-[10%]">
          <Header />
        </div>

        {/* Page Content */}
        <div className="w-full h-[90%]">
          {children}
        </div>
      </div>
      {/* Account icon and name with dropdown (client component) */}
      <ClientAccountMenu userName={session?.user?.name || "account"} />
      {/* Main content */}
      <div style={{ marginLeft: '250px' }}>{children}</div>
    </div>
  );
}

function SideBarOption({ text, href }: { text: string, href: string }) {
  return (
    <Link
      className="w-full h-full flex items-center hover:bg-[#bbb]"
      href={href}
    >
      <p className="w-full text-center font-mono text-2xl">{text}</p>
    </Link>
  );
}





