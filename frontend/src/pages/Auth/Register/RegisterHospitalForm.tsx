import { CheckIfValid } from "../../../utils/api/hospital";
import Hospital from "../../../types/Hospital";
import CustomForm from "../CustomForm";
import { HospitalDataControls, HospitalRegisterInfo, RegisterPages } from "../types/register";
import { CustomInputs } from "../types/CustomForm";
import Header from "../Header";
import styles from '../auth.module.css';

type props = {
  hospitalControls: HospitalDataControls;
  goTo: (page: RegisterPages) => void;
}

export default function RegisterHospitalForm({ goTo, hospitalControls }: props) {

  
  const {hospitalData, setHospitalData} = hospitalControls;

  const hospitalInfo: HospitalRegisterInfo = hospitalData ? hospitalData : {
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "USA"
  };

  const goBack = () => {
    goTo(RegisterPages.ADMIN_HOSPITAL_SELECT);
  }

  const goNext = async (args: Record<string, string>) => {

    const data = args as HospitalRegisterInfo;
    const {name: hospitalName, street, city, state, zipcode} = data;

    const hospital: Hospital = {
      id: "",
      hospitalName,
      address: { street, city, state, zipcode: parseInt(zipcode), country: "USA"}
    }

    const isValid = await CheckIfValid(hospital);
    if (isValid) {
      setHospitalData(data);
      goTo(RegisterPages.LOGIN_DETAILS);
    }
  }

  const inputs: CustomInputs = [
    {
      name: "name", 
      label: "Hospital Name", 
      validator: (value) => value ? "" : "Please enter your hospital's name"
    },
    {
      name: "street",
      validator: (value) => value ? "" : "Please enter your hospital's street"
    },
    {
      name: "city",
      validator: (value) => value ? "" : "Please enter your hospital's city"
    },
    {
      name: "state",
      validator: (value) => value ? "" : "Please enter your hospital's state"
    },
    {
      name: "zipcode",
      validator: (value) => value ? "" : "Please enter your hospital's zipcode"
    },
  ];

  return (<div>
    <CustomForm 
      header={<Header heading="Register Hospital" subheading=""/>}
      data={hospitalInfo}
      inputs={inputs}
      onSuccess={goNext}
      submitBtnText="Next"
    />
    <p className={styles['link']} onClick={goBack}>Back</p>
  </div>)
}