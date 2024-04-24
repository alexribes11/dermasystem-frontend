import Hospital from "../../../types/Hospital";

interface RegisterRequestBody {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  username: string,
  password: string,
  hospitalId: string,
  isRegisteringHospital: boolean,
  registerHospitalData?: Hospital
}

export default RegisterRequestBody;