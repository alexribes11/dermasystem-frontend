import * as React from "react";

//dermasystem logo, image upload icon, browse
const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa8365b2876fbe71abbb736d4f9c98060279931653402cad8a68da12e5fe07a8?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60bdb2779606e9d085e962cdb41f71c461b791775f85c94c5b119d65be271d2c?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/283a2be89a7ef6ceaf0f927b79efeeb95c76ef2f98d038b5afc3c897abd7fd70?apiKey=99043b1e8e4246e2a4338db720628ce9&", alt: "Social icon 3" },
  ];

function imageUpload() {
    return <>
        <section>
            <head>
                <h3>Dermasystem</h3>
                <img> src="/logo.png"</img>
                <p>insert image</p>
                <p>archives</p>
                <p>FAQ</p>
                <img> src="/helpIcon.png"</img>
                <img> src="/notifIcon.png"</img>
                <img> src="/userIcon.png"</img>
            </head>
        </section>
    </>
}

export default imageUpload;