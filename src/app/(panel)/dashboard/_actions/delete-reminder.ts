"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  reminderId: z
    .string({
      errorMap: () => ({ message: "O  id do reminder é obrigatório" }),
    })
    .min(1, { message: "O  id do reminder é obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function deleteReminder(formData: FormSchema) {
  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: formData.reminderId,
      },
    });

    revalidatePath("/dashboard");

    return { data: "Reminder deleted successfully" };
  } catch {
    return { error: "Error deleting reminder" };
  }
}
