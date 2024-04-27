import Axios from "./axios";

const baseEndpoint = "/auth"

export const GetSessionInfo = async () => {
  const response = await Axios.get(`${baseEndpoint}/sessionInfo`);
  const data = response.data;
  return data;
}

export const Logout = async () => {
  const response = await Axios.post(`${baseEndpoint}/logout`);
  return response;
}