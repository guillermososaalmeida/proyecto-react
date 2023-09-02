import { getGameById } from "../services/game.service";

export const useGetById = async (id) => {
  const gameById = await getGameById(id ?? "");
  return gameById;
};
