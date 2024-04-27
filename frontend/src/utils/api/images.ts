import Axios from "./axios";

const baseEndpoint = "/images"

export const FetchImages = async (patientId: string) => {
  const response = await Axios.get(`${baseEndpoint}/${patientId}`);
  const data = response.data;
  return data;
}

export const DeleteImage = async (patientId: string, imageId: string) => {
  console.log('Calling Delete Image...');
  const response = await Axios.put(`${baseEndpoint}/scheduleDelete/${patientId}/${imageId}`);
  return response.data;
}

export const RecoverImage = async (patientId: string, image: Photo) => {
  console.log(`Calling Recover Image...`);
  const response = await Axios.put(`${baseEndpoint}/recover/${patientId}`, { image });
  return response.data;
}