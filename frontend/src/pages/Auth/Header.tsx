import styles from './auth.module.css';

type props = {
  heading: string,
  subheading: string
}

export default function Header({heading, subheading}: props) {
  return (
    <div className={styles.header}>
      <img src="/logo.png" className={styles.logo}/>
      <div className={styles['header--text']}>
        <h1>{heading}</h1>
        <p>{subheading}</p>
      </div>
    </div>
  )
}