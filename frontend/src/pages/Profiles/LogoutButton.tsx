import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./profiles.module.css";
import { Logout } from "../../utils/api/auth";
import UserContext from "../../context/UserContext";

export default function LogoutButton() {

  const navigate = useNavigate();
  const {setUser} = useOutletContext() as UserContext;

  const logout = async () => {
    const response = await Logout();
    if (response.status === 200) {
      setUser(undefined);
      navigate("/");
    }
  };

  return (
    <button 
      className={styles['logout']}
      onClick={logout}
    >
      Logout
    </button>
  )
}