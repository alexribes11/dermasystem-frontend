import Photo from "./Photo";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photos: Photo[];
  userRole: string;
  hospitalId: string
};

export default User;