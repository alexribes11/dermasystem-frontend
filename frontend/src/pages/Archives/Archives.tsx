import { ChangeEventHandler, useEffect, useState } from 'react';
import styles from './archives.module.css';
import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import ReactModal from 'react-modal';
import UserContext from '../../context/UserContext';
import { useOutletContext } from 'react-router-dom';
import { DeleteImage, FetchImages, RecoverImage } from '../../utils/api/images';
import User from '../../types/User';
import { GetPatients } from '../../utils/api/patients';
import Photo from '../../types/Photo';
import { formatAMPM } from '../../utils/formatAMPM';
import ImageCard from './ImageCard';

export default function ArchivesPage() {

  const [images, setImages] = useState<Photo[]>([]);

  const [refreshImagesFlag, setRefreshImagesFlag] = useState(false);

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [patientSelected, setPatientSelected] = useState("");
  const [imageSelected, setImageSelected] = useState<null|Photo>(null);

  const [filterData, setFilterData] = useState({patientName: "", dateFrom: "", dateTo: ""});

  const getImages = async (patientId: string) => {
    const { photos } = await FetchImages(patientId);
    console.log(photos);
    setImages(photos);
  }

  const [patients, setPatients] = useState<User[]>([]);

  const getPatients = async () => {
    const data = await GetPatients() as User[];
    setPatients(data);
    if (data.length > 0) {
      setPatientSelected(data[0].id);
    }
  }

  const { user } = useOutletContext() as UserContext;
  
  useEffect(() => {
    if (user?.userRole === "patient") {
      getImages(user.id);
    } else {
      getPatients();
    }
  }, []);

  useEffect(() => {
    setVisibleDeleteModal(false);
    setImageSelected(null);

  }, [refreshImagesFlag]);

  const selectImage = (imageToSelect: Photo) => {
    console.log("RUn selectImage imageToSelect=", imageToSelect);
    setImageSelected(imageToSelect);
  }

  const unselectImage = () => {
    setImageSelected(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Need to filter the "images" variable
    images.filter((image) => {
      let imageIsBetweenDates = true;
      return imageIsBetweenDates;
    })
  }

  function showDeleteModal() {
    setVisibleDeleteModal(true);
  }

  function hideDeleteModal() {
    setVisibleDeleteModal(false);
  }

  async function sendDeleteRequest() {
    if (!imageSelected) return;
    await DeleteImage(imageSelected.patientId, imageSelected.id);
    setImages(images.filter(img => img.id !== imageSelected.id));
    setRefreshImagesFlag(!refreshImagesFlag);
  }

  async function recoverImage() {
    if (!imageSelected) return;
    await RecoverImage(patientSelected, imageSelected); 
    setImageSelected(null);
    setRefreshImagesFlag(!refreshImagesFlag);
  }

  const search = () => {
    console.log(patientSelected);
    getImages(patientSelected);
  };

  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const patientSelected = e.target.value;
    setPatientSelected(patientSelected);
  }

  return (
      <div className={styles.page} id="Archives">
        {imageSelected==null &&
          <div className={styles.leftColumn}>
            <form onSubmit={handleSubmit} className={styles['filter-form']}>
            <h1 className={styles['leftColumnTitle']}>Filter</h1>
            <h3>Patient:</h3>
            <select className={styles['filter-input']} value={patientSelected} onChange={onSelectChange}>
              {patients.map((patient) => <option value={patient.id} key={patient.id}>{patient.firstName + " " + patient.lastName}</option>)}
            </select>
            <h3>Start Date</h3>
            <input type='date' className={styles['filter-input']} value={filterData.dateFrom} onChange={(e) => {setFilterData({...filterData, dateFrom: e.target.value})}}></input>
            <h3>End Date</h3>
            <input type='date' className={styles['filter-input']} value={filterData.dateTo} onChange={(e) => {setFilterData({...filterData, dateTo: e.target.value})}}></input>
            {user?.userRole === "admin" && <>
              <h3>Recently Deleted</h3>
              <input type='checkbox' />
            </>}
            <button onClick={search} className={styles['filter-input'] + " " + styles['centered-btn']}>Search</button>
            </form>
          </div>
        }

        {imageSelected!=null && <div className={styles.leftColumn}>
          <div className={styles.leftColumnDetails}>
          <h1 className={styles['leftColumnTitle']}>Photo Details</h1>
          <h3>Patient:</h3>
          <p className={styles['leftColumnEntry']}>{imageSelected.patientName}</p>
          <h3>Date Uploaded:</h3>
          <p className={styles['leftColumnEntry']}>{formatAMPM(new Date(imageSelected.dateUploaded))}</p>
          <h3>Uploaded By:</h3>
          <p className={styles['leftColumnEntry']}>{imageSelected.uploadedBy.name}</p>
          <h3>Diagnosis:</h3>
          <p className={styles['leftColumnEntry']}>{imageSelected.diagnosis}</p>
          {user?.userRole === "admin" && <>
            {imageSelected.dateDeleted !== null && <>
              <h3>Date Deleted:</h3>
              <p className={styles['leftColumnEntry']}>{formatAMPM(new Date(imageSelected.dateDeleted))}</p>
              <h3>Deleted By:</h3>
              <p className={styles['leftColumnEntry']}>{imageSelected.deletedBy?.name}</p>
            </>}
          </>}
          </div>
          { !imageSelected.dateDeleted && <button className={styles['leftColumnButton']} onClick={() => showDeleteModal()}>Delete</button> }

          { imageSelected.dateDeleted && user?.userRole === "admin" && 
              <button className={styles['leftColumnButton'] + " " + styles['recoverButton']} onClick={() => recoverImage()}>Recover</button>
          }
          </div>}
        
          {imageSelected==null && <div className={styles.archives}>
            {images.map(image => <ImageCard photo={image} onClick={selectImage} key={image.imgUrl}/>)}
           </div>
          }

          {imageSelected!=null && <div className={styles['selected-image-viewer']}>
            <ReactModal isOpen={visibleDeleteModal} className={styles['deleteModal'] + " " + styles['modal']}>
              <div className={styles['deleteModalContent']}>
                <div className={styles['deleteModalContentHeader']}>Delete</div>
                <hr />
                <div className={styles['deleteModalContentBody']}>Are you sure you want to delete this image? <br></br>If you delete it, the image will stay hidden for 30 days, until it is permanently deleted.</div>
                <hr />
                <div className={styles['deleteModalContentFooter']}>
                  <button className={styles['modelContentButton']} onClick={() => hideDeleteModal()}>Cancel</button>
                  <button className={styles['modelContentButton'] + " "  + styles['redButton']} onClick={() => sendDeleteRequest()}>Delete</button>
                </div>
                </div>
            </ReactModal>
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
              <div className={styles.imageInDoubleContainer}>
                <img src={imageSelected.imgUrl} />
                <div>Original Image</div>
              </div>

              <div className={styles.imageInDoubleContainer}>
                <img src={imageSelected.imgUrl} />
                <div>Image with Hair Removed</div>
              </div>

            </div>
          
          </div>
          }

      </div>
    )
}