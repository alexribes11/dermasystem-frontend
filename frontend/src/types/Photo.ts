type Photo = {
  id: string;
  dateDeleted: string;
  datePermanentDelete: string | null;
  dateUploaded: string;
  patientName: string,
  uploadedBy: {
    id: string,
    name: string,
    role: string
  };
  deletedBy: {
    id: string,
    name: string,
    role: string
  } | null;
  diagnosis: string
  patientId: string,
  imgUrl: string;
}
export default Photo;