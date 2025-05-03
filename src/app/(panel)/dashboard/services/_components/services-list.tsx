"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@prisma/client";
import { formatCurrency } from "@/utils/format-currency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editService, setEditService] = useState<null | Service>(null);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Servico deletado com sucesso!");
  }

  function handleEditService(service: Service) {
    setEditService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setEditService(null);
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditService(null);
              }}
            >
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditService(null);
                }}
                serviceId={editService ? editService.id : undefined}
                initialValues={
                  editService
                    ? {
                        name: editService.name,
                        price: (editService.price / 100)
                          .toFixed(2)
                          .replace(".", ",")
                          .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                        hours: Math.floor(editService.duration / 60).toString(),
                        minutes: (editService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-5">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex flex-row items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{service.name}</span>
                    <span className="font-medium text-gray-500">-</span>
                    <span className="text-gray-400">
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
