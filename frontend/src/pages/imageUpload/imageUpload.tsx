import React from "react";
import styles from "./imageUpload.module.css";

//dermasystem logo, image upload icon, browse
// const socialIcons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa8365b2876fbe71abbb736d4f9c98060279931653402cad8a68da12e5fe07a8?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60bdb2779606e9d085e962cdb41f71c461b791775f85c94c5b119d65be271d2c?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 2" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a2be89a7ef6ceaf0f927b79efeeb95c76ef2f98d038b5afc3c897abd7fd70?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 3" },
//   ];

function ImageUpload(): React.ReactNode {
    return <>
        <section>
            <header>
                <h3>Dermasystem</h3>
                <img className={styles.logo} src="/logo.png"></img>
                <p className={styles["headersubtitle"]}>Insert image</p>
                <p className={styles["headersubtitle"]}>Archives</p>
                <p className={styles["headersubtitle"]}>FAQ</p>
                <img src="/helpIcon.png" />
                <img src="/notifIcon.png" />
                <img src="/userIcon.png"/>
            </header>
            <h2> Image Upload </h2>
             {/* image upload*/}
            <p className={styles["subtitle"]}> or </p>
            <button className={`${styles["register-btn"]} ${styles["btn"]}`}>BROWSE</button>
        </section>
    </>
}

export default ImageUpload;