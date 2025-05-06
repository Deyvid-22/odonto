"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";

interface SubscriptionProps {
  type: string;
}

export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      sessionId: "",
      error: "Falha ao ativar plano",
    };
  }

  const finduser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!finduser) {
    return {
      sessionId: "",
      error: "Falha ao encontrar usuário",
    };
  }

  let customerId = finduser?.stripe_customer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: finduser.email,
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripe_customer_id: stripeCustomer.id,
      },
    });

    customerId = stripeCustomer.id;
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price:
            type === "BASIC"
              ? process.env.STRIPE_PLAN_BASIC
              : process.env.STRIPE_PLAN_PROFESSIONAL,
          quantity: 1,
        },
      ],
      metadata: {
        type: type,
      },
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return {
      sessionId: stripeSession.id,
    };
  } catch {
    return {
      sessionId: "",
      error: "Error ao ativar plano",
    };
  }
}
