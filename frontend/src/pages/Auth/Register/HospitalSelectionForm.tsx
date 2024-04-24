import { ChangeEventHandler, useState } from "react";
import Hospital from "../../../types/Hospital";
import styles from "../hospital-selection.module.css";
import { RegisterDataControls, RegisterPages } from "./Register";
import { GetHospitalsByZipcode } from "../../../utils/api/hospital";

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
    goTo(RegisterPages.LOGIN_DETAILS);
  }

  if (status === Status.LOADING) {
    return <h1>Loading...</h1>
  }

  return <div className={styles.page}>
    <h1>Find Your Hospital</h1>
    <div className={styles.search}>
      <p>Enter your hospital's ZIP code:</p>
      <input name="zipcode" value={filter.zipcode} onChange={onFilterChange}/>
      <button onClick={search}>Search</button>
      <div className={styles.hospitals}>
        {hospitals && hospitals.map(hospital => {
          const {id, hospitalName: name, address} = hospital;
          const {street, city, state, zipcode} = address;
          return <div key={id} onClick={() => selectHospital(hospital)} className={hospitalSelected?.id === id ? styles.selected : ''}>
            <h2>{name}</h2>
            <p>{street}, {city} {state} {zipcode}</p>
          </div>
        })}
        {hospitals && hospitals.length === 0 && <i>No hospitals matched your search.</i>}
      </div>
    </div>
    <div className={styles.navigation}>
      <button onClick={goBack}>Back</button>
      <button disabled={!hospitalSelected} onClick={goNext}>Next</button>
    </div>
  </div>
}