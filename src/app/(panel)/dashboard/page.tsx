import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/_appointments/appointments";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/");
  const subscription = await checkSubscription(session?.user?.id as string);

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="space-x-4 flex justify-end items-center mb-10">
        <Link href={`/clinic/${session.user?.id}`} target="_blank">
          <Button className="bg-emerald-500 hover:bg-emerald-400 md:flex-[0]">
            <Calendar />
            <span>Novo agendamento</span>
          </Button>
        </Link>
        <ButtonCopyLink userId={session.user?.id as string} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}
      {subscription?.subscriptionStatus === "TRIAL" && (
        <div className="bg-green-600 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:flex-row justify-between gap-2">
          <p>{subscription?.message}</p>
        </div>
      )}

      {subscription?.subscriptionStatus !== "active" && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Appointments userId={session.user?.id as string} />
          <Reminders userId={session.user?.id as string} />
        </section>
      )}
    </main>
  );
}
