import { useState } from "react";

export default function useErrors(userErrors: Record<string, string>) {

  const [errors, setErrors] = useState<Record<string, string>>(userErrors);

  const updateError = (key: string, value: string) => {
    setErrors(prev => {return {...prev, [key]: value}});
  }

  const clearError = (key: string) => {
    setErrors(prev => {return {...prev, [key]: ""}});
  }

  return {
    errors,
    updateError,
    clearError
  }
}