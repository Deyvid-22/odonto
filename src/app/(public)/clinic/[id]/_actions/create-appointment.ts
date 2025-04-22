"use server";

import prisma from "@/lib/prisma";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email("O email é obrigatório"),
  phone: z.string().min(1, "O telefone é obrigatório"),
  date: z.date(),
  serviceId: z.string().min(1, "O serviço é obrigatório"),
  time: z.string().min(1, "O horário é obrigatório"),
  clinicId: z.string().min(1, "A clínica é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormData) {
  const shema = formSchema.safeParse(formData);

  if (!shema.success) {
    return {
      error: shema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(formData.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month, day, 0, 0, 0);

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceId: formData.serviceId,
        time: formData.time,
        appointmentDate: appointmentDate,
        userId: formData.clinicId,
      },
    });

    return {
      data: newAppointment,
    };
  } catch {
    return {
      error: "Ocorreu um erro ao criar o agendamento",
    };
  }
}
