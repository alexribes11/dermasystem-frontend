import styles from '../auth.module.css';
import RegisterRequestBody from "../types/RegisterRequestResponse";
import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import HospitalForm from "./HospitalSelectionForm";
import LoginDetailsForm from "./LoginDetailsForm";
import AdminHospitalSelection from './AdminHospitalSelection';
import RegisterHospitalForm from './RegisterHospitalForm';

export type RegisterDataControls = {
  registerData: RegisterRequestBody;
  setRegisterData: (data: RegisterRequestBody | ((data: RegisterRequestBody) => RegisterRequestBody)) => void;
}

export enum RegisterPages {
  PERSONAL_DETAILS,
  HOSPITAL_SELECTION,
  ADMIN_HOSPITAL_SELECT,
  REGISTER_HOSPITAL,
  LOGIN_DETAILS
}

export default function RegisterPage() {

  const [page, setPage] = useState(RegisterPages.PERSONAL_DETAILS);

  const [registerData, setRegisterData] = useState<RegisterRequestBody>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    role: "patient",
    username: "johndoe1",
    password: "johndoe",
    hospitalId: "",
    isRegisteringHospital: false
  });

  const registerDataControls: RegisterDataControls = {
    registerData,
    setRegisterData
  }

  const goTo = (page: RegisterPages) => {
    setPage(page);
  }
  
  const getPage = () => {
    switch(page) {
      case RegisterPages.PERSONAL_DETAILS:
        return <PersonalDetailsForm registerDataControls={registerDataControls} goTo={goTo}/>;
      case RegisterPages.HOSPITAL_SELECTION:
        return <HospitalForm registerDataControls={registerDataControls} goTo={goTo}/>;
      case RegisterPages.LOGIN_DETAILS:
        return <LoginDetailsForm registerDataControls={registerDataControls} goTo={goTo}/>;
      case RegisterPages.ADMIN_HOSPITAL_SELECT:
        return <AdminHospitalSelection goTo={goTo}/>;
      case RegisterPages.REGISTER_HOSPITAL:
        return <RegisterHospitalForm registerDataControls={registerDataControls} goTo={goTo}/>
    }
  }

  return <div className={styles['page']}>
    <button onClick={() => {console.log("registerData=", registerData)}}>Click to print registerData</button>
    {getPage()}
  </div>
}