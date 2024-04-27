import { PropsWithChildren } from "react";
import styles from './auth.module.css';

type props = {
  label: string,
  error: string,
}
export default function CustomInput({children, error, label}: PropsWithChildren<props>) {
  const updatedLabel = label.split(" ").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
  return <div className={styles['input-container']}>
    <h3>{updatedLabel}</h3>
    {children}
    <p className={styles['error']}>{error}</p>
  </div>
}