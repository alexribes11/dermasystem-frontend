import styles from './home.module.css';

function HomePage() {
    return <div className={styles['home-page']}>
        <div className={styles['hero']}>
            <h1>DermaSystem</h1>
            <img className={styles.logo} src="/logo.png" />
        </div>
        <p>Revolutionizing dermoscopy with precision</p>
        <button className={`${styles["login-btn"]} ${styles["btn"]}`}>LOGIN</button>
        <button className={`${styles["register-btn"]} ${styles["btn"]}`}>REGISTER</button>
    </div>
}

export default HomePage;