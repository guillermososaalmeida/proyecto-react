import { getAllGames } from "../services/game.service";

export const useAllGames = async () => {
  const allGames = await getAllGames();
  return allGames;
};
