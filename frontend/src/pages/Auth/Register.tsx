import { Link, useNavigate } from "react-router-dom";
import styles from './auth.module.css';
import RegisterRequestBody from "./types/RegisterRequestResponse";
import { ChangeEventHandler, useState } from "react";
import { register } from "./axios";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterRequestBody>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    role: "patient",
    username: "johndoe1",
    password: "johndoe"
  });

  const changeRegisterData: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setRegisterData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }

  const sendRegister = async () => {
    try {
      console.log("registerData=", registerData);
      const data = await register(registerData);
      navigate("/image-upload", {state: data});
    }
    catch (error) {
      console.error(error);
    }
  }
  
  return <div className={styles['page']}>
    <button onClick={() => {console.log("registerData=", registerData)}}>Click to print registerData</button>
    <h1>Register</h1>
    <p>Join us</p>

    <form onSubmit={e => e.preventDefault()}>
      <h1>Personal Details</h1>

      <h3 className={styles['input-heading']}>First Name</h3>
      <input
        type="text" 
        value={registerData.firstName}
        name="firstName"
        onChange={changeRegisterData}
      />

      <h3 className={styles['input-heading']}>Last Name</h3>
      <input
        type="text" 
        value={registerData.lastName}
        name="lastName"
        onChange={changeRegisterData}
      />

      <h3 className={styles['input-heading']}>Email</h3>
      <input
        type="email" 
        value={registerData.email}
        name="email"
        onChange={changeRegisterData}
      />
      
      <h3 className={styles['input-heading']}>I am a:</h3>
      <select
        name="role"
        value={registerData.role}
        onChange={changeRegisterData}
      >
        <option value="patient">Patient</option>
        <option value="nurse">Nurse</option>
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>

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

      <button className={styles['login-btn']} onClick={sendRegister}>Register</button>
    </form>
    <Link to="/login">Already have an account?</Link>
  </div>
}