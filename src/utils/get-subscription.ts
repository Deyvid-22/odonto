"use server";

import prisma from "@/lib/prisma";
import getsession from "@/lib/getSession";

export async function getSubscription({ userId }: { userId: string }) {
  const session = await getsession();
  if (!session) return null;

  if (!userId) return null;

  try {
    const subscriptions = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!subscriptions) {
      return null;
    }

    return subscriptions;
  } catch (error) {
    console.log(error);
    return null;
  }
}
