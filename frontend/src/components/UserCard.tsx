import { PropsWithChildren, useState } from 'react';
import styles from './usercard.module.css';
import User from '../types/User';

interface UserCardProps {
  user: User
}

export default function UserCard({user, children}: PropsWithChildren<UserCardProps>) {

  const [showActionMenu, setShowActionMenu] = useState(false);

  const toggleActionMenu = () => {
    setShowActionMenu(prev => !prev);
  };

  return <div className={styles['container']}>
    <div className={styles['main']}>
      <div>
        <img className={styles['profile-pic']} src="/icons/default-profile-pic.png" />
        <h3 className={styles['name']}>{user.firstName} {user.lastName}</h3>
        <p className={styles['role']}>{user.userRole}</p>
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
      <p><img src="/icons/email.png"/>{user.email}</p>
    </div>

    <div className={styles['lower-buttons']}>
      {children}
    </div>

</div>
}