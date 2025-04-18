"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "O  id do serviço é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function deleteService(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Usuario nao encontrado",
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
        status: false,
      },
    });

    revalidatePath("/dashboard/services");

    return { data: "Servico deletado com sucesso" };
  } catch {
    return { error: "Ocorreu um erro ao deletar o serviço" };
  }
}
