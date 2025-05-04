import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export function ButtonPickerAppointments() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value);

    const url = new URL(window.location.href);
    url.searchParams.set("date", event.target.value);
    window.history.pushState({}, "", url);
    router.push(url.toString());
  }

  return (
    <input
      type="date"
      value={selectedDate}
      id="start"
      className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
      onChange={handleChangeDate}
    />
  );
}
