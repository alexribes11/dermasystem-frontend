import React from "react";
import styles from "./profiles.module.css";
import LogoutButton from "./LogoutButton";
import { useOutletContext } from "react-router-dom";
import UserContext from "../../context/UserContext";

function ProfilePage(): React.ReactNode {

    const { user } = useOutletContext() as UserContext;

    const attributesList = [{name: "Age", value: 25},
    {name: "Gender", value: "Male"},
    {name: "Phone Number", value: "1-888-888-8888"},
    {name: "Email", value: "explorer@gmail.com"}];
    
    const objKeysToDisplayedNames = {"personalInfo": "Personal Information",
    "legalFirstName":"Legal First Name", "gettingStarted": "Getting Started", "troubleshooting": "Troubleshooting"}
    const profileObj = {personalInfo: {legalFirstName: "Justin", legalLastName: "Baldoni", dob: "01/01/2017", emergencyContact: "Boots"}, gettingStarted: {}, troubleshooting: {}};

    return <>
        <div className={styles['profile-page']} id="profiles">
            <div className={styles['hero']}>
                <LogoutButton />
                <div className={styles['profile-summary-container']}>
                    <section className={styles['profile-row-with-avatar']}>
                        <div className={styles['profile-row-inner']}>
                            <img src="images/profile-pic-justin-baldoni.jpeg" className={styles["profile-avatar"] + " " + styles["first-ele-in-row"]} />
                            <div className={styles['profile-basic-description-container']}>
                                <h3>{user?.firstName} {user?.lastName}</h3>
                                <p className={styles["subtitle"]}>{user?.userRole}</p>
                            </div>

                            <div className={styles['history-container']}>
                                <div className={styles['history-container-inner']}>
                                <img src="icons/activity-history.png" className={styles["history-icon"]}/>
                                <div className={styles["bottom-aligned"]}>
                                    <h3>view history</h3>
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <hr></hr>
                    <section className={styles['profile-row-after-hr'] + " " + styles['profile-last-row']}>
                        <div className={styles['profile-row-inner']}>
                            <div className={styles['profile-attributes']}>
                                {attributesList.map((attributeObj, ind) => (<div className={styles["profile-attribute"]}>
                                    <p className={styles["subtitle"]}>{attributeObj.name}</p>
                                    <p className={styles["subtitle"]}>{attributeObj.value}</p>
                                </div>))}
                            

                            </div>
                        </div>
                    </section>

                </div>

                <div className={styles['profile-tabs-and-tables']}>
                    <div className={styles['profile-tabs']}>
                        <ul className={styles['no-bullet-points']}>
                            {Object.entries(profileObj).map(([key, value]) => <li>{(key in objKeysToDisplayedNames) ? objKeysToDisplayedNames[key] : key}</li>)}

                        </ul>
                    </div>
                    <div className={styles['profile-tables']}>
                    <div className={styles['profile-tables-inner']}>
                        <div className={styles['profile-tables-header-row']}>
                            <p>Personal Information</p>
                        </div>
                        <hr></hr>

                        <div className={styles['profile-table-container']}>
                            <table>
                                {Object.entries(profileObj["personalInfo"]).map(([key, value]) => <tr>
                                    <td>{(key in objKeysToDisplayedNames) ? objKeysToDisplayedNames[key] : key}</td>
                                    <td>{value}</td>
                                    </tr>)}
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
    
export default ProfilePage;