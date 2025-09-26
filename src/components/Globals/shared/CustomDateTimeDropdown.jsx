"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import Time from "@/components/frontdesk/Dashboard/Appointment/Time";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import CustomTime from "./CustomTime";
import { ChevronDown } from "lucide-react";

export default function CustomDateTimeDropdown({
  placeholder,
  name,
  handleChange,
  error,
}) {
  const times = ["12:30", "1:00", "8:30", "9:00"];
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const dateTime = date
    ? `${format(date, "MMM dd, yyyy") + " / " + selectedTime}`
    : "";
  useEffect(() => {
    handleChange({
      target: { name: name, value: dateTime },
    });
  }, [date, selectedTime]);
  return (
    <Popover>
      <div>
        <PopoverTrigger asChild>
          <Input
            rightIcon={<ChevronDown className="w-4 h-4 opacity-50" />}
            className="text-brand-400 text-sm"
            editable={false}
            type="text"
            placeholder={placeholder}
            value={
              date
                ? `${format(date, "MMM dd, yyyy") + " / " + selectedTime}`
                : ""
            }
          />
        </PopoverTrigger>
        {error && <div className="text-red-500 text-xs py-1 px-2">{error}</div>}
      </div>

      <PopoverContent className="flex w-[100%] shadow-none border-0 items-start p-0 bg-transparent space-x-4">
        <Calendar
          disablePastDates={true}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white"
        />
        <div className="bg-white p-4 w-[200px] max-w-{200px} rounded-lg shadow-sm">
          <p>Set time</p>
          <CustomTime
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            times={times}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
