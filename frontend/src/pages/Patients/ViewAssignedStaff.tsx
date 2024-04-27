import { useOutletContext } from "react-router-dom";
import { Staff } from "../../types/Staff";
import StaffCard from "./StaffCard";
import styles from './patients.module.css';
import { FaUserXmark } from "react-icons/fa6";
import UserContext from "../../context/UserContext";

type props = {
  staff: Staff[];
  patientId: string;
  unassign: (staffId: string, patientId: string) => Promise<void>;
}

export default function ViewAssignedStaff({ staff, patientId, unassign}: props) {

  const assignedStaff = staff.filter(staff => staff.patients.includes(patientId));
  const doctors = assignedStaff.filter(staff => staff.userRole === "doctor");
  const nurses = assignedStaff.filter(staff => staff.userRole === "nurse");

  const { user } = useOutletContext() as UserContext;
  
  const AssignedStaffCard = ({staff}: {staff: Staff}) => {
    return <StaffCard staff={staff} onClick={() => {}}>
      {user?.userRole !== "nurse" && <button className={styles['unassign']} onClick={() => unassign(staff.id, patientId)}>
        <FaUserXmark className={styles['fa-icon']} /> Unassign
      </button>}
    </StaffCard>
  }

  return <div className={styles['popup-main']}>

    <div>
      {doctors.map(doctor => <AssignedStaffCard staff={doctor} key={doctor.id}/>)}
    </div>

    <div className={styles['nurses-container']}> 
      {nurses.map(nurse => <AssignedStaffCard staff={nurse} key={nurse.id}/>)}
    </div>

  </div>
}