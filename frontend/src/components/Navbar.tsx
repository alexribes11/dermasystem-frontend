import { Link, Outlet } from "react-router-dom";
import styles from './navbar.module.css';
import { useEffect, useState } from "react";
import Notifications from "./Notifications";
import socket from "../utils/socket";

export type Notification = {
  message: string
};

export default function Navbar() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to server.");
    });

    socket.on("PatientImageRequested", (args) => {
      console.log(args);
    });

    return () => {
      socket.disconnect();
    };

  });

  return <div className={styles['page']}>
    <div className={styles['header-and-main']}>
      <header className={styles['navbar']}>
        <div className={styles['logo']}>
          <img src="logo.png"/>
          <h1>DermaSystem</h1>
        </div>
        <nav className={styles['links']}>
          <Link to="/image-upload">Upload Image</Link>
          <Link to="/archives">Archives</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <div className={styles['icons']}>
          <img
            src="icons/notification.png"
            className={styles['notification-icon']}
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <Link to="/profile" className={styles['user-icon']}>
            <img src="icons/user.png" />
          </Link>
        </div>
      </header>
      <Outlet/>
    </div>
    <aside>
      {showNotifications && <Notifications notifications={notifications}/>}
    </aside>
  </div>
}