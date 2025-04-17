"use server";

import prisma from "@/lib/prisma";

export async function getAllService({ userId }: { userId: string }) {
  if (!userId) return null;
  try {
    const services = await prisma.service.findMany({
      where: {
        userId: userId,
        status: true,
      },
    });

    if (!services) return null;

    return { data: services };
  } catch {
    return { error: "Ocorreu um erro ao buscar os serviços" };
  }
}
