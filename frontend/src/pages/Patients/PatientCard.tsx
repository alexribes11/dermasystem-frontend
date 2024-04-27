import { useState } from "react";
import User from "../../types/User"
import styles from './patients.module.css';
import { FaUserDoctor } from "react-icons/fa6";
import UserCard from "../../components/UserCard";

type props = {
  patient: User;
  onClickAssign: (patient: User) => void;
}

export default function PatientCard({patient, onClickAssign}: props) {

  return <UserCard user={patient}>
    <button onClick={() => onClickAssign(patient)} className="primary-btn">
      <FaUserDoctor className={styles['fa-icon']}/> Assigned Staff
    </button> 
  </UserCard>

  const [showActionMenu, setShowActionMenu] = useState(false);

  const toggleActionMenu = () => {
    setShowActionMenu(prev => !prev);
  };



  return <div className={styles['patient-card']}>

    <div className={styles['main']}>
      <div>
        <img className={styles['profile-pic']} src="/icons/default-profile-pic.png" />
        <h3 className={styles['name']}>{patient.firstName} {patient.lastName}</h3>
        <p className={styles['role']}>Patient</p>
      </div>
      <button className={styles['edit-btn']} onClick={toggleActionMenu}> 
        <img src="/icons/edit.png" />
      </button>
      {showActionMenu && <div className={styles['action-menu']}>
        <button>Edit</button>
        <button>Delete</button>
      </div>}
    </div>

    <div className={styles['contact-info']}>
      <p><img src="/icons/phone.png"/>1-888-888-888</p>
      <p><img src="/icons/email.png"/>{patient.email}</p>
    </div>

    <div className={styles['lower-buttons']}>
      <button onClick={() => onClickAssign(patient)} className="primary-btn">
        <FaUserDoctor className={styles['fa-icon']}/> Assigned Staff
      </button>
    </div>

  </div>
}