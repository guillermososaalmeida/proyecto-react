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
} from "@chakra-ui/react";
import { Header, Sidebar } from "../../components";
import { useGetGamesFromSearchParams } from "../../hooks/useGetGames";

export const Home = () => {
  const gameData = useGetGamesFromSearchParams();

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
                    <Text p="5">
                      {game?.name} || {game?.genre}
                    </Text>
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
