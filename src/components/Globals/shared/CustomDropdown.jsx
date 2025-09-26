"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CustomDropdown({
  placeholder,
  handleChange,
  optionList,
  ...props
}) {
  
  return (
    <div>
      <Select
        onValueChange={(value) =>
          handleChange({ target: { name: props.name, value } })
        }
        defaultValue={props.value}
        {...props}
      >
        <SelectTrigger className="text-brand-400 text-sm rounded-[30px] h-[40px] w-[22rem] sm:w-[29rem]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <>
            {optionList.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </>
        </SelectContent>
      </Select>
      {props.error && (
        <div className="px-2 py-1 text-xs text-red-500">{props.error}</div>
      )}
    </div>
  );
}
