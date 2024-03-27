import axios from 'axios';
import LoginRequestBody from './types/LoginRequestBody';
import RegisterRequestBody from './types/RegisterData';

const AuthAxios = axios.create({
  baseURL: "http://localhost:5005/api/v0/auth"
});

export const register = async (body: RegisterRequestBody) => {
  const response = await AuthAxios.post("/login", {
    body: body,
    withCredentials: true,
    include: false
  });
  const data = response.data;
  return data;
}

export const login = async (body: LoginRequestBody) => {
  const response = await AuthAxios.post("/login", {
    body: body,
    withCredentials: true
  });
  const data = response.data;
  return data;
}