import { useState } from 'react';
import User from '../../types/User';
import styles from './patients.module.css';
import StaffCard from './StaffCard';
import { Staff } from '../../types/Staff';
import { useOutletContext } from 'react-router-dom';
import UserContext from '../../context/UserContext';

type props = {
  staff: Staff[];
  patientId: string;
  assign: (staffId: string, patientId: string) => Promise<void>;
}
export default function AssignStaffForm({staff, patientId, assign}: props) {

  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { user } = useOutletContext() as UserContext;

  let assignableStaff = staff.filter((staff) => !staff.patients.includes(patientId));

  if (user?.userRole === "doctor") {
    assignableStaff = assignableStaff.filter(staff => staff.userRole === "nurse");
  }
  
  const assignToPatient = () => {
    if (!selectedUser) return;
    assign(selectedUser.id,  patientId);
  }

  return <>

    {assignableStaff.length > 0 && <p>Select a staff member to assign: </p>} 

    <div className={styles['popup-main']}>
      {
        assignableStaff.map( user => 
          <StaffCard
            staff={user} 
            key={user.id} 
            onClick={setSelectedUser} 
            className={selectedUser === user ? styles['selected'] : ""}
          />
        )
      }

      {
        assignableStaff.length === 0 && <i>No staff to assign.</i>
      }
    </div>

    {selectedUser && 
      <button 
        className="primary-btn" 
        onClick={assignToPatient}
      >
        Assign
      </button>
    }

  </>
}