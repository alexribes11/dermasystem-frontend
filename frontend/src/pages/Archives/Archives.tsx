import { PatientImage } from './PatientImage';
import styles from './archives.module.css';

export default function ArchivesPage() {
  const images: PatientImage[] = [];

  function createImages(n: number) {
    for (let i = 0; i < n; i++) {
      images.push({
        patientId: "id0",
        patientName: "Patient Zero",
        imageUrl: "./lesion-with-hair.png",
        dateUploaded: "01/01/01"
      });
    }
  }
  createImages(8);

  return (
      <div className={styles.page}>
        <div className={styles.filter}>
          <h1>Filter</h1>
          <h3>Patient:</h3>
          <select className={styles['filter-input']}>
            <option>Patient 1</option>
            <option>Patient 2</option>
            <option>Patient 3</option>
          </select>
          <h3>Start Date</h3>
          <input type='date' className={styles['filter-input']}></input>
          <h3>End Date</h3>
          <input type='date' className={styles['filter-input']}></input>
        </div>
        <div className={styles.archives}>
          {images.map((image) => {
              return <div>
                <img src={image.imageUrl} className={styles.image}/>
                <h4>Patient Name</h4>
                <p>01/01/01</p>
                <button className={styles['select-btn']}>Select</button>
              </div>
          })}
        </div>
      </div>
    )
}