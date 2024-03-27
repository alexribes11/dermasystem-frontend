import axios from 'axios';
import LoginRequestBody from './types/LoginRequestBody';
import RegisterRequestBody from './types/RegisterRequestResponse';

const AuthAxios = axios.create({
  baseURL: "http://localhost:5005/api/v0/auth"
});

export const register = async (body: RegisterRequestBody) => {
  const response = await AuthAxios.post("/register", body);
  const data = response.data;
  return data;
}

export const login = async (body: LoginRequestBody) => {
  const response = await AuthAxios.post("/login", body);
  const data = response.data;
  return data;
}