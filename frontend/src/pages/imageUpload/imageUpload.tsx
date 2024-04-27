import React, { useState, useCallback, useEffect } from "react";
import styles from "./imageUpload.module.css";
import { IconContext } from "react-icons";
import { FiUpload } from "react-icons/fi";
import {useDropzone} from 'react-dropzone'
import usePatients from "../../hooks/usePatients";


function ImageUpload(): React.ReactNode {

    const STANDARD_IMAGE_WIDTH = "200";
    const STANDARD_IMAGE_HEIGHT = "200";

    const PORT_NUMBER = 5005;

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>();

    const [pathToProcessedImage, setPathToProcessedImage] = useState('');

    const patients = usePatients();
    useEffect(() => {
      if (patients.length > 0) {
        setPatient(patients[0].id);
      }
    }, [patients]);

    const setPreviewInputImageOnload = (newObjectUrl: string) => {
        // free memory when ever this component is unmounted
        const previewInputImgObj = document.getElementById("previewInputImg");
        if (previewInputImgObj != null) {
            previewInputImgObj.onload = (evt) => {
                console.log("RUN previewInputImgObj onload !!! with objectUrl=", newObjectUrl);
                previewInputImgObj.onload = null
                URL.revokeObjectURL(newObjectUrl);
                setPathToProcessedImage('');
            }
        }


    }

    const onDrop = useCallback((acceptedFiles: FileList) => {
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);

        setSelectedFile(acceptedFiles[0]);
        setPreview(objectUrl);
        setPreviewInputImageOnload(objectUrl);
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const [patient, setPatient] = useState("");

    function handleSelectedFileChange(e: Event) {
        const eTarget = (e.target as HTMLInputElement);
        if (!eTarget.files || eTarget.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(eTarget.files[0]);
        if (!eTarget.files[0]) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(eTarget.files[0]);
        console.log("IMPORTANT the objectUrl of new object=", objectUrl);
        console.log("handleSelectedFileChange selectedFile AND preview=");
        console.log(eTarget.files[0], " ", typeof(eTarget.files[0]));
        console.log(objectUrl, " ", typeof(objectUrl));
        setPreview(objectUrl);

        setPreviewInputImageOnload(objectUrl);
    }

    function handleUploadImageToProcess() {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("patientId", patient);
        
        console.log("RUN handleUploadImageToProcess, Before call fetch.");
        fetch("http://localhost:" + PORT_NUMBER + "/processImage", {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log("POST process-image .then(), res=", res);

            setPathToProcessedImage("http://localhost:" + PORT_NUMBER + "/static/" + res.processedFilename);
        })
        .catch((err) => (err));

    }

    function handleCancelImageUpload() {
        setPreview('');
        setPathToProcessedImage('');
    }

   console.log("pathToProcessedImage=", pathToProcessedImage);

    return <>
        <section>
            <div className={styles.imageUploadFormContainer}>
                <div className={styles.centeredRow + " " + styles.topMostRow + " " + styles.header}>
                    <h2>Image Upload</h2>
                    <div className={styles['patient-selector']}>
                      <h3>Patient: </h3>
                      <select value={patient} onChange={(e) => setPatient(e.target.value)}>
                        {patients.map(patient => 
                          <option value={patient.id} key={patient.id}>
                            {patient.firstName} {patient.lastName}
                          </option>
                        )}
                      </select>
                    </div>
                </div>
                <div className={styles.imageUploadFormContainerRow}>
                    <div className={styles.imageUploadFormContainerCol}>
                    <input type="file" name="file" id="uploadInputImageButton" onChange={handleSelectedFileChange} className={styles.inputFile}></input>
                    <label htmlFor="uploadInputImageButton"> Choose file... </label>


                    </div>
                </div>
                <div className={styles.imageUploadFormContainerRow}>
                    <div className={styles.imageUploadContainer}>
                    
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div id="drop-area" className={styles.dropArea + " " + styles.dropInputArea}>
                            {preview && <div className={styles.imgContainer}>
                                <img id="previewInputImg" src={preview} width={STANDARD_IMAGE_WIDTH} height={STANDARD_IMAGE_HEIGHT}/>
                                </div>
                            }
                            {!preview && <IconContext.Provider value={{ color: "#0e9cde", size: '50px' }}>
                            <FiUpload />
                            </IconContext.Provider>
                            }
                    
                        </div>
                    </div>

                    
                   
                    </div>

                    <div className={styles.imageUploadContainer}>
                        <div className={styles.dropArea + ' ' + styles.greyBackgroundColor}>
                            <div className={styles.imgContainer}>
                                <img src={pathToProcessedImage} alt="Either a image has not been uploaded or has not been processed" width={STANDARD_IMAGE_WIDTH} height={STANDARD_IMAGE_HEIGHT}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.centeredRow}>
                    <div className={styles.colCenteredWithinRow + " " + styles.colOfTwoButtons}>
                        <button className={styles.roundButton} onClick={() => handleUploadImageToProcess()}>Submit</button>
                        <button className={styles.roundButton} onClick={() => handleCancelImageUpload()}>Cancel</button>
                    </div>
                </div>
             </div>


        </section>
    </>
}

export default ImageUpload;