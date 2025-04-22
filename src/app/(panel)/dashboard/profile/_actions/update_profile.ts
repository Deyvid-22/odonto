"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  adress: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function UpdateProfile(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Usuario não encontrado",
    };
  }

  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: "Preencha todos os campos",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.adress,
        phone: formData.phone,
        status: formData.status,
        timeZone: formData.timeZone,
        times: formData.times || [],
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      data: "Clinica atualizada com sucesso",
    };
  } catch {
    console.log("error");
    return {
      error: "Erro ao atualizar clinica",
    };
  }
}
