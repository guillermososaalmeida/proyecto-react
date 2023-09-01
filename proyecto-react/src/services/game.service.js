import { APIuser } from "./serviceApiUser.config";
export const getAllGames = async () => {
  return APIuser.get("/games/")
    .then((res) => res.data.data)
    .catch((error) => error);
};
