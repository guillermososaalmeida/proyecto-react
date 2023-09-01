import { getGameByName } from "../services/game.service";

export const useGetByName = async (name) => {
  const gameByName = await getGameByName(name ?? "");
  return gameByName;
};
