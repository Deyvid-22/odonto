import { getReminders } from "../../_data_acesss/get-reminders";
import { ReminderLins } from "./reminder-list";

export async function Reminders({ userId }: { userId: string }) {
  const reminders = await getReminders({ userId });

  return <ReminderLins reminder={reminders} />;
}
