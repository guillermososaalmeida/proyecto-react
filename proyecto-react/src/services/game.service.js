import { APIuser } from "./serviceApiUser.config";
export const getAllGames = async () => {
  return APIuser.get("/games/")
    .then((res) => res.data.data)
    .catch((error) => error);
};

export const getGameByName = async (name) => {
  return APIuser.get(`/games/getByName/name?name=${name}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};

export const getGameById = async (id) => {
  return APIuser.get(`/games/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};
