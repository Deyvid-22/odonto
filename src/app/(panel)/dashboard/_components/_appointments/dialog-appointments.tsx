import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";

import { formatCurrency } from "@/utils/format-currency";

interface DialogAppointmentsProps {
  appointmentId: AppointmentWithService | null;
}

export function DialogAppointments({ appointmentId }: DialogAppointmentsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>
          Veja todos os deetalhes do agendamento
        </DialogDescription>
      </DialogHeader>
      {appointmentId && (
        <article>
          <p>
            <span className="font-bold">Horário:</span> {appointmentId.time}
          </p>
          <p>
            <span className="font-bold">Data de agendamento:</span>{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              timeZone: "UTC",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(appointmentId.appointmentDate)}
          </p>
          <p>
            <span className="font-semibold">Nome:</span> {appointmentId.name}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span>{" "}
            {appointmentId.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {appointmentId.email}
          </p>
          <section className="bg-gray-100 mt-4 p-4">
            <p>
              <span className="font-bold">Serviço:</span>{" "}
              {appointmentId.service.name}
            </p>
            <p>
              <span className="font-bold">Preço:</span>{" "}
              {formatCurrency(appointmentId.service.price / 100)}
            </p>
          </section>
        </article>
      )}
    </DialogContent>
  );
}
