import React, {useState, useEffect, useCallback} from "react";
import styles from "./imageUpload.module.css";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FiUpload } from "react-icons/fi";
import {useDropzone} from 'react-dropzone'

//dermasystem logo, image upload icon, browse
// const socialIcons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa8365b2876fbe71abbb736d4f9c98060279931653402cad8a68da12e5fe07a8?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60bdb2779606e9d085e962cdb41f71c461b791775f85c94c5b119d65be271d2c?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 2" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a2be89a7ef6ceaf0f927b79efeeb95c76ef2f98d038b5afc3c897abd7fd70?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 3" },
//   ];

function ImageUpload(): React.ReactNode {
    /*
    <p className={styles["subtitle"]}> or </p>
    <Link to={"/archives"}><button className={`${styles["register-btn"]} ${styles["btn"]}`}>BROWSE</button></Link>
    */
    console.log("TYPEOF = ", typeof(styles.imageUploadFormContainer));
    const STANDARD_IMAGE_WIDTH = "200";
    const STANDARD_IMAGE_HEIGHT = "200";

    const PORT_NUMBER = 5005;

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>();

    const [pathToProcessedImage, setPathToProcessedImage] = useState('');

    /*
    const dropArea = document.getElementById("drop-area")
    if (dropArea != null) {
        console.log("dropArea is not null");
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)   
            document.body.addEventListener(eventName, preventDefaults, false)
        });

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);

        dropArea.addEventListener('mouseover', handleMouseEnter, false);

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });
    }
    */

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
        
        // https://stackoverflow.com/questions/49692745/express-using-multer-error-multipart-boundary-not-found-request-sent-by-pos
        // Says to get rid of headers, so that the fetch will automatically
        // set the correct headers for you.
        console.log("RUN handleUploadImageToProcess, Before call fetch.");
        fetch("http://localhost:" + PORT_NUMBER + "/process-image", {
            method: 'POST',
            body: formData,
            // credentials: 'include'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log("POST process-image .then(), res=", res);

            setPathToProcessedImage("http://localhost:" + PORT_NUMBER + "/static/" + res.processedFilename);
            /*
            fetch("http://localhost:" + PORT_NUMBER + "/static/" + res.pathToProcessedFile, {
                method: 'GET'
            }).then((res) => {
                return res.json()
            });
            */
        })
        .catch((err) => (err));

    }

    function handleCancelImageUpload() {
        setPreview('');
        setPathToProcessedImage('');
    }

    /*
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    */

    /*
    const form = document.getElementById("form");  
    form?.addEventListener("submit", handleUploadImageToProcess);
    <form id="form">
            <label>Test field:  <input type="file" name="uploadImageButton"></input></label>
            <br /><br />
            <input type="submit" value="Click to Upload Image" />
            </form>
    */

        console.log("pathToProcessedImage=", pathToProcessedImage);

    /*
    It used to be {!selectedFile && },
    but now it is {!preview && }.
    */
    return <>
        <section>
            {/* <header>
                <h3>Dermasystem</h3>
                <img className={styles.logo} src="/logo.png"></img>
                <nav className="nav-links">
                    <div className="nav-link nav-link active"> insert image</div>
                    <div className="nav-link"> archives</div>
                    <div className="nav-link"> FAQ</div>
                </nav>
                    <img src="/helpIcon.png" />
                    <img src="/notifIcon.png" />
                    <img src="/userIcon.png"/>
                </header> */}
            
             {/* image upload*/}

            <div className={styles.imageUploadFormContainer}>
                <div className={styles.centeredRow + " " + styles.topMostRow}>
                    <h2>Image Upload</h2>
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