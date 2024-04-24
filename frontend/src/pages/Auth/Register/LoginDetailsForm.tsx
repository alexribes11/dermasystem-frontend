import { ChangeEventHandler } from "react";
import { RegisterDataControls, RegisterPages } from "./Register"
import styles from '../auth.module.css';
import { useNavigate } from "react-router-dom";
import { register } from "../axios";

type props = {
  registerDataControls: RegisterDataControls,
  goTo: (page: RegisterPages) => void;
}

export default function LoginDetailsForm({registerDataControls, goTo}: props) {
  const {registerData, setRegisterData} = registerDataControls;
  const navigate = useNavigate();
  const changeRegisterData: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setRegisterData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }

  const goBack = () => {
    goTo(RegisterPages.PERSONAL_DETAILS);
  }

  const sendRegister = async () => {
    try {
      console.log("registerData=", registerData);
      const data = await register(registerData);
      navigate("/welcome", {state: data.user});
    }
    catch (error) {
      console.error(error);
    }
  }
  
  return <div>
    <form>
      <h1>Login Details</h1>
      <h3 className={styles['input-heading']}>Username</h3>
      <input
        type="text" 
        value={registerData.username}
        name="username"
        onChange={changeRegisterData}
      />

      <h3 className={styles['input-heading']}>Password</h3>
      <input
        type="password" 
        value={registerData.password}
        name="password"
        onChange={changeRegisterData}
      />
    </form>
    
    <div className={styles.navigation}>
      <button onClick={goBack}>Back</button>
      <button onClick={sendRegister}>Register</button>
    </div>
  </div>
}