import { use } from "react"

export default async function MeetingNotesPage({
  params
}: {
  params: Promise<{ meetingid: string }>
}) {
  console.log("Sdfdsfsdfsdfsdf")
  const { meetingid } = await params;
  const userID = "testuser";
  const res = await fetch(`${process.env.API_URL}/users/${userID}/notes/${meetingid}`);
  if(!res.ok) {
    return <p>Couldnt Find Meeting</p>;
  } else {
    const data = await res.json();
    console.log(`Data; ${JSON.stringify(data)}`);
  }

  return (
    <div className="w-full h-full px-10">
      {meetingid}
    </div>
  );
}
