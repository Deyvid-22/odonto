"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const reminderShema = z.object({
  description: z.string().min(1, "A descrição do lembrete é obrigatória"),
});

export type ReminderFormdata = z.infer<typeof reminderShema>;

export function useReminderForm() {
  return useForm<ReminderFormdata>({
    resolver: zodResolver(reminderShema),
    defaultValues: {
      description: "",
    },
  });
}
