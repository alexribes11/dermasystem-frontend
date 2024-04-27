import { Link } from 'react-router-dom';
import styles from './home.module.css';

function HomePage() {
    
    return <div className={styles['home-page']}>
        <div className={styles['section']}>
            <div className={styles['hero']}>
                <img className={styles.logo} src="/logo.png" />
                <h1>DermaSystem</h1>
            </div>
            <p className={styles['subtitle']}>Revolutionizing dermoscopy with precision</p>
            <Link to={"/login"}><button className={`${styles["login-btn"]} ${styles["btn"]}`}>LOGIN</button></Link>
            <Link to={"/register"}><button className={`${styles["register-btn"]} ${styles["btn"]}`}>REGISTER</button></Link>
        </div>
    </div>
}

export default HomePage;