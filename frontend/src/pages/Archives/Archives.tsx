import { useEffect, useState } from 'react';
import { PatientImage } from './PatientImage';
import styles from './archives.module.css';
// import stylesImage from '../imageUpload/imageUpload.module.css';

import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ArchivesPage() {
  const catImageUrl = "https://media.istockphoto.com/id/1385217969/photo/ginger-cat-walks.jpg?s=612x612&w=0&k=20&c=mBhFzDA2dp23dV4jq6FooaSzG2tmCZMKP6TV56hMVII=";
  const [images, setImages] = useState<PatientImage[]>([{patientName: "Richard", imageUrl: catImageUrl, dateUploaded: "April 15, 2024", patientId: "asdf"}]);

  // if imageSelected is null, then we assume that no image has been selected.
  // = useState(catImageUrl);
  const [imageSelected, setImageSelected] = useState(null);

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

  const selectImage = (imageToSelect) => {
    console.log("RUn selectImage imageToSelect=", imageToSelect);
    setImageSelected(imageToSelect);
  }

  const unselectImage = () => {
    setImageSelected(null);
  }

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
          {imageSelected==null && images.map((image) => {
              return <div className={styles['image-card']} key={image.imageUrl}>
                <img src={image.imageUrl} className={styles.image}/>
                <h4>{image.patientName}</h4>
                <p>{image.dateUploaded}</p>
                <button className={styles['general-btn'] + ' ' + styles['select-btn']} onClick={() => selectImage(image.imageUrl)}>Select</button>
              </div>
          })}
          {imageSelected!=null && <div className={styles['selected-image-viewer']}>
            <div className={styles.topButtonHeader}>
            <button className={styles['general-btn'] + ' ' + styles['unselect-btn']} onClick={unselectImage}>
              <div style={{display: "flex"}}>
                <div style={{display: "flex", justifyContent: "start"}}>

              <IconContext.Provider value={{ color: "#fff", size: '20px' }}>
                <FaArrowLeftLong />
              </IconContext.Provider>
                </div>

                <div>
                  Go Back
                </div>
              </div>
            </button>
            </div>

            <div className={styles.imageUploadFormContainer}>
              hi
              </div>
          
          </div>
          }

        </div>
      </div>
    )
}