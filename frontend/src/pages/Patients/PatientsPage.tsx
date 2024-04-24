import { useEffect, useState } from "react";
import User from "../../types/User";
import { AssignNurseToPatient, GetPatients } from "../../utils/api/patients";
import { Link, useOutletContext } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { AssignDoctorToPatient, GetDoctors, GetNurses } from "../../utils/api/admin";
import styles from './patients.module.css';

export default function PatientsPage() {

  const [patients, setPatients] = useState<User[]>([]);
  const [currPatient, setCurrPatient] = useState("");
  
  const [doctors, setDoctors] = useState<User[]>([]);
  const [nurses, setNurses] = useState<User[]>([]);

  const [showDoctors, setShowDoctors] = useState(false);
  const [showNurses, setShowNurses] = useState(false); 

  const { user } = useOutletContext() as UserContext;
 

  const fetchPatients = async () => {
    const data =  await GetPatients();
    setPatients(data);
  }

  const fetchDoctors = async () => {
    const data = await GetDoctors();
    setDoctors(data);
    console.log("Doctors Received:")
    console.log(data);
  }

  const fetchNurses = async () => {
    const data = await GetNurses();
    setNurses(data);
    console.log("Nurses Received:")
    console.log(data);
  }

  const assignDoctor = async (doctorId: string) => {
    const data = await AssignDoctorToPatient(doctorId, currPatient);
    console.log(data);
  }

  const assignNurse = async (nurseId: string) => {
    const data = await AssignNurseToPatient(nurseId, currPatient);
    console.log(data);
  }

  useEffect(() => {
    fetchPatients();
    if (user?.userRole === "admin") {
      fetchDoctors();
    } else if (user?.userRole === "doctor") {
      fetchNurses();
    }
  }, []);

  return <div>
    <h1>Your Patients:</h1>
    {patients.map(patient => {
      return <div key={patient.id} className={styles.patient}>
        <div className={styles.img}>
          <img src="/icons/user.png" />
        </div>
        <div className={styles.info}>
          <h2>{patient.firstName} {patient.lastName}</h2>
          {user?.userRole === "admin" && <button onClick={() => {
            setCurrPatient(patient.id); setShowDoctors(true);
          }}>Assign Doctor</button>}
          <div className={styles.buttons}>
            {user?.userRole === "doctor" && <button onClick={() => {setCurrPatient(patient.id); setShowNurses(true);}}>Assign Nurse</button>}
            {user?.userRole !== "admin" && <Link to={`/image-upload/${patient.id}`}><button>Upload Image</button></Link>}
          </div>
        </div>
      </div>
    })}

    {showDoctors && <div>
      Select a Doctor:
      {doctors.map(doctor => {
      return <div key={doctor.id}>
        <h2>Dr. {doctor.lastName}</h2>
        <button onClick={() => assignDoctor(doctor.id)}>Assign</button>
      </div>})}
    </div>}

    {showNurses && <div>
      Select a Nurse:
      {nurses.map(nurse => {
      return <div key={nurse.id}>
        <h2>Nr. {nurse.lastName}</h2>
        <button onClick={() => assignNurse(nurse.id)}>Assign</button>
      </div>})}
    </div>}
  </div>
}