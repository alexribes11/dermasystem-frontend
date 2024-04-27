import { ChangeEventHandler, useState } from "react";
import Hospital from "../../../types/Hospital";
import styles from "./hospital-selection.module.css";
import { GetHospitalsByZipcode } from "../../../utils/api/hospital";
import { RegisterDataControls, RegisterPages } from "../types/register";
import authStyles from '../auth.module.css';
import Header from "../Header";

enum Status {
  DISPLAY,
  LOADING,
  ERROR
}

type props = {
  registerDataControls: RegisterDataControls;
  goTo: (page: RegisterPages) => void;
}


export default function HospitalForm({registerDataControls, goTo}: props) {

  const {registerData, setRegisterData} = registerDataControls;
  const [hospitals, setHospitals] = useState<Hospital[] | undefined>();
  const [status, setStatus] = useState<Status>(Status.DISPLAY);
  const [hospitalSelected, setHospitalSelected] = useState<Hospital | undefined>();
  const [filter, setFilter] = useState({ zipcode: "" });
  const [error, setError] = useState("");
  // const hospitalsReceived = [
  //   {
  //     id: 'TEST_0',
  //     name: 'Houston Methodist Hospital',
  //     address: {
  //       street: '6565 Fannin Street',
  //       city: 'Houston',
  //       state: 'TX',
  //       country: 'USA',
  //       zipcode: 77030
  //     }
  //   },
  //   {
  //     id: 'TEST_1',
  //     name: 'Baylor St.Luke\'s Medical Center',
  //     address: {
  //       street: '6720 Bertner Avenue',
  //       city: 'Houston',
  //       state: 'TX',
  //       country: 'USA',
  //       zipcode: 77030
  //     }
  //   },
  //   {
  //     id: 'TEST_2',
  //     name: 'Los Angeles General Medical Center',
  //     address: {
  //       street: '1200 N State St',
  //       city: 'Los Angeles',
  //       state: 'CA',
  //       country: 'USA',
  //       zipcode: 90033
  //     }
  //   }
  // ];

  const search = async () => {
    const hospitalsReceived = await GetHospitalsByZipcode(parseInt(filter.zipcode));
    setStatus(Status.LOADING);
    setHospitals(hospitalsReceived);
    setStatus(Status.DISPLAY);
  }

  const onFilterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {name, value} = e.target;
    setFilter({...filter, [name]: value});
  }

  const selectHospital = (hospital: Hospital) => {
      setHospitalSelected(hospital);
      setRegisterData(prev => {return {...prev, hospitalId: hospital.id}});
  }

  const goBack = () => {
    if (registerData.role === "admin") {
      goTo(RegisterPages.ADMIN_HOSPITAL_SELECT);
    }
    else {
      goTo(RegisterPages.PERSONAL_DETAILS);
    }
  }

  const goNext = () => {
    if (!hospitalSelected) {
      setError("Please select a hospital first");
    } else {
      goTo(RegisterPages.LOGIN_DETAILS);
    }
  }

  if (status === Status.LOADING) {
    return <h1>Loading...</h1>
  }

  return <div className={styles.page}>
    <Header heading="Find Your Hospital" subheading=""/>
    <div className={styles.search}>
      <p>Enter your hospital's ZIP code:</p>
      <div className={styles['search-bar']}>
        <input name="zipcode" value={filter.zipcode} onChange={onFilterChange}/>
        <button onClick={search}>Search</button>
      </div>
      <div className={styles.hospitals}>
        {hospitals && hospitals.map(hospital => {
          const {id, hospitalName: name, address} = hospital;
          const {street, city, state, zipcode} = address;
          return <div key={id} onClick={() => selectHospital(hospital)} className={hospitalSelected?.id === id ? styles.selected : ''}>
            <h3>{name}</h3>
            <p>{street}, {city} {state} {zipcode}</p>
          </div>
        })}
        {hospitals && hospitals.length === 0 && <i>No hospitals matched your search.</i>}
      </div>
      <button className={authStyles['submit-btn']} onClick={goNext}>Next</button>
    </div>
    <p className={authStyles['link']} onClick={goBack}>Back</p>
    <p style={{textAlign: "center", marginTop: "3rem"}} className={authStyles['error']}>{error}</p>
  </div>
}