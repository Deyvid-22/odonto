"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { ptBR } from "date-fns/locale/pt-BR";

registerLocale("ptBr", ptBR);

interface DateTimePickerProps {
  minDate?: Date;
  className?: string;
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({
  className,
  initialDate,
  minDate,
  onChange,
}: DateTimePickerProps) {
  const [startDate, setStartDate] = useState(initialDate || new Date());

  function handleChange(date: Date | null) {
    if (date) {
      console.log(date);
      setStartDate(date);
      onChange(date);
    }
  }

  return (
    <DatePicker
      className={className}
      selected={startDate}
      locale="ptBr"
      minDate={minDate ?? new Date()}
      onChange={handleChange}
      dateFormat="dd/MM/yyyy"
    />
  );
}
