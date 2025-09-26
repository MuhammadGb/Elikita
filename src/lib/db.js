let patients = [];
let symptoms = {};
let followUps = {};

let nextPatientId = 1;

export const findPatientById = (id) => {
  return patients.find((p) => p.id === parseInt(id, 10));
};

export const createPatient = (patientData) => {
  const newPatient = { ...patientData };
  patients.push(newPatient);
  return newPatient;
};

export const updatePatient = (id, updatedData) => {
  console.log("🚀 ~ updatePatient ~ patients:", patients);

  const patientIndex = patients.findIndex((p) => p.id === id);
  console.log("🚀 ~ updatePatient ~ patientIndex:", patientIndex);
  if (patientIndex === -1) return null;

  patients[patientIndex] = { ...patients[patientIndex], ...updatedData };
  return patients[patientIndex];
};

export const deletePatient = (id) => {
  const patientId = parseInt(id, 10);
  const patientIndex = patients.findIndex((p) => p.id === patientId);
  if (patientIndex === -1) return null;

  const deletedPatient = patients.splice(patientIndex, 1);
  delete symptoms[patientId];
  delete followUps[patientId];

  return deletedPatient[0];
};

export const findSymptomsByPatientId = (patientId) => {
  return symptoms[patientId] || null;
};

export const saveSymptoms = (patientId, symptomsData) => {
  const existingSymptoms = symptoms[patientId] || {};
  symptoms[patientId] = {
    ...existingSymptoms,
    ...symptomsData,
    patientId: parseInt(patientId, 10),
  };
  return symptoms[patientId];
};

export const findFollowUpsByPatientId = (patientId) => {
  return followUps[patientId] || null;
};

export const saveFollowUps = (patientId, followUpsData) => {
  const existingFollowUps = followUps[patientId] || {};
  followUps[patientId] = {
    ...existingFollowUps,
    ...followUpsData,
    patientId: parseInt(patientId, 10),
  };
  return followUps[patientId];
};
