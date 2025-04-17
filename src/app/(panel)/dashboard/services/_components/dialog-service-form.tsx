import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O preço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface useDialogServiceFormProps {
  initialValues: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialValues,
}: useDialogServiceFormProps) {
  const form = useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });

  return form;
}
