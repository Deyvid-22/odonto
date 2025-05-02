"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ReminderContent } from "./reminder-content";
import { useState } from "react";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderLins({ reminder }: ReminderListProps) {
  const router = useRouter();
  const [isDialoOpen, setIsDialogOpen] = useState(false);

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({
      reminderId: id,
    });

    if (response.error) {
      toast.error(response.error);
      router.refresh();
      return;
    }

    toast.success("Lembrete deletado com sucesso!");
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            <h3>Lembrete</h3>
          </CardTitle>
          <Dialog open={isDialoOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[520px]">
              <DialogHeader>
                <DialogTitle>Novo lembrete</DialogTitle>
                <DialogDescription>
                  Criar um novo lembrete pra sua lista
                </DialogDescription>
                <ReminderContent closeDialog={() => setIsDialogOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
            {reminder.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhum lembrete registrado...
              </p>
            )}
            {reminder.map((item) => (
              <article
                key={item.id}
                className="flex flex-row items-center justify-between py-2 bg-yellow-100 mb-2 px-2 rounded-md"
              >
                <p className="text-sm lg:text-base">{item.description}</p>
                <Button
                  size="sm"
                  className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-1"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
