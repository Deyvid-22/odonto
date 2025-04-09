import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserProfileProps {
  name: string | null;
  adress: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
}

const ProfileSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  adress: z.string().optional(),
  phone: z.string().optional(),

  status: z.string(),
  timeZone: z.string().min(1, { message: "O time zone é obrigatório" }),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;

export function useProfileForm({
  name,
  adress,
  phone,
  status,
  timeZone,
}: UserProfileProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: name || "",
      adress: adress || "",
      phone: phone || "",
      status: status ? "active" : "inactive",
      timeZone: timeZone || "",
    },
  });
}
