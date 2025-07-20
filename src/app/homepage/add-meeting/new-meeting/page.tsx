import AddMeetingButton from "@/components/AddMeetingButton";

export default function NewMeetingPage() {
  return (
    <div className="w-full h-full px-4">
      {/* <p>New Meeting Page</p> */}
      <div className="w-full h-[10%] flex items-end">
        {/* <AddMeetingButton className="md:bg-red-500 lg:bg-blue-500 xl:bg-green-500 2xl:bg-indigo-500 w-50 h-20" /> */}
        <AddMeetingButton className="w-30 h-10 2xl:w-50 2xl:h-20" />
      </div>
    </div>
  );
}
