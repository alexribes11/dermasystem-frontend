import Navbar from '../../components/Navbar';
import styles from './home.module.css';

function HomePage() {
    return <div className={styles['home-page']}>
        <div>
            <Navbar />
            <div className={styles['hero']}>
                <h1>DermaSystem</h1>
                <img className={styles.logo} src="/logo.png" />
            </div>
            <p className={styles['subtitle']}>Revolutionizing dermoscopy with precision</p>
            <button className={`${styles["login-btn"]} ${styles["btn"]}`}>LOGIN</button>
            <button className={`${styles["register-btn"]} ${styles["btn"]}`}>REGISTER</button>
        </div>
    </div>
}

export default HomePage;