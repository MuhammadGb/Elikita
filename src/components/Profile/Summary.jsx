"use client";

import { useState, useEffect } from "react";
import { errorToastify } from "./utils/toastify";
import "./styles.css";
import { Loader } from "lucide-react";

export default function Summary(props) {
  const { patientID } = props;
  const [loadingState, setLoadingState] = useState(true);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    if (patientID) {
      const fetchPatientData = async () => {
        setLoadingState(true);
        try {
          const response = await fetch(`/api/patients/${patientID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: patientID }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch patient summary data");
          }
          const data = await response.json();
          setPatientData(data);
        } catch (error) {
          //errorToastify(error.message);
        } finally {
          setLoadingState(false);
        }
      };
      fetchPatientData();
    } else {
      setLoadingState(false);
    }
  }, [patientID]);

  if (loadingState) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="flex flex-col items-center justify-center w-11/12 gap-4 mx-auto lg:gap-8">
        <p className="text-lg font-semibold text-black">Summary</p>
        <p className="text-center text-gray-500">
          No patient data available. Please complete the previous steps.
        </p>
      </div>
    );
  }

  const {
    fullName,
    age,
    gender,
    primarySymptoms = [],
    symptomsDuration,
    painLevel,
    additionalDetails,
  } = patientData;

  return (
    <div className="flex flex-col w-4/5 gap-6 pt-4 mx-auto sm:w-2/3 xl:w-[55%]">
      <h2 className="text-xl font-bold text-center text-gray-800">
        Consultation Summary
      </h2>

      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="pb-2 mb-4 text-lg font-semibold border-b">
          Patient Details
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <p>
            <strong>Name:</strong> {fullName}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="pb-2 mb-4 text-lg font-semibold border-b">
          Symptom Assessment
        </h3>
        <p>
          <strong>Primary Symptoms:</strong>{" "}
          {primarySymptoms.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Duration:</strong> {symptomsDuration || "N/A"}
        </p>
        <p>
          <strong>Pain Level:</strong> {painLevel} / 10
        </p>
        <p className="mt-2">
          <strong>Additional Details:</strong> {additionalDetails || "N/A"}
        </p>
      </div>
    </div>
  );
}
