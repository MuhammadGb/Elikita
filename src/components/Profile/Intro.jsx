"use client";

import {
  Label,
  TextInput,
  Select,
  Datepicker,
  Checkbox,
  Button,
  Tooltip,
  Popover,
} from "flowbite-react";
import {
  customInputTheme,
  dropDownTheme,
  checkboxTheme,
  datePickerTheme,
} from "./themes";
import "./styles.css";
import { useEffect, useState, useRef } from "react";
import moment from "moment/moment";
import { errorToastify, successToastify } from "./utils/toastify";
import { basicInfoErr, basicInfoMsg, generateUniqueId } from "./utils/errors";

export default function Intro() {
  return (
    <div className="relative flex flex-col w-full gap-4 pt-4 lg:gap-8">
      <div className="flex flex-col w-full gap-4 mx-auto sm:w-4/5 lg:w-2/3 xl:w-[55%]">
        <p className="text-[16px] lg:text-[20px] font-bold ">
          Welcome to e-Likita Hospital Consultation Assistant
        </p>
        <p className="text-[14px]">
          This guided consultation will help assess your symptoms and provide
          appropriate healthcare recommendations.
        </p>
        <div className="px-3 py-5 text-[#2563eb] bg-[#2563eb1a] border-l-4 rounded-lg border-l-[#2563eb]">
          <p className="text-[14px] ">
            <span className="font-semibold">Important:</span> This tool is for
            guidance only and does not replace professional medical advice. In
            case of emergency, call emergency services immediately.
          </p>
        </div>
        <p className="text-[16px] font-semibold">What to Expect:</p>
        <ul className="flex flex-col gap-2 list-disc list-inside">
          <li className="text-[14px]">5-step guided consultation process</li>
          <li className="text-[14px]">
            Symptom assessment and risk evaluation
          </li>
          <li className="text-[14px]">
            Personalized healthcare recommendations
          </li>
          <li className="text-[14px]">Printable summary for your records</li>
        </ul>
      </div>
    </div>
  );
}
