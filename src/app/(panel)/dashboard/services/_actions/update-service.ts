"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "O  id do serviço é obrigatório" }),
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.number().min(1, { message: "O preço é obrigatório" }),
  duration: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateService(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Falha ao atualizar o serviço",
    };
  }

  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  try {
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration < 30 ? 30 : formData.duration,
      },
    });
    revalidatePath("/dashboard/services");
    return { data: "Service atualizado com sucesso" };
  } catch {
    console.log("Falha ao atualizar o serviço");
    return {
      error: "Falha ao atualizar o serviço",
    };
  }
}
