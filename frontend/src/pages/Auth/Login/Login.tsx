import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from '../auth.module.css';
import { Login } from "../axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import UserContext from "../../../context/UserContext";
import Header from "../Header";
import CustomForm from "../CustomForm";
import { CustomInputs } from "../types/CustomForm";

type LoginInfo = {
  username: string;
  password: string;
}

export default function LoginPage() {

  const navigate = useNavigate();
  const [loginInfo] = useState<LoginInfo>({username: "", password: ""});
  const [generalError, setGeneralError] =  useState("");

  const sendLogin = async (formInfo: Record<string, string>) => {
    try {
      const loginInfo = formInfo as LoginInfo;
      const data = await Login({...loginInfo});
      navigate("/welcome", {state: data.user});
    } 
    catch(e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setGeneralError(e.response?.data.error ?? "ERROR");
      } else {
        setGeneralError("ERROR");
      }
    }
  }

   /* If the user is already logged in, redirect them to the welcome page */
  const { user } = useOutletContext() as UserContext;
  useEffect(() => {
    if (user) {
      navigate("/welcome", {state: user});
    }
  }, [user]);


  const usernameValidator = (username: string) => {
    return username ? "" : "Please enter your username"
  }

  const passwordValidator = (password: string) => {
    return password ? "" : "Please enter your password"
  }

  const inputs: CustomInputs = [
    {
      name: "username", 
      validator: usernameValidator
    },
    {
      name: "password", 
      type: "password",
      validator: passwordValidator, 
    }
  ]

  const header = <Header heading="Login" subheading="Welcome"/>;

  return <div className={styles['page']}>
    <CustomForm
      data={loginInfo}
      inputs={inputs}
      onSuccess={sendLogin}
      submitBtnText="Login"
      header={header}
      footer={<>
        <p className={styles["error"]} style={{textAlign: 'center'}}>{generalError}</p>
      </>}
    />
    <Link to={"/register"} className={styles['link']}>Don't have an account?</Link>
  </div>
}