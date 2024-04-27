import { Staff } from "../../types/Staff";
import Axios from "./axios";

const baseEndpoint = "/admin"

export const GetDoctors = async () => {
  const response = await Axios.get(`${baseEndpoint}/doctors`);
  const data = response.data;
  return data;
}

export const AssignDoctorToPatient = async (doctorId: string, patientId: string) => {
  const response = await Axios.put(`${baseEndpoint}/assignDoctorToPatient`, {
    doctorId, 
    patientId
  });
  const data = response.data;
  return data;
}

export const GetNurses = async () => {
  // Should the list of nurses available to take care of Patient X,
  // depend on the id of that patient, the hospital of that patient,
  // the doctor assigned to that patient (maybe some nurses only work
  // under a particular doctor, and so if the patient X is assigned
  // to Doctor Y, then nurses that are associated with Doctors Z or A or B,
  // can not take care of Patient X
  const response = await Axios.get(`${baseEndpoint}/nurses`);
  const data = response.data;
  return data;
}

export const RemoveStaff = async (staff: Staff) => {
  const response = await Axios.delete(`${baseEndpoint}/${staff.id}`);
  return response.data;
}