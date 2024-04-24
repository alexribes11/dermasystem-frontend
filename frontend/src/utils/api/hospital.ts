import Hospital from '../../types/Hospital';
import Axios from "./axios";

const baseEndpoint = "/admin/hospitals"

export const CheckIfValid = async (hospital: Hospital) => {
  const response = await Axios.post(`${baseEndpoint}/isValid`, hospital);
  const data = response.data;
  return data;
}

export const GetHospitalsByZipcode = async (zipcode: number) => {
  const response = await Axios.get(`${baseEndpoint}/${zipcode}`);
  const data = response.data;
  return data;
}