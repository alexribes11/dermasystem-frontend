import { ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react';
import { PatientImage } from './PatientImage';
import { Patient } from './Patient';
import styles from './archives.module.css';
// import stylesImage from '../imageUpload/imageUpload.module.css';

import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import ReactModal from 'react-modal';
import UserContext from '../../context/UserContext';
import { useOutletContext } from 'react-router-dom';
import { FetchImages } from '../../utils/api/images';
import User from '../../types/User';
import { GetPatients } from '../../utils/api/patients';
import Photo from '../../types/Photo';

export default function ArchivesPage() {

  function formatAMPM(date: Date) {
    return date.toLocaleString(
      'en-US', 
      { 
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true
     }
    );
  }

  const [images, setImages] = useState<Photo[]>([]);

  const [refreshImagesFlag, setRefreshImagesFlag] = useState(false);

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [patientSelected, setPatientSelected] = useState("");
  const [imageSelected, setImageSelected] = useState<null|Photo>(null);

  const [imageSelectedInfo, setImageSelectedInfo] = useState({});

  const [filterData, setFilterData] = useState({patientName: "", dateFrom: "", dateTo: ""});

  const getImages = async (patientId: string) => {
    const { photos } = await FetchImages(patientId);
    console.log(photos);
    setImages(photos);
  }

  const [patients, setPatients] = useState<User[]>([]);

  const getPatients = async () => {
    const data = await GetPatients();
    setPatients(data);
  }

  const { user } = useOutletContext() as UserContext;
  
  useEffect(() => {
    if (user?.userRole === "patient") {
      getImages(user.id);
    } else {
      getPatients();
    }
    setVisibleDeleteModal(false);
    setImageSelected(null);

  }, [refreshImagesFlag]);

  const selectImage = (imageToSelect) => {
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

  function sendDeleteRequest() {
    console.log("RUN sendDeleteRequest imageSelected.imageUrl=", imageSelected.imageUrl)
    //imageSelected.imageUrl

    fetch("http://localhost:" + PORT_NUMBER + "/api/v0/images/scheduleDelete", {
            method: 'PUT',
            body: JSON.stringify({photoToScheduleDelete: imageSelected.imageUrl}),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
        }).then((res) => {
          console.log("res=", res);
          if (res.status == 200) {
            // Send the user back to the main page of Archives page,
            // which shows all the images.

            setRefreshImagesFlag(!refreshImagesFlag);
            
          }
        })
        .catch((err) => (err));

    
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
          <p className={styles['leftColumnEntry']}>{imageSelected.uploadedBy}</p>
          </div>

          <button className={styles['leftColumnButton']} onClick={() => showDeleteModal()}>Delete</button>
          </div>}
        
          {imageSelected==null && images.map((image) => {
              return <div className={styles.archives}>
                <div className={styles['image-card']} key={image.imgUrl}>
                <img src={image.imgUrl} className={styles.image}/>
                <p>{formatAMPM(new Date(image.dateUploaded))}</p>
                <button className={styles['general-btn'] + ' ' + styles['select-btn']} onClick={() => selectImage(image)}>Select</button>
              </div>
              </div>
          })}
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