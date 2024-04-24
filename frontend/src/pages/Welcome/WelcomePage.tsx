import { useLocation, useOutletContext } from "react-router-dom"
import User from "../../types/User";
import { useEffect } from "react";
import UserContext from "../../context/UserContext";

export default function WelcomePage() {
  const user = useLocation().state as User;
  const {setUser} = useOutletContext() as UserContext;
  useEffect(() => {
    setUser(user);
  }, [user]);
  return <div>
    {user.userRole === "doctor" ? 
      <h1>Welcome back Dr. {user.lastName}</h1>:
      <h1>Welcome back {user.firstName}</h1>
    }
  </div>
}