import { Link, Outlet, useLocation } from "react-router-dom";
import styles from './navbar.module.css';
import { useEffect, useState } from "react";
import Notifications from "./Notifications";
import socket from "../utils/socket";
import axios from 'axios';
import { getUserInfo } from "../pages/Auth/axios"

/*
const GeneralAxios = axios.create({
  baseURL: "http://localhost:5005/api/v0/auth"
});
*/

export type Notification = {
  message: string
};



export default function Navbar() {
  const location = useLocation();
  const { hash, pathname, search } = location;

  const [userRole, setUserRole] = useState(null);

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


    /*
    const userInfo = GeneralAxios.get("/user-info", {}, {withCredentials: true});
    const userRole = (userInfo?.user?).role;
    */
    const fetchData = async () => {
      console.log("Right before the CALL of getUserInfo");
      try {
        const userRole = await getUserInfo();
        console.log("userRole=", userRole);
        //setUserRole(userRole);
      } catch (e) {
        console.log("error when calling getUserInfo e=", e);
      }
    };

    fetchData().catch(console.error);

   
    
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
          
          {(userRole!=null && (userRole.toLowerCase()=="doctor" || userRole.toLowerCase()=="nurse")) &&
            <Link to="/image-upload" className={(pathname === "/image-upload" ? styles['underlined'] : "")}>Upload Image</Link>
          }
          <Link to="/archives" className={(pathname === "/archives" ? styles['underlined'] : "")}>Archives</Link>
          <Link to="/faq" className={(pathname === "/faq" ? styles['underlined'] : "")}>FAQ</Link>
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