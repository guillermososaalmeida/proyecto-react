import { useAuth } from "../context/authContext";

//! GET ACQUIRED

export const getAcquired = async () => {
  const { user } = useAuth();
  const acquired = user.acquired;
  console.log(acquired);
};
