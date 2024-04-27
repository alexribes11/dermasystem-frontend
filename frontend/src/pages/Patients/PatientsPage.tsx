import { ChangeEventHandler, useEffect, useState } from "react";
import User from "../../types/User";
import { AssignNurseToPatient, GetPatients, UnassignStaffFromPatient } from "../../utils/api/patients";
import { useOutletContext } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { AssignDoctorToPatient, GetDoctors, GetNurses } from "../../utils/api/admin";
import styles from './patients.module.css';
import PopupForm from "./PopupForm";
import PatientCard from "./PatientCard";
import { Staff } from "../../types/Staff";

export default function PatientsPage() {

  const [patients, setPatients] = useState<User[]>([]);
  const [currPatient, setCurrPatient] = useState("");
  
  const [filter, setFilter] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<User[]>([]);
  
  const [staff, setStaff] = useState<Staff[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useOutletContext() as UserContext;

 
  const fetchPatients = async () => {
    const data =  await GetPatients();
    setPatients(data);
    setFilteredPatients(data);
  }

  const fetchDoctors = async () => {
    const data = await GetDoctors();
    setStaff(prev => [...prev, ...data]);
  }

  const fetchNurses = async () => {
    const data = await GetNurses();
    setStaff(prev => [...prev, ...data]);
  }

  const close = () => {
    setShowPopup(false);
  }

  const onClickAssign = (patient: User) => {
    setShowPopup(true);
    setCurrPatient(patient.id);
  }

  const updateFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFilter = e.target.value;
    const newPatients = patients.filter((patient) => {
      const patientName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return patientName.startsWith(newFilter.toLowerCase());
    })
    setFilter(newFilter);
    setFilteredPatients(newPatients);
  };

  const assignToPatient = async (staffId: string, patientId: string) => {

    if (!user) return; 

    let success = false;
    if (user?.userRole === 'admin') {
      await AssignDoctorToPatient(staffId, patientId);
      success = true;
    } else if (user?.userRole === "doctor") {
      await AssignNurseToPatient(staffId, patientId);
      success = true;
    }

    if (success) {
      setStaff(prev => prev.map(staff => {
        if (staff.id !== staffId) { return staff }
        return {...staff, patients: [...staff.patients, patientId]}
      }));
    }
    
  }

  const unassign = async (staffId: string, patientId: string) => {
    try {
      await UnassignStaffFromPatient(staffId, patientId);
      setStaff(prev => prev.map(staff => {
        if (staff.id !== staffId) { return staff }
        const patients = staff.patients.filter(patient => patient !== patientId);
        return { ...staff, patients };
      }));
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchPatients();
    if (user?.userRole !== "patient") {
      fetchDoctors();
      fetchNurses();
    }
  }, []);

  return <div className={styles.page}>

    <h1>Your Patients:</h1>

    <input
      className={styles['search-bar']}
      value={filter} 
      onChange={updateFilter}
      placeholder={`Search`}
    />

    <div className={styles['patients-container']}>
      {filteredPatients.map(patient => {
        return <PatientCard patient={patient} key={patient.id} onClickAssign={onClickAssign} />
      })}
    </div>

    {showPopup && <PopupForm
      close={close} 
      staff={staff} 
      patientId={currPatient} 
      assign={assignToPatient}
      unassign={unassign}
    />}
  </div>
}