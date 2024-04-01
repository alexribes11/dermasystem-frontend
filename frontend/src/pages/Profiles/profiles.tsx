import React from "react";
import styles from "./profiles.module.css";
// import { Link } from "react-router-dom";

function ProfilePage(): React.ReactNode {
    return <>
        <div className={styles['profile-page']}>
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