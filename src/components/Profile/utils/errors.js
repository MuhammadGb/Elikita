import { useEffect, useRef } from "react";

export const basicInfoMsg = {
  firstName: "First name field is required",
  //otherNames: "Last Name field is required",
  surName: "Surname field is required",
  title: "Title field is required",
  patientStatus: "Patient status field is required",
  patientCategory: "Patient category field is required",
  gender: "Gender field is required",
  //consultantInCharge: "Consultant field is required",
};

export const basicInfoErr = {
  firstName: false,
  //otherNames: false,
  surName: false,
  title: false,
  gender: false,
  patientStatus: false,
  patientCategory: false,
  //consultantInCharge: false,
};

export const socialInfoMsg = {
  residentialAddress: "Residential Address field is required",
  //permanentAddress: "Permanent Address field is required",
  email: "Please enter a valid email",
  telephone1: "This phone number field is required",
};

export const socialInfoErr = {
  residentialAddress: false,
  //permanentAddress: false,
  email: false,
  telephone1: false,
};

export const otherInfoErr = {
  country: false,
  state: false,
  lga: false,
};
export const otherInfoMsg = {
  country: "Country field is required",
  state: "State field is required",
  lga: "Local Government field is required",
};

export const nokInfoErr = {
  fullname: false,
  //relationshipTypeId: false,
  email: false,
  residentialAddress: false,
  telephone: false,
};
export const nokInfoMsg = {
  fullname: "Full Name field is required",
  //relationshipTypeId: "Relationship Type is required",
  email: "Please enter a valid email",
  residentialAddress: "Residential Address field is required",
  telephone: "This phone number field is required",
};

export const validateEmail = (email) => {
  const regex = /^([a-z0-9_.-]+)@([a-z.-]+)\.([a-z.]{2,6})$/i;
  return regex.test(email);
};

export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

export const capitalizeWord = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const numbersOnly = (inputString) => {
  inputString = "";
  // Use a regular expression to remove non-numeric characters
  if (inputString) return Number(inputString?.replace(/\D/g, ""));
};

// export const basicInfoErr = {
//     firstName: { msg: "First name field is required", err: false },
//     lastName: { msg: "Last name field is required", err: false },
//     surname: { msg: "Surname field is required", err: false },
//     patientStatus: { msg: "Patient status field is required", err: false },
//     patientCategory: { msg: "Patient category field is required", err: false },
//     consultant: { msg: "Consultant field is required", err: false },
//   };

export const useClickOutside = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      //console.log(ref);
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const dataUrlToImg = (imgDataUrl) => {
  const uniqueID = generateUniqueId();

  const imageType = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/gif": "gif",
  };

  const mimeType = imgDataUrl?.split(";")[0]?.split(":")?.[1];
  // Convert base64 string to Blob
  const byteCharacters = atob(imgDataUrl?.split(",")?.[1]);
  const byteNumbers = new Array(byteCharacters?.length);
  for (let i = 0; i < byteCharacters?.length; i++) {
    byteNumbers[i] = byteCharacters?.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  const file = new File(
    [blob],
    `${uniqueID}img.${imageType?.[mimeType] || imageType?.["image/png"]}`,
    {
      type: mimeType,
      lastModified: Date.now(),
    }
  );

  return file;
};
