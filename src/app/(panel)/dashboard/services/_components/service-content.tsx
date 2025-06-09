import { LabelSubscription } from "@/components/ui/label-subscription";
import { getAllService } from "../_data-access/get-all-service";
import { ServicesList } from "./services-list";
import { canPermission } from "@/utils/permissions/canPermission";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllService({ userId });
  const permission = await canPermission({ type: "service" });
  console.log(permission);
  if (!services) return null;

  return (
    <>
      {!permission.hasPermission && (
        <LabelSubscription expired={permission.expired} />
      )}
      <ServicesList services={services.data || []} permission={permission} />
    </>
  );
}
