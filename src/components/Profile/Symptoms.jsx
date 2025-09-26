"use client";

import {
  Label,
  TextInput,
  Select,
  Datepicker,
  Checkbox,
  Button,
  Textarea,
  RangeSlider,
} from "flowbite-react";
import { customInputTheme, dropDownTheme, checkboxTheme } from "./themes";
import { useState, useEffect } from "react";
import { errorToastify, successToastify } from "./utils/toastify";
import "./styles.css";
import { symptomsInfoErr, symptomsInfoMsg } from "./utils/symptomsErrors";

export default function Symptoms(props) {
  const { patientID, tabsRef, editMode, nxtBtn, activeTab, setNxtBtn } = props;
  const [loadingState, setLoadingState] = useState(false);
  const [errors, setErrors] = useState({ ...symptomsInfoErr });
  const [symptoms, setSymptoms] = useState({
    primarySymptoms: [],
    symptomsDuration: "",
    additionalDetails: "",
    painLevel: 0,
  });

  useEffect(() => {
    if (patientID && editMode) {
      const fetchSymptomsData = async () => {
        try {
          const response = await fetch(`/api/patients`);
          if (response.ok) {
            const data = await response.json();
            setSymptoms(data);
          }
        } catch (error) {
          //errorToastify("Could not load existing symptom data.");
        }
      };
      fetchSymptomsData();
    }
  }, [patientID, editMode]);

  const { primarySymptoms, symptomsDuration, additionalDetails, painLevel } =
    symptoms;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSymptoms((prev) => ({ ...prev, [name]: value }));

    if (Object.keys(errors)?.includes(e.target.name)) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: e?.target?.value ? false : true,
      }));
    }
  };

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    setSymptoms((prev) => {
      const newPrimarySymptoms = checked
        ? [...prev.primarySymptoms, value]
        : prev.primarySymptoms.filter((item) => item !== value);
      setErrors((p) => ({
        ...p,
        primarySymptoms: newPrimarySymptoms.length === 0,
      }));
      return { ...prev, primarySymptoms: newPrimarySymptoms };
    });
  };

  const handlePainLevelChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSymptoms((prev) => ({ ...prev, painLevel: value }));
    setErrors((p) => ({ ...p, painLevel: value === 0 }));
  };

  const handleSubmit = async () => {
    setNxtBtn((prev) => ({ ...prev, symptoms: true }));
    const findErr = {};
    const requiredFields = ["symptomsDuration", "additionalDetails"];

    requiredFields.forEach((field) => {
      if (!symptoms[field]) {
        findErr[field] = true;
      }
    });

    if (symptoms.primarySymptoms.length === 0) {
      findErr.primarySymptoms = true;
    }

    if (symptoms.painLevel === 0) {
      findErr.painLevel = true;
    }

    setErrors((prev) => ({ ...prev, ...findErr }));
    if (Object.values(findErr).includes(true)) {
      //console.log("Validation failed", findErr);
      return;
    }

    if (!patientID) {
      errorToastify("Please complete the Patient Info tab first.");
      return;
    }

    setLoadingState(true);
    symptoms.id = patientID;
    try {
      const response = await fetch(`/api/patients`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symptoms),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to save symptoms.");
      }

      //successToastify("Symptoms saved successfully!");
    } catch (error) {
      //errorToastify(error.message);
    } finally {
      setLoadingState(false);
    }
  };
  useEffect(() => {
    if (activeTab !== 3 && !nxtBtn?.symptoms) return;
    handleSubmit();
  }, [activeTab]);

  return (
    <div className="flex flex-col w-4/5 gap-4 pt-4 mx-auto sm:w-2/3 xl:w-[55%] lg:gap-8 ">
      <p className="text-lg font-semibold text-black">Symptom Assessment</p>

      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>Primary Symptoms (Select all that apply)</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          {errors.primarySymptoms && (
            <span className="text-[11px] text-red-500">
              {symptomsInfoMsg.primarySymptoms}
            </span>
          )}
          <div className="flex flex-col gap-1 mt-3">
            <div
              key="fever"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Fever/High Temperature"
                checked={primarySymptoms.includes("Fever/High Temperature")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Fever/High Temperature
              </Label>
            </div>
            <div
              key="chest-pain"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Chest Pain"
                checked={primarySymptoms.includes("Chest Pain")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Chest Pain
              </Label>
            </div>
            <div
              key="breathing"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Difficulty Breathing"
                checked={primarySymptoms.includes("Difficulty Breathing")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Difficulty Breathing
              </Label>
            </div>
            <div
              key="headache"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Severe Headache"
                checked={primarySymptoms.includes("Severe Headache")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Severe Headache
              </Label>
            </div>
            <div
              key="abdominal-pain"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Abdominal Pain"
                checked={primarySymptoms.includes("Abdominal Pain")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Abdominal Pain
              </Label>
            </div>
            <div
              key="nausea"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Nausea/Vomiting"
                checked={primarySymptoms.includes("Nausea/Vomiting")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Nausea/Vomiting
              </Label>
            </div>
            <div
              key="diarrhea"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Diarrhea"
                checked={primarySymptoms.includes("Diarrhea")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Diarrhea
              </Label>
            </div>
            <div
              key="cough"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Cough"
                checked={primarySymptoms.includes("Cough")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Cough
              </Label>
            </div>
            <div
              key="sore-throat"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Sore Throat"
                checked={primarySymptoms.includes("Sore Throat")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Sore Throat
              </Label>
            </div>
            <div
              key="fatigue"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Fatigue/Weakness"
                checked={primarySymptoms.includes("Fatigue/Weakness")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Fatigue/Weakness
              </Label>
            </div>
            <div
              key="dizziness"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Dizziness"
                checked={primarySymptoms.includes("Dizziness")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Dizziness
              </Label>
            </div>
            <div
              key="skin-rash"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Skin Rash"
                checked={primarySymptoms.includes("Skin Rash")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Skin Rash
              </Label>
            </div>
            <div
              key="joint-pain"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Joint Pain"
                checked={primarySymptoms.includes("Joint Pain")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Joint Pain
              </Label>
            </div>
            <div
              key="back-pain"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Back Pain"
                checked={primarySymptoms.includes("Back Pain")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Back Pain
              </Label>
            </div>
            <div
              key="urinary"
              className="flex items-center px-2 py-4 border rounded-lg hover:border-blue-500"
            >
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Urinary Problems"
                checked={primarySymptoms.includes("Urinary Problems")}
                onChange={handleSymptomChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Urinary Problems
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>How long have you been experiencing these symptoms?</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <Select
            theme={dropDownTheme}
            name="symptomsDuration"
            value={symptomsDuration}
            onChange={(e) => handleChange(e)}
            sizing="sm"
            className="mt-3"
            color={errors?.symptomsDuration ? "failure" : "gray"}
            helperText={
              errors.symptomsDuration && (
                <span className="text-[11px]">
                  {symptomsInfoMsg.symptomsDuration}
                </span>
              )
            }
          >
            <option value="">Select duration</option>
            <option value="Less than 24 hours">Less than 24 hours</option>
            <option value="1-3 days">1-3 days</option>
            <option value="4-7 days">4-7 days</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="More than 2 weeks">More than 2 weeks</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>
                  On a scale of 1 to 10, how would you rate your
                  pain/discomfort?
                </span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <div className="mt-4">
            <RangeSlider
              id="pain-level"
              name="painLevel"
              min={0}
              max={10}
              value={painLevel}
              onChange={handlePainLevelChange}
            />
          </div>
          <p className="mt-2 text-sm text-center text-slate-600">
            Pain Level: {painLevel}
          </p>
          {errors.painLevel && (
            <span className="text-[11px] text-red-500 text-center block">
              {symptomsInfoMsg.painLevel}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center w-full mt-2 lg:mt-0">
        <div className="flex-col w-full">
          <Label
            htmlFor="base"
            className="font-medium min-w-36 text-[12px] text-slate-600"
            value={
              <>
                <span>Additional Details</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <Textarea
            type="text"
            sizing="sm"
            rows={4}
            color={errors?.additionalDetails ? "failure" : "gray"}
            helperText={
              errors.additionalDetails && (
                <span className="text-[11px]">
                  {symptomsInfoMsg.additionalDetails}
                </span>
              )
            }
            name="additionalDetails"
            value={additionalDetails}
            onChange={(e) => handleChange(e)}
            theme={customInputTheme}
            placeholder="Additional Details"
            className="w-full mt-3 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-col w-full gap-2 px-4 py-5 bg-red-100 border-l-4 border-red-600 rounded-xl ">
          <p className="text-base font-semibold text-red-600">
            ⚠️ Urgent Medical Attention Required
          </p>
          <p className="text-sm text-red-600">
            Based on your symptoms, you should seek immediate medical attention.
            Please visit the emergency department or call emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}
