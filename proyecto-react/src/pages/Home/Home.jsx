import React, { useState } from "react";
import {
  Stack,
  Flex,
  Heading,
  Card,
  Center,
  Text,
  Image,
  HStack,
  ScaleFade,
} from "@chakra-ui/react";
import { Header, Sidebar } from "../../components";
import { useGetGamesFromSearchParams } from "../../hooks/useGetGames";
import { Link } from "react-router-dom";

export const Home = () => {
  const gameData = useGetGamesFromSearchParams();

  const handleClickToDetail = () => {};

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex w="80vw" direction="column">
          <Header />
          <Flex direction="column">
            <Stack>
              <Heading p="5" color="black">
                Home
              </Heading>
              <Heading ml="5" size="4xs" color="black" fontSize="20">
                All games here!!
              </Heading>
            </Stack>
            <HStack flexWrap="wrap" gap="10" p="5">
              {gameData?.map((game) => (
                <Card key={game._id} borderRadius="15">
                  <Center flexDir="column">
                    <Image
                      w="3xs"
                      h="2xs"
                      objectFit="cover"
                      src={game.image}
                      alt={game.name}
                      borderRadius="15"
                    />
                    <Link to={`/home/detail/${game._id}`}>
                      {game?.name} || {game?.genre}
                    </Link>
                    <Text p="5"></Text>
                  </Center>
                </Card>
              ))}
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
