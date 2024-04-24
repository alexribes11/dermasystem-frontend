import Axios from "./axios";

const baseEndpoint = "/images"

export const FetchImages = async (patientId: string) => {
  const response = await Axios.get(`${baseEndpoint}/${patientId}`, { withCredentials: true});
  const data = response.data;
  return data;
}