import { Link } from "react-router-dom";
import styles from './auth.module.css';

export default function LoginPage() {
  return <div>
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
      <button type="submit">Login</button>
    </form>
    <Link to={"/register"}>Don't have an account?</Link>
  </div>
}