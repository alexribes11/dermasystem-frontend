import { Link, useNavigate } from "react-router-dom";
import RegisterRequestBody from "./types/RegisterRequestResponse";
import { ChangeEventHandler, useState } from "react";
import { register } from "./axios";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterRequestBody>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    role: "Patient",
    username: "johndoe1",
    password: "johndoe"
  });

  const changeRegisterData: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setRegisterData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }

  const sendRegister = async () => {
    try {
      const data = await register(registerData);
      navigate("/image-upload", {state: data});
    }
    catch (error) {
      console.error(error);
    }
  }
  
  return <div>
    <h1>Register</h1>
    <p>Join us</p>

    <form onSubmit={e => e.preventDefault()}>
      <h1>Personal Details</h1>

      <h3>First Name</h3>
      <input
        type="text" 
        value={registerData.firstName}
        name="firstName"
        onChange={changeRegisterData}
      />

      <h3>Last Name</h3>
      <input
        type="text" 
        value={registerData.lastName}
        name="lastName"
        onChange={changeRegisterData}
      />

      <h3>Last Name</h3>
      <input
        type="email" 
        value={registerData.email}
        name="email"
        onChange={changeRegisterData}
      />
      
      <h3>I am a:</h3>
      <select
        name="role"
        value={registerData.role}
        onChange={changeRegisterData}
      >
        <option value="Patient">Patient</option>
        <option value="Nurse">Nurse</option>
        <option value="Doctor">Doctor</option>
        <option value="Admin">Admin</option>
      </select>

      <h1>Login Details</h1>
      <h3>Username</h3>
      <input
        type="text" 
        value={registerData.username}
        name="username"
        onChange={changeRegisterData}
      />

      <h3>Password</h3>
      <input
        type="password" 
        value={registerData.password}
        name="password"
        onChange={changeRegisterData}
      />

      <button onClick={sendRegister}>Register</button>
    </form>
    <Link to="/login">Already have an account?</Link>
  </div>
}