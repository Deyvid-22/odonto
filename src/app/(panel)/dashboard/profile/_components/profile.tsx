"use client";

import { ProfileFormData, useProfileForm } from "./profile-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// import Image from "next/image";
// import imgText from "../../../../../../public/foto1.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { UpdateProfile } from "../_actions/update_profile";
import { toast } from "sonner";
import { formatPhone } from "@/utils/format-phone";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AvatarProfile } from "./profile-avatar";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    user.times ?? []
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const { update } = useSession();

  const router = useRouter();

  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone,
  });

  function generateTimeSlots(): string[] {
    const hours: string[] = [];
    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }

  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Campo_Grande") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Rio_Branco") ||
      zone.startsWith("America/Boa_Vista") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Brasilia")
  );

  async function onSubmit(values: ProfileFormData) {
    const response = await UpdateProfile({
      name: values.name,
      adress: values.address,
      phone: values.phone,
      status: values.status === "active" ? true : false,
      timeZone: values.timeZone,
      times: selectedHours || [],
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Perfil atualizado com sucesso!");
  }

  async function handleLogout() {
    await signOut();
    await update();
    router.push("/");
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col justify-center">
                <AvatarProfile avatarUrl={user.image} userId={user.id} />
                <div className="space-y-10 mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold mt-2">
                          Nome completo
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este será o seu nome visível na plataforma.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold mt-2">
                          Endereço completo
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este sera seu endereço visível na plataforma.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold mt-2">
                          Digite seu telefone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(57) 99999-9999"
                            {...field}
                            onChange={(e) => {
                              const formatValue = formatPhone(e.target.value);
                              field.onChange(formatValue);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Este será o seu telefone visível na plataforma.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold mt-2">
                          status da clinica
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value === "active" ? "active" : "inactive"
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o status da clinica" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">
                                Ativo (clinica aberta)
                              </SelectItem>
                              <SelectItem value="inactive">
                                Inativo (clinica fechada)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          O status sinaliza se a clinica esta aberta ou fechada
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>Configurar o horario da clinica</Label>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="justify-between">
                          Clique aqui para selecior o horarios
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Horários da clinica</DialogTitle>
                          <DialogDescription>
                            Selecione o horario da clinica
                          </DialogDescription>
                        </DialogHeader>
                        <section className="py-4">
                          <p className="text-sm text-foreground mb-2">
                            Clique nos horários abaixo para marcar ou desmarcar:
                          </p>
                          <div className="grid grid-cols-5 gap-2">
                            {hours.map((hour) => (
                              <Button
                                key={hour}
                                variant={"outline"}
                                className={cn(
                                  "h-10",
                                  selectedHours.includes(hour) &&
                                    "border-3 border-emerald-300 text-primary"
                                )}
                                onClick={() => toggleHour(hour)}
                              >
                                {hour}
                              </Button>
                            ))}
                          </div>
                        </section>
                        <Button
                          className="w-full"
                          onClick={() => setDialogOpen(false)}
                        >
                          Fechar modal
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold mt-2">
                        Selecion o fuso horário
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o seu fuso horario" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-4 bg-emerald-400" type="submit">
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      <section className="mt-4">
        <Button variant="destructive" onClick={handleLogout}>
          Sair da conta
        </Button>
      </section>
    </div>
  );
}
