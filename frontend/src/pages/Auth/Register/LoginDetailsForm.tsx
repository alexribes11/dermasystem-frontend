import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../axios";
import CustomForm from "../CustomForm";
import { HospitalDataControls, RegisterDataControls, RegisterPages } from "../types/register";
import { CustomInputs } from "../types/CustomForm";
import Header from "../Header";
import styles from '../auth.module.css';

type props = {
  registerDataControls: RegisterDataControls,
  goTo: (page: RegisterPages) => void;
  hospitalControls: HospitalDataControls;
}

type LoginDetails = {
  username: string,
  password: string,
  confirmPassword: string,
}

export default function LoginDetailsForm({registerDataControls, goTo, hospitalControls}: props) {

  const { registerData } = registerDataControls;
  const { hospitalData } = hospitalControls;

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginDetails: LoginDetails = {
    username: registerData.username,
    password: registerData.password,
    confirmPassword: "",
  }

  const goBack = () => {
    if (registerData.role === "admin" && hospitalData) {
      goTo(RegisterPages.REGISTER_HOSPITAL);
    } else {
      goTo(RegisterPages.HOSPITAL_SELECTION);
    }
  }

  const reformatHospitalData =  () => {
    if (hospitalData) {
      return {
        hospitalName: hospitalData.name,
        address: {
          street: hospitalData.street,
          city: hospitalData.city,
          state: hospitalData.state,
          country: hospitalData.country,
          zipcode: parseInt(hospitalData.zipcode)
        },
        id: ""
      }
    }
  }

  const sendRegister = async (formInfo: Record<string,string>) => {
    try {
      const {username, password, confirmPassword} = formInfo as LoginDetails;
      if (password !== confirmPassword) {
        setError("Passwords don't match"); 
        return;
      }
      let registerParams;
      if (hospitalData) {
        const registerHospitalData = reformatHospitalData();
        registerParams = {...registerData, isRegisteringHospital: true, registerHospitalData }
      } else {
        registerParams = {...registerData, isRegisteringHospital: false }
      }
      console.log("registerData=", {...registerParams, username, password});
      const data = await register({...registerParams, username, password});
      navigate("/welcome", {state: data.user});
    }
    catch (error) {
      console.error(error);
    }
  }

  const usernameValidator = (username: string) => {
    return username ? "" : "Please enter your username";
  }

  const passwordValidator = (password: string) => {
    return password ? "" : "Please enter your password";
  }

  const confirmPasswordValidator = (confirmPassword: string) => {
    return confirmPassword ? "" : "Please confirm your password";
  }

  const inputs: CustomInputs = [
    {
      name: "username", 
      validator: usernameValidator
    },
    {
      name: "password", 
      type: "password",
      validator: passwordValidator
    },
    {
      name: "confirmPassword",
      type: "password",
      validator: confirmPasswordValidator
    }
  ]

  return <div>
    <CustomForm
      data={loginDetails}
      inputs={inputs}
      onSuccess={sendRegister}
      header={<Header heading="Login Details" subheading="Almost there!" />}
      footer={<>
        <p className={styles["error"]} style={{textAlign: 'center'}}>{error}</p>
      </>}
    />
    <p className={styles.link} onClick={goBack}>Back</p>
  </div>
}