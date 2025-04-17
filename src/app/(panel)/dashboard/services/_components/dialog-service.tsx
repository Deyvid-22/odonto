"use client";
import { useState } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./dialog-service-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { convertRealToCents } from "@/utils/convert-currency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";

interface DialogServiceProps {
  closeModal: () => void;
}

export function DialogService({ closeModal }: DialogServiceProps) {
  const form = useDialogServiceForm({
    initialValues: {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const duration = hours * 60 + minutes;

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration,
    });
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Servico cadastrado com sucesso!");
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;

    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>
          Adicione um novo serviço ao seu perfil.
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do serviço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel>Valor do serviço</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o valor do serviço"
                        onChange={changeCurrency}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-start font-bold">Tempo de duração do serviço</p>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-bold">Horas:</FormLabel>
                    <FormControl>
                      <Input placeholder="1" min="0" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-bold">minutos:</FormLabel>
                    <FormControl>
                      <Input placeholder="1" min="0" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white"
            >
              {loading ? "Cadastrando..." : "Adicionar serviço"}
            </Button>
          </form>
        </Form>
      </DialogHeader>
    </>
  );
}
