"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().min(1, { message: "O email é obrigatório" }),
  phone: z.string().min(1, { message: "O telefone é obrigatório" }),
  date: z.date(),
  serviceId: z.string().min(1, { message: "O serviço e obrigatorio" }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function useAppointmentForm() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      date: new Date(),
    },
  });
}
