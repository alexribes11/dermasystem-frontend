import { Link } from 'react-router-dom';
import styles from '../auth.module.css';
import { RegisterDataControls, RegisterPages } from './Register';
import { ChangeEventHandler } from 'react';

type props = {
  registerDataControls: RegisterDataControls;
  goTo: (page: RegisterPages) => void;
}

export default function PersonalDetailsForm({registerDataControls, goTo}: props) {

  const {registerData, setRegisterData} = registerDataControls;

  const changeRegisterData: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setRegisterData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }

  const goNext = () => {
    if (registerData.role === 'admin') {
      goTo(RegisterPages.ADMIN_HOSPITAL_SELECT);
    } else {
      goTo(RegisterPages.HOSPITAL_SELECTION);
    }
  }

  return <form onSubmit={e => e.preventDefault()}>
    <h1>Personal Details</h1>
    <p>Tell us a little bit about yourself:</p>

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

    <button onClick={goNext}>Next</button>
    <Link to="/login">Already have an account?</Link>
  </form>
}