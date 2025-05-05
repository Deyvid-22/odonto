import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { getSubscription } from "@/utils/get-subscription";

export default async function Plans() {
  const session = await getSession();
  if (!session) redirect("/");
  const subscription = await getSubscription({
    userId: session.user?.id as string,
  });

  return (
    <div>
      {subscription?.status !== "active" && <GridPlans />}
      {subscription?.status === "active" && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-600">
            Voce ja possui uma assinatura ativa
          </h1>
        </div>
      )}
    </div>
  );
}
