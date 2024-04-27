import { ChangeEventHandler, ReactNode, useState } from "react";
import styles from './auth.module.css';
import CustomInput from "./CustomInput";
import useErrors from "../../utils/useErrors";
import { CustomInputs } from "./types/CustomForm";

type FormProps = {
  inputs: CustomInputs;
  data: Record<string, string>;
  onSuccess: (data: Record<string, string>) => unknown | Promise<unknown>;
  submitBtnText?: string,
  header?: ReactNode;
  footer?: ReactNode;
}

export default function CustomForm({inputs, data, onSuccess, submitBtnText, header, footer}: FormProps) {
  
  const errorsObj: Record<string, string> = {};
  Object.keys(data).forEach(key => errorsObj[key] = "");

  const {errors, updateError, clearError} = useErrors(errorsObj);
  const [formInfo, setFormInfo] = useState(data);

  const onInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setFormInfo({
      ...formInfo, 
      [e.target.name]: e.target.value
    })
  }
  
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let error = false;
    for (const i in inputs) {
      const {name, validator} = inputs[i];
      const errorMsg = validator(formInfo[name]);
      if (errorMsg) {
        updateError(name, errorMsg);
        error = true;
      } else {
        clearError(name)
      }
    }
    if (error) return;
    await onSuccess(formInfo);
  }

  return <form className={styles['form']} onSubmit={onSubmit}>
    {header}
    {inputs.map(input => {
      const {name, type, isSelect, options, label} = input;
      return (
        <CustomInput label={label ?? name} error={errors[name]} key={name}>
          { !isSelect ? 
              <input
                type={type ?? 'text'}
                name={name}
                value={formInfo[name]}
                onChange={onInputChange}
              />
              :
              <select name={name} value={formInfo[name]} onChange={onInputChange}>
                {options?.map(option => <option value={option} key={option}>{option[0].toUpperCase() + option.substring(1)}</option>)}
              </select>
          }
        </CustomInput>
      )
    })}
    <button type="submit" className={styles['submit-btn']}>
      {submitBtnText ?? 'Submit'}
    </button>
    {footer}
  </form>
}