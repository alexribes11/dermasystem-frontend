import { Link } from "react-router-dom";
import styles from './auth.module.css';
import { login } from "./axios";
import { useState } from "react";

export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  const sendLogin = async () => {
    try {
      setLoading(true);
      await login({username: 'janedoe1', password: 'janedoe'});
      setLoading(false);
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
      <h1>Login</h1>
      <p>Welcome back</p>
    </div>

    <form>
      <h3>Username</h3>
      <input type="text" />
      <h3>Password</h3>
      <input type="password"/>
      <button type="submit" onClick={sendLogin}>Login</button>
    </form>
    <Link to={"/register"}>Don't have an account?</Link>
  </div>
}