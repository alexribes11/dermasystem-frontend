import User from "../types/User";

type UserContext = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export default UserContext;