import axios from 'axios';
import LoginRequestBody from './types/LoginRequestBody';
import RegisterRequestBody from './types/RegisterRequestResponse';

const PORT_NUMBER = 5005;

const AuthAxios = axios.create({
  baseURL: "http://localhost:5005/api/v0/auth"
});

export const register = async (body: RegisterRequestBody) => {
  const response = await AuthAxios.post("/register", body);
  const data = response.data;
  return data;
}

export const login = async (body: LoginRequestBody) => {
  console.log("IN axios.ts, RUN login")

  //const response = await AuthAxios.post("/login", body);
  fetch("http://localhost:5005/api/v0/auth/login", {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((response) => {

          console.log("IN axios.ts, response=", response);
          //const data = response.data;
          //return data;
        })
        .catch((err) => ("Error occured", err));

}