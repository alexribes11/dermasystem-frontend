import styles from './notifications.module.css';
import { Notification } from './Navbar';

type props = {
  notifications: Notification[]
}

export default function Notifications({notifications}: props) {
  return <div className={styles['container']}>
    <h3>Notifications</h3>
    {notifications.map(notification => {
      return <p>{notification.message}</p>
    })}
  </div>
}