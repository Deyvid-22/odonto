"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@prisma/client";
import { createSubscription } from "../_actions/create-subscription";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleClick() {
    const { sessionId, error } = await createSubscription({
      type,
    });

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Assinatura criada com sucesso!");
    const stripe = await getStripeJs();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: sessionId });
    }
  }

  return (
    <Button
      className={`w-full ${
        type == "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-400"
      }`}
      onClick={handleClick}
    >
      Ativar assinatura
    </Button>
  );
}
