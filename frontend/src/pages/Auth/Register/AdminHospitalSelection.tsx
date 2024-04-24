import { FormEventHandler, useState } from "react";
import { RegisterPages } from "./Register";

type props = {
  goTo: (page: RegisterPages) => void;
}

export default function AdminHospitalSelection({goTo}: props) {

  const [selection, setSelection] = useState("");

  const goBack = () => {
    goTo(RegisterPages.PERSONAL_DETAILS);
  }

  const goNext = () => {
    if (selection === "search") {
      goTo(RegisterPages.HOSPITAL_SELECTION);
    } else {
      goTo(RegisterPages.REGISTER_HOSPITAL)
    }
  }

  const onSelectionChange: FormEventHandler<HTMLDivElement> = (e) => {
    const input = e.target as HTMLInputElement;
    setSelection(input.value);
  }

  return <div>
    <div onChange={onSelectionChange}>
      <input type="radio" name="selection" id="search" value="search"/>
      <label htmlFor="select" >My hospital is already registered</label><br></br>
      <input type="radio" name="selection" id="register" value="register"/>
      <label htmlFor="register" >I need to register my hospital</label>
    </div>
    <div>
      <button onClick={goBack}>Back</button>
      <button onClick={goNext}>Next</button>
    </div>
  </div>
}