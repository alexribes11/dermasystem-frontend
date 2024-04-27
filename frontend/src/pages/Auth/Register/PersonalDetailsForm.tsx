import { Link } from 'react-router-dom';
import styles from '../auth.module.css';
import Header from '../Header';
import CustomForm from '../CustomForm';
import { RegisterDataControls, RegisterPages } from '../types/register';
import { CustomInputs } from '../types/CustomForm';


type props = {
  registerDataControls: RegisterDataControls;
  goTo: (page: RegisterPages) => void;
}

type PersonalDetails = {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
}

export default function PersonalDetailsForm({registerDataControls, goTo}: props) {

  const {registerData, setRegisterData} = registerDataControls;

  const personalDetails: PersonalDetails = {
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    role: registerData.role
  };

  const goNext = (formInfo: Record<string, string>) => {

    const personalDetails = formInfo as PersonalDetails;
    setRegisterData(prev => {return {...prev, ...personalDetails}});

    if (personalDetails.role === 'admin') {
      goTo(RegisterPages.ADMIN_HOSPITAL_SELECT);
    } else {
      goTo(RegisterPages.HOSPITAL_SELECTION);
    }

  }

  const roles = [
    "patient",
    "doctor",
    "nurse",
    "admin"
  ]

  const inputs: CustomInputs = [
    {
      name: "firstName", 
      label: "First Name", 
      validator: (value) => value ? "" : "Please enter your first name"
    },
    {
      name: "lastName",
      label: "Last Name", 
      validator: (value) => value ? "" : "Please enter your last name"
    },
    {
      name: "email",
      validator: (value) => value ? "" : "Please enter your email"
    },
    {
      name: "role", 
      label: "I am a...",
      validator: (value) => roles.includes(value) ? "" : "Please select a valid role", 
      isSelect: true,
      options: roles
    }
  ]

  return (
    <>
      <CustomForm 
        data={personalDetails}
        inputs={inputs}
        onSuccess={goNext}
        submitBtnText='Next'
        header={<Header heading='Register' subheading='Join us' />}
      />
      <Link to={'/login'} className={styles['link']}>Already have an account?</Link>
    </>
  )
}