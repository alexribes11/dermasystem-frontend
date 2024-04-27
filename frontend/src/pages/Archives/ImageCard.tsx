import Photo from "../../types/Photo"
import { formatAMPM } from "../../utils/formatAMPM";
import styles from './archives.module.css';

type props = {
  photo: Photo,
  onClick: (photo: Photo) => void
}

export default function ImageCard({photo, onClick}: props) {
  return (
    <div className={styles['image-card']} key={photo.imgUrl}>
      <img src={photo.imgUrl} className={styles.image}/>
      <p>{formatAMPM(new Date(photo.dateUploaded))}</p>
      <button className={styles['general-btn'] + ' ' + styles['select-btn']} onClick={() => onClick(photo)}>Select</button>
    </div>
  )
}