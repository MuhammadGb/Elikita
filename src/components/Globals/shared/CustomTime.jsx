"use client";
import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

const CustomTime = ({ selectedTime, setSelectedTime, times }) => {
  return (
    <div className="overflow-y-auto w-full pt-3 flex flex-col">
      {times.map((time, index) => (
        <div
          key={index}
          className={`p-1 text-sm text-black  rounded-3xl transition-all hover:cursor-pointer hover:bg-brand-1000 mb-1 hover:text-white flex items-center gap-1 ${
            selectedTime === time
              ? "bg-brand-1000 text-white hover:bg-brand-1000 p-1"
              : ""
          }`}
          onClick={() => {
            setSelectedTime(time);
          }}
        >
          {selectedTime === time && (
            <HiOutlineClock className="w-4 h-4 md:w-6 md:h-6" />
          )}
          <span>{time}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomTime;
