import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5005/api/v0",
  withCredentials: true
});

export default Axios;