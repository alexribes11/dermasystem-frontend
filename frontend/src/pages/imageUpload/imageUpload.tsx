import React, {useState} from "react";
import styles from "./imageUpload.module.css";
import { Link } from "react-router-dom";

//dermasystem logo, image upload icon, browse
// const socialIcons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa8365b2876fbe71abbb736d4f9c98060279931653402cad8a68da12e5fe07a8?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60bdb2779606e9d085e962cdb41f71c461b791775f85c94c5b119d65be271d2c?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 2" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a2be89a7ef6ceaf0f927b79efeeb95c76ef2f98d038b5afc3c897abd7fd70?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 3" },
//   ];

function ImageUpload(): React.ReactNode {
    const PORT_NUMBER = 5005;
    const [image, setImage] = useState('')

    function handleImageChange(e) {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    function handleUploadImageToProcess() {
        const formData = new FormData();
        formData.append("file", image);
        
        // https://stackoverflow.com/questions/49692745/express-using-multer-error-multipart-boundary-not-found-request-sent-by-pos
        // Says to get rid of headers, so that the fetch will automatically
        // set the correct headers for you.
        console.log("RUN handleUploadImageToProcess, Before call fetch.");
        fetch("http://localhost:" + PORT_NUMBER + "/process-image", {
            method: 'POST',
            body: formData
        }).then((res) => console.log(res))
        .catch((err) => ("Error occured", err));

    }

    /*
    const form = document.getElementById("form");  
    form?.addEventListener("submit", handleUploadImageToProcess);
    <form id="form">
            <label>Test field:  <input type="file" name="uploadImageButton"></input></label>
            <br /><br />
            <input type="submit" value="Click to Upload Image" />
            </form>
    */

    return <>
        <section>
            <header>
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
                </header>
            <h2> Image Upload </h2>
             {/* image upload*/}

             <input type="file" name="file" onChange={handleImageChange}></input>
             <button onClick={() => handleUploadImageToProcess()}>Submit</button>
            

            <p className={styles["subtitle"]}> or </p>
            <Link to={"/archives"}><button className={`${styles["register-btn"]} ${styles["btn"]}`}>BROWSE</button></Link>
        </section>
    </>
}

export default ImageUpload;