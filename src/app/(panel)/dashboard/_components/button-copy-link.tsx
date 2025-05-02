"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

export function ButtonCopyLink({ userId }: { userId: string }) {
  async function handleCopylink() {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/clinic/${userId}`
    );

    toast.success("Link copiado com sucesso!");
  }

  return (
    <Button onClick={handleCopylink} title="Link do agendamento">
      <LinkIcon className="w-5 h-5" />
    </Button>
  );
}
