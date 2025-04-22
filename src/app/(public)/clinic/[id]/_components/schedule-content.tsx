"use client";

import Image from "next/image";
import imgtest from "../../../../../../public/foto1.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@prisma/client";

import { useState, useCallback, useEffect } from "react";
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/format-phone";
import { DateTimePicker } from "./date-picker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScheduleTimeList } from "./schedule-time-list";
import { createNewAppointment } from "../_actions/create-appointment";
import { toast } from "sonner";

type UserWithServiceSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface SheduleContentProps {
  clinic: UserWithServiceSubscription;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: SheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;
  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);

      try {
        const dateString = date.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );
        const json = await response.json();
        setLoadingSlots(false);
        return json;
      } catch {
        setLoadingSlots(false);
      }
      return [];
    },

    [clinic.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = clinic.times || [];

        const finelSlots = times.map((time) => {
          return {
            time: time,
            available: !blocked.includes(time),
          };
        });
        setAvailableTimeSlots(finelSlots);
      });
    }
  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime]);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if (!selectedTime) {
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceId: formData.serviceId,
      time: selectedTime,
      date: formData.date,
      clinicId: clinic.id,
    });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Agendamento realizado com sucesso!");
    form.reset();
    setSelectedTime("");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />
      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full mb-8 overflow-hidden border-4 border-white">
              <Image
                src={clinic.image ? clinic.image : imgtest}
                alt="Foto ilustrativa de um profissional de saude"
                fill
                quality={100}
                priority={true}
                className="object-cover"
              />
            </div>
            <h1 className="font-bold text-2xl mb-2">{clinic.name}</h1>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {clinic.address ? clinic.address : "Endereço não informado"}
              </span>
            </div>
          </article>
        </div>
      </section>

      <Form {...form}>
        <section className="max-w-3xl mx-auto w-full mt-6">
          <form
            className="space-y-4 bg-white p-8 border rounded-md shadow-sm"
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Nome completo:</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Digite seu email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="Digite seu telefone (xx) xxxxx-xxxx"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-1">
                  <FormLabel>Data do agendamento: </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      initialDate={new Date()}
                      className="w-full rounded border p-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione o servico: </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o servico" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} ({Math.floor(service.duration / 60)}h{" "}
                            {service.duration % 60}min)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedServiceId && (
              <div className="space-y-4">
                <Label>Horários disponiveis:</Label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  {loadingSlots ? (
                    <p>Carregando horários...</p>
                  ) : availableTimeSlots.length === 0 ? (
                    <p>Nenhum horário disponivel para o servico selecionado</p>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={(time) => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      blockedTimes={blockedTimes}
                      availableTimeSlots={availableTimeSlots}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      requiredSlots={
                        clinic.services.find(
                          (service) => service.id === selectedServiceId
                        )
                          ? Math.ceil(
                              clinic.services.find(
                                (service) => service.id === selectedServiceId
                              )!.duration / 30
                            )
                          : 1
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                type="submit"
                disabled={
                  !watch("name") ||
                  !watch("email") ||
                  !watch("phone") ||
                  !watch("date")
                }
              >
                Realizar Agendamento
              </Button>
            ) : (
              <p className="bg-red-500 text-white text-center py-2 rounded-md">
                A clinica esta fechada nesse momento
              </p>
            )}
          </form>
        </section>
      </Form>
    </div>
  );
}
