import { getUserById } from "../services/user.service";

//! GET ACQUIRED

export const useAcquired = async (id) => {
  const userById = await getUserById(id);
  return userById;
};
