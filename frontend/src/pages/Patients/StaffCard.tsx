import { PropsWithChildren } from "react";
import User from "../../types/User";
import styles from './patients.module.css';

type props = {
  staff: User;
  onClick: (user: User) => void;
  className?: string;
}

export default function StaffCard({staff, onClick, className, children}: PropsWithChildren<props>) {
  return (
    <div onClick={() => onClick(staff)} className={`${styles['staff-card']} ${className}`} >
      <div className={styles['staff-card--info']}>
        <img className={styles['profile-pic']} src="/icons/default-profile-pic.png"></img>
        <div>
          <h3>{staff.firstName} {staff.lastName}</h3>
          <p>{staff.userRole[0].toUpperCase() + staff.userRole.substring(1)}</p>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}