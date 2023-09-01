import { useCallback, useEffect, useState } from "react";
import { useAllGames } from "./useAllGames";
import { useGetByName } from "./useGetByName";
import { useSearchParams } from "react-router-dom";

export const useGetGamesFromSearchParams = () => {
  const [gameData, setGameData] = useState();

  const [searchParams] = useSearchParams();

  const getAll = useCallback(async () => {
    const gameDataResponse = await useAllGames();
    setGameData(gameDataResponse);
  }, [setGameData]);

  const getByName = useCallback(
    async (name) => {
      const gameDataResponse = await useGetByName(name);
      setGameData(gameDataResponse);
    },
    [setGameData]
  );

  useEffect(() => {
    const name = searchParams.get("name");

    name ? getByName(name) : getAll();
  }, [searchParams]);
  return gameData;
};
