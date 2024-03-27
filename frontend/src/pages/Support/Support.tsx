import styles from ".support.module.css";
import Navbar from '../../components/Navbar';

function Support(): JSX.Element{
    return (
        <div className={styles['support-page']}>
            <Navbar />
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

            <main className={styles.content}>
                <div className={styles['content-wrapper']}>
                    <div className={styles['content-column']}>
                        <div className={styles['content-card']}>
                            <div className={styles['content-card-title']}>Find your answer now</div>
                            <img 
                                src="/FAQImage.png"
                                className ={styles['content-card-image']}>
                            </img>     
                            <button className={styles['button']}>Go to FAQ</button>
                        </div>
                    </div>
                    <div className="content-column">
                        <div className="content-card">
                            <div className="content-card-title">Speak with a Representative</div>
                                <img 
                                    src="/speakRep.png"
                                    className ={styles['content-card-image']}>
                                </img>
                                <button className={styles['button']}>Begin Live Chat</button>
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    );
}

export default Support;
