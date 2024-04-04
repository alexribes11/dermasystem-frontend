import { Link, useNavigate } from "react-router-dom";
import styles from './auth.module.css';
import { login } from "./axios";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sendLogin = async () => {
    try {
      setLoading(true);
      const data = await login({username: 'janedoe', password: 'janedoe'});
      console.log(data);
      setLoading(false);
      navigate("/image-upload", {state: data.data});
    } catch(e) {
      console.error(e);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <div className={styles['page']}>
    <div className={styles.header}>
      <img src="/logo.png" className={styles.logo}/>
      <div className={styles['header--text']}>
        <h1>Login</h1>
        <p>Welcome back</p>
      </div>
    </div>

    <form>
      <h3 className={styles['input-heading']}>Username</h3>
      <input type="text" />
      <h3 className={styles['input-heading']}>Password</h3>
      <input type="password"/>
      <button className={styles['login-btn']} type="submit" onClick={sendLogin}>LOGIN</button>
    </form>
    
    <Link to={"/register"} className={styles['register-link']}>Don't have an account?</Link>
  </div>
}