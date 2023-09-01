import React, { useEffect, useState } from "react";
import {
  Stack,
  Flex,
  Heading,
  Container,
  Card,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";
import { Header, Sidebar } from "../../components";
import { useAllGames } from "../../hooks/useAllGames";

export const Home = () => {
  const [gameData, setGameData] = useState();

  useEffect(() => {
    const getData = async () => {
      const gameDataResponse = await useAllGames();
      setGameData(gameDataResponse);
      console.log("gameDataResponse", gameDataResponse);
    };
    getData();
  }, []);

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex w="80vw" direction="column">
          <Header />
          <Flex direction="column">
            <Stack>
              <Heading p="5">Home</Heading>
              <Heading ml="5" size="4xs">
                All games here!!
              </Heading>
            </Stack>
            <Container>
              {gameData?.map((game) => (
                <Card key={game} borderRadius="15">
                  <Center flexDir="column">
                    <Image
                      w="3xs"
                      h="2xs"
                      objectFit="cover"
                      src={game.image}
                      alt={game.name}
                      borderRadius="15"
                    />
                    <Text p="5">
                      {game?.name} || {game?.genre}
                    </Text>
                  </Center>
                </Card>
              ))}
            </Container>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
