import { Link } from 'react-router-dom';
import styles from './home.module.css';
import { useEffect } from 'react';
import socket from '../../utils/socket';

function HomePage() {

    useEffect(() => {
      socket.on("connect", () => {
        console.log('Connected to server');
      });

      socket.off('disconnect', () => {
        console.log('Disconnected from server');
      });

      return () => {
        if (socket.connected) {
          socket.disconnect();
        }
      }
    });
    
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