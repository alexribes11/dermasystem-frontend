import { Link, useNavigate } from "react-router-dom";
import styles from './auth.module.css';
import { login } from "./axios";
import { ChangeEventHandler, useState } from "react";

type LoginInfo = {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({username: "", password: ""});

  const sendLogin = async () => {
    try {
      setLoading(true);
      const data = (await login(loginInfo)).data;
      console.log(data);
      setLoading(false);
      navigate("/welcome", {state: data.user});
    } catch(e) {
      console.error(e);
    }
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
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
      <input type="text" name="username" value={loginInfo.username} onChange={onInputChange} />
      <h3 className={styles['input-heading']}>Password</h3>
      <input type="password" name="password" value={loginInfo.password} onChange={onInputChange} />
      <button className={styles['login-btn']} type="submit" onClick={sendLogin}>LOGIN</button>
    </form>
    
    <Link to={"/register"} className={styles['register-link']}>Don't have an account?</Link>
  </div>
}