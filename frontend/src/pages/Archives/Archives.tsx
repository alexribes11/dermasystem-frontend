import { useEffect, useState } from 'react';
import { PatientImage } from './PatientImage';
import styles from './archives.module.css';

export default function ArchivesPage() {

  const [images, setImages] = useState<PatientImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('http://localhost:5005/api/v0/images', {
        credentials: 'include'
      });
      const data = await response.json();
      const { photos } = data;
      setImages(photos);
    }
    fetchImages();
  }, []);

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
              return <div className={styles['image-card']} key={image.imageUrl}>
                <img src={image.imageUrl} className={styles.image}/>
                <h4>{image.patientName}</h4>
                <p>{image.dateUploaded}</p>
                <button className={styles['select-btn']}>Select</button>
              </div>
          })}
        </div>
      </div>
    )
}