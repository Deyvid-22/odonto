"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

const formSchema = z.object({
  appointmentId: z
    .string()
    .min(1, { message: "Você precisa informar o id do agendamento" }),
});
type FormSchema = z.infer<typeof formSchema>;

export async function cancelAppontments(formData: FormSchema) {
  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Usuario nao encontrado",
    };
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: formData.appointmentId,
      },
    });

    revalidatePath("/dashboard");
    return { data: "Agendamento cancelado com sucesso!" };
  } catch {
    return {
      error: "Error ao cancelar agendamento",
    };
  }
}
