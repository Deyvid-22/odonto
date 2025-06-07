"use server";

import prisma from "@/lib/prisma";
import { addDays, isAfter, differenceInDays } from "date-fns";
import { TRIAL_DAYS } from "@/utils/permissions/trial-limits";

export async function checkSubscription(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  if (user.subscription && user.subscription.status === "active") {
    return {
      subscriptionStatus: "ACTIVE",
      message: "Assinatura ativa",
      planId: user.subscription.plan,
    };
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: "EXPIRED",
      message: "Seu plano de teste expirou",
      planId: "TRIAL",
    };
  }

  const dayIsRemaining = differenceInDays(trialEndDate, new Date());

  return {
    subscriptionStatus: "TRIAL",
    message: `Você está no periodo gratuito. faltam ${dayIsRemaining} dias para o seu plano de teste encerrar`,
    planId: "TRIAL",
  };
}
