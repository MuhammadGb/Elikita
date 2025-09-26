"use client";

import {
  Label,
  TextInput,
  Select,
  Datepicker,
  Checkbox,
  Button,
  Textarea,
} from "flowbite-react";
import { customInputTheme, dropDownTheme, checkboxTheme } from "./themes";
import { useState, useEffect } from "react";
import { errorToastify, successToastify } from "./utils/toastify";
import "./styles.css";
import { patientInfoErr, patientInfoMsg } from "./utils/patientErrors";

export default function PatientInfos(props) {
  const {
    patientID,
    setPatientID,
    tabsRef,
    editMode,
    nxtBtn,
    setNxtBtn,
    setEditMode,
    activeTab,
  } = props;
  const [loadingState, setLoadingState] = useState(false);
  const [errors, setErrors] = useState({ ...patientInfoErr });
  const [patientInfos, setPatientInfos] = useState({
    fullName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    medicalHistory: [],
    currentMedications: "",
  });

  useEffect(() => {
    if (patientID && editMode) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`/api/patients`);
          if (!response.ok) {
            throw new Error("Failed to fetch patient data");
          }
          const data = await response.json();
          setPatientInfos(data);
        } catch (error) {
          //errorToastify(error.message);
        }
      };
      fetchPatientData();
    }
  }, [patientID, editMode]);

  const {
    fullName,
    age,
    gender,
    phoneNumber,
    medicalHistory,
    currentMedications,
  } = patientInfos;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfos((prev) => ({ ...prev, [name]: value }));

    if (Object.keys(errors)?.includes(e.target.name)) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: e?.target?.value ? false : true,
      }));
    }
  };

  const handleMedicalHistoryChange = (e) => {
    const { value, checked } = e.target;
    setPatientInfos((prev) => {
      const newMedicalHistory = checked
        ? [...prev.medicalHistory, value]
        : prev.medicalHistory.filter((item) => item !== value);
      return { ...prev, medicalHistory: newMedicalHistory };
    });
  };

  const handleSubmit = async () => {
    setNxtBtn((prev) => ({ ...prev, patientInfo: true }));
    const findErr = {};
    const requiredFields = [
      "fullName",
      "age",
      "gender",
      "phoneNumber",
      "currentMedications",
    ];

    requiredFields.forEach((field) => {
      if (!patientInfos[field]) {
        findErr[field] = true;
      }
    });

    setErrors((prev) => ({ ...prev, ...findErr }));
    if (Object.values(findErr).includes(true)) {
      // console.log("Validation failed", findErr);
      return;
    }

    setLoadingState(true);

    try {
      const url = "/api/patients";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientInfos),
      });

      const result = await response.json();

      successToastify(
        `Patient profile ${editMode ? "updated" : "created"} successfully!`
      );

      if (!editMode && result.id) {
        // If we created a new patient, update the ID in the parent and move to the next tab
        setPatientID(result.id);
        setEditMode(true);
      }
    } catch (error) {
      //errorToastify(error.message);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 2 && !nxtBtn?.patientInfo) return;
    handleSubmit();
  }, [activeTab]);

  return (
    <div className="flex flex-col w-4/5 gap-4 pt-4 mx-auto sm:w-2/3 xl:w-[55%] lg:gap-8 ">
      <p className="text-lg font-semibold text-black">Patient Information</p>
      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>Full Name</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <TextInput
            type="text"
            name="fullName"
            color={errors?.fullName ? "failure" : "gray"}
            helperText={
              errors.fullName && (
                <span className="text-[11px]">{patientInfoMsg.fullName}</span>
              )
            }
            value={fullName || ""}
            onChange={(e) => handleChange(e)}
            sizing="sm"
            theme={customInputTheme}
            placeholder="Input first name"
            className="mt-3"
          />
        </div>
      </div>{" "}
      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>Age</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <TextInput
            type="number"
            name="age"
            color={errors?.age ? "failure" : "gray"}
            helperText={
              errors.age && (
                <span className="text-[11px]">{patientInfoMsg.age}</span>
              )
            }
            value={age || ""}
            onChange={(e) => handleChange(e)}
            sizing="sm"
            theme={customInputTheme}
            placeholder="Input your age"
            className="mt-3"
          />
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>Gender</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <Select
            theme={dropDownTheme}
            name="gender"
            value={gender || ""}
            onChange={(e) => handleChange(e)}
            sizing="sm"
            className="mt-3"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
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
                <span>Phone Number</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <TextInput
            type="text"
            name="phoneNumber"
            color={errors?.phoneNumber ? "failure" : "gray"}
            helperText={
              errors.phoneNumber && (
                <span className="text-[11px]">
                  {patientInfoMsg.phoneNumber}
                </span>
              )
            }
            value={phoneNumber || ""}
            onChange={(e) => handleChange(e)}
            sizing="sm"
            theme={customInputTheme}
            placeholder="Input your phone number"
            className="mt-3"
          />
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="flex-col w-full ">
          <Label
            htmlFor="small"
            className="font-medium min-w-32 text-[12px] text-slate-600"
            value={
              <>
                <span>Medical History</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center px-2 py-4 mt-3 border rounded-lg hover:border-blue-500">
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Diabetes"
                checked={medicalHistory.includes("Diabetes")}
                onChange={handleMedicalHistoryChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Diabetes
              </Label>
            </div>
            <div className="flex items-center px-2 py-4 mt-3 border rounded-lg hover:border-blue-500">
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="High Blood Pressure"
                checked={medicalHistory.includes("High Blood Pressure")}
                onChange={handleMedicalHistoryChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                High Blood Pressure
              </Label>
            </div>
            <div className="flex items-center px-2 py-4 mt-3 border rounded-lg hover:border-blue-500">
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Heart Disease"
                checked={medicalHistory.includes("Heart Disease")}
                onChange={handleMedicalHistoryChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Heart Disease
              </Label>
            </div>
            <div className="flex items-center px-2 py-4 mt-3 border rounded-lg hover:border-blue-500">
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Asthma"
                checked={medicalHistory.includes("Asthma")}
                onChange={handleMedicalHistoryChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Asthma
              </Label>
            </div>
            <div className="flex items-center px-2 py-4 mt-3 border rounded-lg hover:border-blue-500">
              <Checkbox
                className="mr-2"
                theme={checkboxTheme}
                value="Known Allergies"
                checked={medicalHistory.includes("Known Allergies")}
                onChange={handleMedicalHistoryChange}
              />
              <Label className="font-medium text-[11px] text-slate-600">
                Known Allergies
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full mt-2 lg:mt-0">
        <div className="flex-col w-full">
          <Label
            htmlFor="base"
            className="font-medium min-w-36 text-[12px] text-slate-600"
            value={
              <>
                <span>Current Medications</span>
                <span className="text-sm text-red-600">*</span>
              </>
            }
          />
          <Textarea
            type="text"
            sizing="sm"
            color={errors?.currentMedications ? "failure" : "gray"}
            helperText={
              errors.currentMedications && (
                <span className="text-[11px]">
                  {patientInfoMsg.currentMedications}
                </span>
              )
            }
            rows={4}
            name="currentMedications"
            value={currentMedications || ""}
            onChange={(e) => handleChange(e)}
            theme={customInputTheme}
            placeholder="List any medications you are currently taking"
            className="w-full mt-3 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
