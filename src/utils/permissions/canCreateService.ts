"use server";

import prisma from "@/lib/prisma";
import { Plan, Subscription } from "@prisma/client";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "../plans";
import { checkSubscriptionExpired } from "@/utils/permissions/checkSubscriptionExpired";
import { ResultPermissionProp } from "./canPermission";

export async function canCreateService(
  subscription: Subscription | null,
  session: Session
): Promise<ResultPermissionProp> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
      },
    });

    if (subscription && subscription.status === "active") {
      const plan = subscription.plan;
      const planLimits = await getPlan(plan as Plan);

      console.log("LIMITES DO SEU PLANO: ", planLimits);

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount <= planLimits.maxServices,
        planId: subscription.plan as Plan,
        expired: false,
        plan: PLANS[subscription.plan as Plan],
      };
    }

    const checkUserLimit = await checkSubscriptionExpired(session);

    return checkUserLimit;
  } catch {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: false,
      plan: null,
    };
  }
}
