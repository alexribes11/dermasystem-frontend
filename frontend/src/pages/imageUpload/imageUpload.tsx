import React, {useState, useCallback, useEffect} from "react";
import styles from "./imageUpload.module.css";
import { IconContext } from "react-icons";
import { FiUpload } from "react-icons/fi";
import {useDropzone} from 'react-dropzone'
import { useParams } from "react-router-dom";
import User from "../../types/User";
import { GetPatient } from "../../utils/api/patients";


function ImageUpload(): React.ReactNode {

    const STANDARD_IMAGE_WIDTH = "200";
    const STANDARD_IMAGE_HEIGHT = "200";

    const PORT_NUMBER = 5005;

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>();

    const [pathToProcessedImage, setPathToProcessedImage] = useState('');

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
        console.log("RUN onDrop !!!");
        // Do something with the files
        
        /*
        const file = new FileReader;
        file.onload = function() {
            console.log("onDrop selectedFile AND preview=");
            console.log(acceptedFiles[0], " ", typeof(acceptedFiles[0]));
            console.log(file.result, " ", typeof(file.result));

            setSelectedFile(acceptedFiles[0]);
            setPreview(file.result);

        }
        
        file.readAsDataURL(acceptedFiles[0]);
        */

             
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);

        setSelectedFile(acceptedFiles[0]);
        setPreview(objectUrl);
        setPreviewInputImageOnload(objectUrl);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const {patientId} = useParams() as {patientId: string};
    const [patient, setPatient] = useState<User | undefined>();

    useEffect(() => {
      const fetchPatient = async () => {
        const patient = await GetPatient(patientId);
        setPatient(patient);
      }
      fetchPatient();
    }, [patientId]);

    function preventDefaults(e) {
        console.log("RUN preventDefaults");
        e.preventDefault()
        e.stopPropagation()
    }

    function handleMouseEnter(e) {
        console.log("RUN mouse enter");
    }

    function handleDrop(e) {
        console.log("RUN handleDrop");
        const dt = e.dataTransfer;
        const files = dt.files;
        console.log(typeof(files));
        console.log("files=", files);
        // [...files]
    }

    /*
    function highlight(e) {
        dropArea.classList.add('highlight')
    }
      
    function unhighlight(e) {
        dropArea.classList.remove('active')
    }
    */

    function handleSelectedFileChange(e: Event) {
        const eTarget = (e.target as HTMLInputElement);
        if (!eTarget.files || eTarget.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
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

        /*
        const eTarget = (e?.target as HTMLInputElement);
        console.log(eTarget.files);
        if (eTarget.files == null) {
            return;
        }
        setSelectedFile(eTarget.files[0])
        */
    }

    function handleUploadImageToProcess() {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("patientId", patientId);
        
        // https://stackoverflow.com/questions/49692745/express-using-multer-error-multipart-boundary-not-found-request-sent-by-pos
        // Says to get rid of headers, so that the fetch will automatically
        // set the correct headers for you.
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
                    <h3>Patient: {patient?.firstName} {patient?.lastName} </h3>
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