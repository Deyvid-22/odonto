"use client";

import { cn } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { TimeSlot } from "./schedule-content";
import {
  isSlotInThePast,
  isSlotSequenceAvailable,
  isToday,
} from "./schedule-utils";

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlots: number;
  blockedTimes: string[];
  availableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}

export function ScheduleTimeList({
  selectedDate,
  availableTimeSlots,
  blockedTimes,
  clinicTimes,
  requiredSlots,
  selectedTime,
  onSelectTime,
}: ScheduleTimeListProps) {
  const dateIsToday = isToday(selectedDate);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {
        const sequenceOk = isSlotSequenceAvailable(
          slot.time,
          requiredSlots,
          clinicTimes,
          blockedTimes
        );

        const slotInpast = dateIsToday && isSlotInThePast(slot.time);
        const slotEnable = slot.available && sequenceOk && !slotInpast;

        return (
          <Button
            onClick={() => slotEnable && onSelectTime(slot.time)}
            type="button"
            variant="outline"
            key={slot.time}
            className={cn(
              "h-10 select-none",
              selectedTime === slot.time &&
                "border-2 border-emerald-500 text-primary",
              !slotEnable && "cursor-not-allowed opacity-50"
            )}
            disabled={!slotEnable}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
