import styles from ".profile.module.css";

function Profile(): JSX.Element {
    return (

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
                <h1>FAQ</h1>
                <p className={styles["subtitle"]}>Welcome. How can we help you?</p>
                <form className={styles['search-form']}>
                    <label htmlFor="search" className={styles[visually-hiddem]}>
                        Search for topics or catchwords
                        </label>
                        <input type="text" id="search" placeholder='Search for topics or catchwords' />
                        



                </form>

            </div>

        </div>
    );
}

export default Profile;