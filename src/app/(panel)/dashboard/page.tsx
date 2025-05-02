import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/");

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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>Agenda</div>
        <Reminders userId={session.user?.id as string} />
      </section>
    </main>
  );
}
