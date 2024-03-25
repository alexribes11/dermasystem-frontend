import { Link } from "react-router-dom";
import styles from './auth.module.css';

export default function LoginPage() {
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
      <Link to={"/image-upload"}><button type="submit">Login</button></Link>
    </form>
    <Link to={"/register"}>Don't have an account?</Link>
  </div>
}