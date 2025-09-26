"use client";

import {
  Label,
  TextInput,
  Select,
  Datepicker,
  Checkbox,
  Button,
  Textarea,
  Radio,
} from "flowbite-react";
import { customInputTheme, dropDownTheme, checkboxTheme } from "./themes";
import { useState, useEffect, use } from "react";
import { errorToastify, successToastify } from "./utils/toastify";
import "./styles.css";
import { followUpsErr, followUpsMsg } from "./utils/followUpsErrors";

const questionsData = {
  breathing: {
    title: "Questions about: Difficulty Breathing",
    questions: [
      {
        id: "breathing_onset",
        text: "Did the breathing difficulty start suddenly?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "breathing_activity",
        text: "Does it worsen with activity?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  abdominalPain: {
    title: "Questions about: Abdominal Pain",
    questions: [
      {
        id: "pain_location",
        text: "Where is the pain located?",
        options: [
          { value: "upper-right", label: "Upper-right" },
          { value: "upper-left", label: "Upper-left" },
          { value: "lower-right", label: "Lower-right" },
          { value: "lower-left", label: "Lower-left" },
          { value: "center", label: "Center" },
        ],
      },
      {
        id: "pain_description",
        text: "How would you describe the pain?",
        options: [
          { value: "cramping", label: "Cramping" },
          { value: "sharp", label: "Sharp" },
          { value: "dull", label: "Dull" },
          { value: "burning", label: "Burning" },
        ],
      },
    ],
  },
};

export default function FollowUps(props) {
  const {
    patientID,
    tabsRef,
    editMode,
    mobileWindows,
    handleNext,
    activeTab,
    setNxtBtn,
    nxtBtn,
  } = props;
  const [loadingState, setLoadingState] = useState(false);
  const [errors, setErrors] = useState({ ...followUpsErr });
  const [followUpAnswers, setFollowUpAnswers] = useState({
    breathing_onset: "",
    breathing_activity: "",
    pain_location: "",
    pain_description: "",
  });

  useEffect(() => {
    if (patientID && editMode) {
      const fetchFollowUpsData = async () => {
        try {
          const response = await fetch(`/api/patients/`);
          if (response.ok) {
            const data = await response.json();
            setFollowUpAnswers(data);
          }
        } catch (error) {
          errorToastify("Could not load existing follow-up data.");
        }
      };
      fetchFollowUpsData();
    }
  }, [patientID, editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowUpAnswers((prev) => ({ ...prev, [name]: value }));
    if (Object.keys(errors)?.includes(e.target.name)) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: value ? false : true,
      }));
    }
  };

  const handleSubmit = async () => {
    setNxtBtn((prev) => ({ ...prev, followUps: true }));
    const findErr = {};
    for (const question in followUpAnswers) {
      if (!followUpAnswers[question]) {
        findErr[question] = true;
      }
    }

    setErrors((prev) => ({ ...prev, ...findErr }));
    if (Object.values(findErr).includes(true)) {
      console.log("Validation failed", findErr);
      return;
    }

    if (!patientID) {
      // errorToastify("Please complete the Patient Info tab first.");
      return;
    }

    setLoadingState(true);
    try {
      const response = await fetch(`/api/patients`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: patientID, ...followUpAnswers }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to save follow-up answers.");
      }

      //successToastify("Follow-up answers saved successfully!");
    } catch (error) {
      // errorToastify(error.message);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 4 && !nxtBtn?.followUps) return;
    handleSubmit();
  }, [activeTab]);

  return (
    <div className="flex flex-col w-4/5 gap-4 pt-4 mx-auto sm:w-2/3 xl:w-[55%] lg:gap-8 ">
      <p className="text-lg font-semibold text-black">Follow-up Questions</p>

      {Object.values(questionsData).map((group) => (
        <div key={group.title} className="flex flex-col w-full gap-4 lg:gap-2">
          <p className="text-[18px] font-semibold text-black">{group.title}</p>
          {group.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              selectedValue={followUpAnswers[question.id]}
              error={errors[question.id]}
              onChange={handleChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Question({ question, selectedValue, error, onChange }) {
  return (
    <div className="flex flex-col w-full">
      <Label
        htmlFor={question.id}
        className="font-medium min-w-32 text-[12px] md:text-[14px] text-slate-600 mb-2"
        value={
          <>
            <span>{question.text}</span>
            <span className="text-sm text-red-600">*</span>
          </>
        }
      />
      {error && (
        <span className="text-[11px] text-red-500">
          {followUpsMsg[question.id]}
        </span>
      )}
      {question.options.map((option) => (
        <div
          key={option.value}
          className="flex justify-end w-full px-3 py-4 border rounded-lg hover:bg-gray-50 hover:border-blue-500"
        >
          <div className="flex items-center justify-between w-full lg:w-1/2">
            <Radio
              id={`${question.id}_${option.value}`}
              name={question.id}
              value={option.value}
              onChange={onChange}
              checked={selectedValue === option.value}
            />
            <Label htmlFor={`${question.id}_${option.value}`}>
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
}
