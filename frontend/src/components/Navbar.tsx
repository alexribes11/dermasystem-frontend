import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './navbar.module.css';
import { useEffect, useState } from "react";
import { getUserInfo } from "../pages/Auth/axios";
import User from "../types/User";

export default function Navbar() {

  const { pathname } = useLocation();
  const [user, setUser] = useState<User | undefined>();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
      } catch (e) {
        console.error(e);
        navigate("/login");
      }
    };
    if (!user) {
      fetchData();
    }
  }, [user]);


  return <div className={styles['page']}>
    <div className={styles['header-and-main']}>
      {user && <header className={styles['navbar']}>
        <div className={styles['logo']}>
          <img src="logo.png"/>
          <h1>DermaSystem</h1>
        </div>
        <nav className={styles['links']}>
          {user.userRole !== "patient" && <Link to={"/patients"}>Patients</Link>}
          <Link to="/archives" className={(pathname === "/archives" ? styles['underlined'] : "")}>Archives</Link>
          <Link to="/faq" className={(pathname === "/faq" ? styles['underlined'] : "")}>FAQ</Link>
        </nav>
        <div className={styles['icons']}>
          <img
            src="icons/notification.png"
            className={styles['notification-icon']}
          />
          <Link to="/profile" className={styles['user-icon']}>
            <img src="icons/user.png" />
          </Link>
        </div>
      </header>}
      <Outlet context={{user, setUser}}/>
    </div>
    <aside>
    </aside>
  </div>
}