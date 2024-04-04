import React, {useState, useEffect} from "react";
import styles from "./imageUpload.module.css";
import { Link } from "react-router-dom";

//dermasystem logo, image upload icon, browse
// const socialIcons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa8365b2876fbe71abbb736d4f9c98060279931653402cad8a68da12e5fe07a8?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60bdb2779606e9d085e962cdb41f71c461b791775f85c94c5b119d65be271d2c?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 2" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a2be89a7ef6ceaf0f927b79efeeb95c76ef2f98d038b5afc3c897abd7fd70?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 3" },
//   ];

function ImageUpload(): React.ReactNode {
    console.log("TYPEOF = ", typeof(styles.imageUploadFormContainer));
    const STANDARD_IMAGE_WIDTH = "200";
    const STANDARD_IMAGE_HEIGHT = "200";

    const PORT_NUMBER = 5005;
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState();

    const [pathToProcessedImage, setPathToProcessedImage] = useState('');

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

    function highlight(e) {
        dropArea.classList.add('highlight')
    }
      
    function unhighlight(e) {
        dropArea.classList.remove('active')
    }

    function handleSelectedFileChange(e: Event) {
        const eTarget = (e.target as HTMLInputElement);
        if (!eTarget.files || eTarget.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(eTarget.files[0])
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
            credentials: 'include'
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
                <div className={styles.centeredRow}>
                    <h2>Image Upload</h2>
                </div>
                <div className={styles.imageUploadFormContainerRow}>
                    <div className={styles.imageUploadFormContainerCol}>
                    <input type="file" name="file" id="uploadInputImageButton" onChange={handleSelectedFileChange} className={styles.inputFile}></input>
                    <label htmlFor="uploadInputImageButton"> Choose file... </label>

                    <p className={styles["subtitle"]}> or </p>
            <Link to={"/archives"}><button className={`${styles["register-btn"]} ${styles["btn"]}`}>BROWSE</button></Link>
                    </div>
                </div>
                <div className={styles.imageUploadFormContainerRow}>
                    <div className={styles.imageUploadContainer}>
                    
                    <div id="drop-area" className={styles.dropArea}>
                    {selectedFile &&  <img src={preview} width={STANDARD_IMAGE_WIDTH} height={STANDARD_IMAGE_HEIGHT}/> }
                    </div>
                    </div>

                    <div className={styles.imageUploadContainer}>
                        <div className={styles.dropArea + ' ' + styles.greyBackgroundColor}>
                        <img src={pathToProcessedImage} alt="Either a image has not been uploaded or has not been processed" width={STANDARD_IMAGE_WIDTH} height={STANDARD_IMAGE_HEIGHT}/>
                        </div>
                    </div>
                </div>

                <div className={styles.centeredRow}>
                    <button onClick={() => handleUploadImageToProcess()}>Submit</button>
                </div>
             </div>


        </section>
    </>
}

export default ImageUpload;