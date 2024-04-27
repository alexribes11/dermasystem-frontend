import { useState } from "react";
import styles from './patients.module.css';
import { FaXmark } from "react-icons/fa6";
import ViewAssignedStaff from "./ViewAssignedStaff";
import AssignStaffForm from "./AssignStaffForm";
import { Staff } from "../../types/Staff";
import { useOutletContext } from "react-router-dom";
import UserContext from "../../context/UserContext";

type props = {
  staff: Staff[];
  patientId: string;
  close: () => void;
  assign: (staffId: string, patientId: string) => Promise<void>;
  unassign: (staffId: string, patientId: string) => Promise<void>;
}

enum Pages {
  ASSIGN,
  VIEW_CURRENT
}

export default function PopupForm({staff, patientId, close, assign, unassign}: props) {

  const { user } = useOutletContext() as UserContext;

  const [page, setPage] = useState(Pages.VIEW_CURRENT);

  let content;

  switch (page) {

    case(Pages.VIEW_CURRENT):
      content = <ViewAssignedStaff staff={staff} patientId={patientId} unassign={unassign} />
      break;
    
    case (Pages.ASSIGN):
      content = <AssignStaffForm staff={staff} patientId={patientId} assign={assign}/>
      break;
  }

  return (
    
    <div className={styles['popup-form']}>

      <div className={styles['nav']}>
        <p
          className={page === Pages.VIEW_CURRENT ? styles['active-link'] : styles['link']} 
          onClick={() => setPage(Pages.VIEW_CURRENT)}
        >
          View Current Staff
        </p>
        {user?.userRole !== "nurse" && <p
          className={page === Pages.ASSIGN ? styles['active-link'] : styles['link']} 
          onClick={() => setPage(Pages.ASSIGN)}
        >
          Assign Staff
        </p>}
      </div>

      <FaXmark onClick={close} className={styles['close-popup']}/>

      {content}

    </div>
  );
}