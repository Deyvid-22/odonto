import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="w-full h-[600px] mb-10 bg-gray-200"></div>
      <div className="w-full h-[600px] mb-10 bg-gray-200"></div>
    </div>
  );
}
