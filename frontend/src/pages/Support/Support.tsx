import styles from ".support.module.css";

function Support(): {
    return 
        <div>
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

            <main className="content">
                <div className= "content-wrapper">
                    <div className="content-column">
                        <div className="content-card">
                            <div className="content-card-title">Find your answer now</div>
                            <Image 
                                src=""
                                className ="content-card-image"
                            />
                            <Button className="button">Go to FAQ</Button>
                        </div>
                    </div>
                    <div className="content-column">
                        <div className="content-card">
                            <div className="content-card-title">Speak with a Representative</div>
                                <Image 
                                    src=""
                                    className ="content-card-image"
                                />
                                <Button className="button">Begin Live Chat</Button>
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    </div>
};

export default Support;
