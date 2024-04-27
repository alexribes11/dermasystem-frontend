import styles from '../auth.module.css';
import { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import HospitalForm from "./HospitalSelectionForm";
import LoginDetailsForm from "./LoginDetailsForm";
import AdminHospitalSelection from './AdminHospitalSelection';
import RegisterHospitalForm from './RegisterHospitalForm';
import { HospitalRegisterInfo, RegisterDataControls, RegisterPages, UserRegisterInfo } from '../types/register';

export default function RegisterPage() {

  const [page, setPage] = useState(RegisterPages.PERSONAL_DETAILS);

  const [registerData, setRegisterData] = useState<UserRegisterInfo>({
    firstName: "",
    lastName: "",
    email: "",
    role: "patient",
    username: "",
    password: "",
    hospitalId: "",
  });

  const [hospitalData, setHospitalData] = useState<HospitalRegisterInfo | undefined>();

  const registerDataControls: RegisterDataControls = {
    registerData,
    setRegisterData
  }

  const hospitalControls = {
    hospitalData,
    setHospitalData
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
        return <LoginDetailsForm registerDataControls={registerDataControls} hospitalControls={hospitalControls} goTo={goTo}/>;
      case RegisterPages.ADMIN_HOSPITAL_SELECT:
        return <AdminHospitalSelection goTo={goTo}/>;
      case RegisterPages.REGISTER_HOSPITAL:
        return <RegisterHospitalForm hospitalControls={hospitalControls} goTo={goTo}/>
    }
  }

  return <div className={styles['page']}>
    {/* <button onClick={() => {console.log("registerData=", registerData)}}>Click to print registerData</button> */}
    {getPage()}
  </div>
}