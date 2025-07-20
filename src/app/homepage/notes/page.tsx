import Link from "next/link";

export default async function NotesPage() {

  let meetingsInfo: MeetingCardPropType[] = [
    { title: "Meeting 1", date: "June 5th 2025", id: "m1" },
    { title: "Meeting 2", date: "June 7th 2025", id: "m2" },
    { title: "Meeting 3", date: "June 12th 2025", id: "m3" },
    { title: "Meeting 4", date: "June 18th 2025", id: "m4" },
    { title: "Meeting 5", date: "June 25th 2025", id: "m5" },
    { title: "Meeting 6", date: "June 30th 2025", id: "m6" },
    { title: "Meeting 7", date: "July 5th 2025", id: "m7" },
    { title: "Meeting 8", date: "July 7th 2025", id: "m8" },
    { title: "Meeting 9", date: "July 8th 2025", id: "m9" },
    { title: "Meeting 10", date: "July 10th 2025", id: "m10" },
    { title: "Meeting 11", date: "July 15th 2025", id: "m11" },
  ];

  const userID = "testuser";
  const res = await fetch(`${process.env.API_URL}/users/${userID}/meetings`);

  if(res.ok) {
    const data = await res.json();
    console.log(`Response: ${JSON.stringify(data)}`);
    meetingsInfo = Object.keys(data.sessions).map((id) => (
      {
        title: data.sessions[id],
        date: "not found",
        id: id
      }
    ));
  } else {
    console.log("error");
  }

  return (
    <div className="w-full h-full px-10">
      {/* Title */}
      <div className="w-full h-[10%] flex items-end">
        <p className="font-mono text-3xl h-12 flex items-center">View Meetings</p>
      </div>

      {meetingsInfo.length == 0
        ? (
          <div className="w-full h-full flex items-center">
            <p className="w-full h-1/3 text-center font-mono text-5xl text-[#A1A1A1]">Start a meeting to view your meeting notes</p>
          </div>
        ) : (
        <div className="w-full h-full grid grid-cols-4 py-12">
          {meetingsInfo.map((item, i) => (
            <MeetingCard key={i} title={item.title} date={item.date} id={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

type MeetingCardPropType = {
  title: string,
  date: string,
  id: string
};

function MeetingCard({ title, date, id }: MeetingCardPropType) {
  return (
    <Link
      className="w-60 h-30 rounded-lg border border-[#A9A9A9] p-2 cursor-pointer bg-[#D9D9D9]/20"
      href={`/homepage/notes/${id}`}
    >
      <p className="font-mono text-black/60 text-2xl font-bold">{title}</p>
      <p className="font-mono text-[#A1A1A1] text-xs">{`Transcribed on ${date}`}</p>
    </Link>
  )
}
