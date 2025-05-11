import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { manageSubscription } from "@/utils/manage-subscription";
import { Plan } from "@prisma/client";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") as string;

  if (!signature) {
    return NextResponse.error();
  }

  const body = await request.text();
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case "customer.subscription.deleted":
      const payment = event.data.object as Stripe.Subscription;
      await manageSubscription(
        payment.id,
        payment.customer as string,
        false,
        true
      );
      break;
    case "customer.subscription.updated":
      const paymentIntent = event.data.object as Stripe.Subscription;
      await manageSubscription(
        paymentIntent.id,
        paymentIntent.customer?.toString() as string,
        false
      );
      break;
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const type = checkoutSession?.metadata?.type
        ? checkoutSession.metadata.type
        : "BASIC";
      if (checkoutSession.subscription && checkoutSession.customer) {
        await manageSubscription(
          checkoutSession.subscription as string,
          checkoutSession.customer?.toString() as string,
          true,
          false,
          type as Plan
        );
      }
      break;
    default:
      console.log(`Event not treated ${event.type}`);
  }
  return new NextResponse("Event received", { status: 200 });
}
