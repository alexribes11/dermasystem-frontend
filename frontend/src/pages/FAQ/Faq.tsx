import styles from "./faq.module.css";

function FAQ(): JSX.Element {
    return (

        <div className={styles['profile-page']}>
          
            <div className={styles['hero']}>
                <h1>FAQ</h1>
                <p className={styles["subtitle"]}>Welcome. How can we help you?</p>
                <form className={styles['search-form']}>
                    <label htmlFor="search" className={styles['subtitle']}>
                        Search for topics or catchwords
                        </label>
                        <input type="text" id="search" placeholder='Search for topics or catchwords' />
                </form>
            </div>

            <h2 className={styles['general-questions']}>General Questions</h2>

            <section>
                <aside className={styles['user-type-selection']}>
                    <button className={styles["practitioner-button"]}>practitioner</button>
                    <span className={styles['patient-button']}>patient</span>
                </aside>
            </section>

            <h3>General Questions</h3>

            <div className={styles['questions-list']}>

            </div>
        


        </div>


    );
}

export default FAQ;