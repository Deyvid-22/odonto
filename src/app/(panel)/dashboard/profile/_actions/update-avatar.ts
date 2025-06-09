"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfileAvatar({ avataUrl }: { avataUrl: string }) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Usuario não encontrado",
    };
  }
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: avataUrl,
      },
    });
    revalidatePath("dashboard/profile");
  } catch {
    return {
      error: "Error ao atualizar avatar",
    };
  }
}
