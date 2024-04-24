import Axios from "./axios";

const baseEndpoint = "/patients"

export const GetPatients = async () => {
  const response = await Axios.get(`${baseEndpoint}`);
  const data = response.data;
  return data;
}

export const GetPatient = async (patientId: string) => {
  const response = await Axios.get(`${baseEndpoint}/${patientId}`);
  const data = response.data;
  return data;
}

export const AssignNurseToPatient = async (nurseId: string, patientId: string) => {
  const response = await Axios.put(`${baseEndpoint}/${patientId}/assignNurse`, {
    nurseId, 
    patientId
  });
  const data = response.data;
  return data;
}