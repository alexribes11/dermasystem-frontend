import { useEffect, useState } from "react";
import { Staff } from "../../types/Staff";
import { GetDoctors, GetNurses, RemoveStaff } from "../../utils/api/admin";
import UserCard from "../../components/UserCard";
import styles from './staff.module.css';
import { FaTrash } from "react-icons/fa6";

export default function StaffPage() {

  const [nurses, setNurses] = useState<Staff[]>([]);
  const [doctors, setDoctors] = useState<Staff[]>([]);
  
  const deleteNurse = async (nurseToDelete: Staff) => {
    await RemoveStaff(nurseToDelete);
    setNurses(nurses.filter(nurse => {
      return nurse.id !== nurseToDelete.id
    }));
  }

  const deleteDoctor = async (doctorToDelete: Staff) => {
    await RemoveStaff(doctorToDelete);
    setDoctors(doctors.filter(doctor => {
      return doctor.id !== doctorToDelete.id
    }));
  }

  useEffect(() => {
    GetNurses().then(data => setNurses(data));
    GetDoctors().then(data => setDoctors(data));
  }, []);

  return <div className={styles['page']}>
    <h2>Doctors:</h2>
    <div>
      {doctors.map(doctor => <UserCard user={doctor}>
        <button className={"primary-btn"} onClick={() => {deleteDoctor(doctor)}}>
          <FaTrash className={styles.icon}/> Remove
        </button>
      </UserCard>)}
    </div>
    <h2>Nurses:</h2>
    <div>
      {nurses.map(nurse => <UserCard user={nurse}>
        <button className={"primary-btn"} onClick={() => {deleteNurse(nurse)}}>
          <FaTrash className={styles.icon}/> Remove
        </button>
      </UserCard>)}
    </div>
  </div>
}