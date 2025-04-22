import { redirect } from "next/navigation";
import { getInfoShedule } from "./_data-acess/get-info-shedule";
import { ScheduleContent } from "./_components/schedule-content";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const user = await getInfoShedule({ userId });

  if (!user) redirect("/");

  return (
    <>
      <ScheduleContent clinic={user} />
    </>
  );
}
