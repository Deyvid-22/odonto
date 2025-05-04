import { getAllService } from "../_data-access/get-all-service";
import { ServicesList } from "./services-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllService({ userId });
  if (!services) return null;

  return <ServicesList services={services.data || []} />;
}
