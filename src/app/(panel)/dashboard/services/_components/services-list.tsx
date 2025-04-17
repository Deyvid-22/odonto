"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@prisma/client";
import { formatCurrency } from "@/utils/format-currency";
interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <DialogContent>
              <DialogService closeModal={() => setIsDialogOpen(false)} />
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
                    <Button variant="ghost" onClick={() => {}}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => {}}>
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
