import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";
import { Suspense } from "react";

export default async function Service() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <Suspense
      fallback={<div className="absolute top-1/2 left-1/2">Carregando...</div>}
    >
      <ServiceContent userId={session.user?.id as string} />
    </Suspense>
  );
}
