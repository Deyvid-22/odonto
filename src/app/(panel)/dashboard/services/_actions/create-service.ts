"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.number().min(1, { message: "O preço é obrigatório" }),
  duration: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewService(formData: FormSchema) {
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
    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard/services");

    return { data: newService };
  } catch (error) {
    console.log(error);
    return {
      error: "Ocorreu um erro ao Cadastrar o serviço",
    };
  }
}
