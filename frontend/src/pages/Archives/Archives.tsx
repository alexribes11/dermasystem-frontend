import { useEffect, useState } from 'react';
import { PatientImage } from './PatientImage';
import { Patient } from './Patient';
import styles from './archives.module.css';
// import stylesImage from '../imageUpload/imageUpload.module.css';

import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import ReactModal from 'react-modal';

export default function ArchivesPage() {
  function formatAMPM(date: Date) {
    /*
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0'+minutes : (minutes.toString());
    const strTime = hours + ':' + minutesStr + ' ' + ampm;
    // return strTime;
    */
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  const PORT_NUMBER = 5005;

  const catImageUrl = "https://media.istockphoto.com/id/1385217969/photo/ginger-cat-walks.jpg?s=612x612&w=0&k=20&c=mBhFzDA2dp23dV4jq6FooaSzG2tmCZMKP6TV56hMVII=";
  const [images, setImages] = useState<PatientImage[]>([{patientName: "Richard", imageUrl: catImageUrl, dateUploaded: "April 15, 2024", patientId: "asdf"}]);
  const [patients, setPatients] = useState<Patient[]>([{firstName: "Albert", lastName: "Einstein", role: "patient",
  username: "aeinstein01",
  password: "aeinstein",
  email: "aeinstein01@gmail.com",
  hospitalId: "781",
  userId: "12495",
  doctorId: "1939",}]);

  const [refreshImagesFlag, setRefreshImagesFlag] = useState(false);

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  // if imageSelected is null, then we assume that no image has been selected.
  // = useState(catImageUrl);
  const [imageSelected, setImageSelected] = useState<null|object>(null);

  const [imageSelectedInfo, setImageSelectedInfo] = useState({});
  // .imageUrl, .patientName, .dateUploaded, .uploadedBy

  const [filterData, setFilterData] = useState({patientName: "", dateFrom: "", dateTo: ""});

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('http://localhost:5005/api/v0/images', {
        credentials: 'include'
      });
      const data = await response.json();
      const { photos } = data;
      console.log("photos=", photos);
      // convertStringsToObjects
      for (let i=0; i < photos.length; i++) {
        if (typeof(photos[i]) == "string") {
          console.log("IN FOR LOOP AFTER GETTING PHOTOS, typeof(photos[i]) == 'string'");
          photos[i] = {imageUrl: photos[i]}
        }
      }

      setVisibleDeleteModal(false);
      setImageSelected(null);
      setImages(photos);
    }
    fetchImages();

    const fetchPatients = async () => {
      const response = await fetch('http://localhost:5005/api/v0/patients', {
        credentials: 'include'
      });
      const data = await response.json();
      const { patients } = data;
      console.log("patients=", patients);
      setPatients(patients);
    }
    fetchImages();
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

  return (
      <div className={styles.page} id="Archives">
        {imageSelected==null &&
          <div className={styles.leftColumn}>
            <form onSubmit={handleSubmit} className={styles['filter-form']}>
            <h1 className={styles['leftColumnTitle']}>Filter</h1>
            <h3>Patient:</h3>
            <select className={styles['filter-input']}>
              {patients.map((patient) => <option>{patient.firstName + " " + patient.lastName}</option>)}
            </select>
            <h3>Start Date</h3>
            <input type='date' className={styles['filter-input']} value={filterData.dateFrom} onChange={(e) => {setFilterData({...filterData, dateFrom: e.target.value})}}></input>
            <h3>End Date</h3>
            <input type='date' className={styles['filter-input']} value={filterData.dateTo} onChange={(e) => {setFilterData({...filterData, dateTo: e.target.value})}}></input>
            <input type="submit" className={styles['filter-input'] + " " + styles['centered-btn']} value="Search" />
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
                <div className={styles['image-card']} key={image.displayImageUrl}>
                <img src={image.displayImageUrl} className={styles.image}/>
                <h4>{image.patientName}</h4>
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
                <img src={imageSelected.displayImageUrl} />
                <div>Original Image</div>
              </div>

              <div className={styles.imageInDoubleContainer}>
                <img src={catImageUrl} />
                <div>Image with Hair Removed</div>
              </div>

            </div>
          
          </div>
          }

      </div>
    )
}