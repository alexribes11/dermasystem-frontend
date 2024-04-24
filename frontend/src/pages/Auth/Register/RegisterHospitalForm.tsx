import { ChangeEventHandler, useState } from "react"
import { RegisterDataControls, RegisterPages } from "./Register";
import { CheckIfValid } from "../../../utils/api/hospital";
import Hospital from "../../../types/Hospital";
import styles from '../auth.module.css';

type props = {
  registerDataControls: RegisterDataControls;
  goTo: (page: RegisterPages) => void;
}

export default function RegisterHospitalForm({registerDataControls, goTo}: props) {
  const {setRegisterData} = registerDataControls;
  const [hospitalData, setHospitalData] = useState({
    name: "Memorial Hermann Southwest Hospital",
    street: "7600 Beechnut St",
    city: "Houston",
    state: "TX",
    zipcode: "77074",
    country: "USA",
  });

  const onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setHospitalData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }

  const goBack = () => {
    goTo(RegisterPages.ADMIN_HOSPITAL_SELECT);
  }

  const goNext = async () => {
    const {name: hospitalName, street, city, state, zipcode} = hospitalData;
    const hospital: Hospital = {
      id: "",
      hospitalName,
      address: { street, city, state, zipcode: parseInt(zipcode), country: "USA"}
    }
    const isValid = await CheckIfValid(hospital);
    if (isValid) {
      setRegisterData(prev => {return {
        ...prev, 
        isRegisteringHospital: true,
        registerHospitalData: hospital
      }});
      goTo(RegisterPages.LOGIN_DETAILS);
    }
  }

  return (<div>
    <div className={styles.hospitalRegister}>
      <h3>Name:</h3>
      <input
        name = "name"
        value = {hospitalData.name}
        onChange = {onInputChange}
      />
      <h3>Street:</h3>
      <input
        name = "street"
        value = {hospitalData.street}
        onChange={onInputChange}
      />
      <h3>City:</h3>
      <input
        name = "city"
        value = {hospitalData.city}
        onChange={onInputChange}
      />
      <h3>State:</h3>
      <input
        name = "state"
        value = {hospitalData.state}
        onChange={onInputChange}
      />
      <h3>ZIP Code:</h3>
      <input
        name = "zipcode"
        value = {hospitalData.zipcode}
        onChange={onInputChange}
      />
    </div>
    <div>
      <button onClick={goBack}>Back</button>
      <button onClick={goNext}>Next</button>
    </div>
  </div>)
}