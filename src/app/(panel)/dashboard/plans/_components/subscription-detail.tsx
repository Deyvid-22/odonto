"use client";

import { Subscription } from "@prisma/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { Button } from "@/components/ui/button";
import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  );

  async function handleManageSubscription() {
    const portal = await createPortalCustomer();

    if (portal.error) {
      toast.error("Erro ao criar portal de pagamento");
      return;
    }

    window.location.href = portal.sessionId as string;
  }

  return (
    <div>
      <Card className="w-full mx-auto px-2">
        <CardHeader>
          <CardTitle className="text-2xl">Seu plano Atual</CardTitle>
          <CardDescription>Sua assinatura está ativa</CardDescription>
          <CardContent className="p-0">
            <div className="flex items-center justify-between ">
              <h3 className="font-bold text-lg md:text-xl">
                {subscription.plan === "BASIC" ? "BASIC" : "PROFESSIONAL"}
              </h3>

              <div className="bg-green-500 text-white px-3 py-1 rounded">
                {subscription.status === "active" ? "ATIVO" : "INATIVO"}
              </div>
            </div>
            <ul className="list-disc  space-y-2">
              {subscriptionInfo &&
                subscriptionInfo?.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-3">
            <Button className="w-full" onClick={handleManageSubscription}>
              Alterar
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
