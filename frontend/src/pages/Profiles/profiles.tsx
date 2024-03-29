import React from "react";
import styles from "./profiles.module.css";
// import { Link } from "react-router-dom";

function ProfilePage(): React.ReactNode {
        return <>
                <div className={styles['profile-page']}>
                    <section>
                        <header>
                                <h3>Dermasystem</h3>
                                <img className={styles.logo} src="/logo.png"></img>
                                <nav className="nav-links">
                                    <div className="nav-link nav-link active"> insert image</div>
                                    <div className="nav-link"> archives</div>
                                    <div className="nav-link"> FAQ</div>
                                </nav>
                                <img src="/helpIcon.png" />
                                <img src="/notifIcon.png" />
                                <img src="/userIcon.png"/>
                            </header>
                    </section>
                
                        <div className={styles['hero']}>
                                <section>
                                        <img src="/username-profile-pic.png"/>
                                        <h3>Dora Marquez</h3>
                                        <p className={styles["subtitle"]}>patient</p>
                                </section>
                                <section>
                                        <img src="/history.png"/>
                                        <h3>view history</h3>
                                </section>
                                <hr></hr>
                                <section>
                                        <p className={styles["subtitle"]}>Age</p>
                                        <p className={styles["subtitle"]}>Gender</p>
                                        <p className={styles["subtitle"]}>Phone Number</p>
                                        <p className={styles["subtitle"]}>Email</p>
                                </section>
                        </div>

                </div>
            </>;
}
    
export default ProfilePage;