import "./Welcome.css";
import { Heading } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const Welcome = () => {
  return (
    <>
      <Center>
        <Heading>Welcome to my page!! 🪄🪄</Heading>
      </Center>

      <Center>
        <Text fontSize="6xl">
          Let's go to
          <Link color="blue" href="/register">
            REGISTER
          </Link>
        </Text>
      </Center>
    </>
  );
};
