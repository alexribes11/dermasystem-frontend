import { useEffect, useState } from "react";
import { GetPatients } from "../utils/api/patients";
import User from "../types/User";

export default function usePatients() {
  
  const [patients, setPatients] = useState<User[]>([]);

  const fetchPatients = async () => {
    const patientsReceived = await GetPatients();
    setPatients(patientsReceived)
  }
  useEffect(() => {
    fetchPatients();
  }, []);

  return patients;
}