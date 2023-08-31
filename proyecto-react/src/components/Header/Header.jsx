import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/authContext";
import "./Header.css";
import { Link } from "react-router-dom";

const handleEnter = (e) => {
  if (e.key === "Enter") {
    console.log("enter");
  }
};

export const Header = () => {
  const { user } = useAuth();
  return (
    <>
      <HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none" pl="10" pt="10">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            w="xs"
            type="text"
            placeholder="Search game"
            pl="10"
            m="5"
            variant="filled"
            rounded="30"
            borderColor={"#90a4ae"}
            fontSize="15"
            fontFamily="sans-serif"
            letterSpacing="2px"
            fontWeight={"100"}
            _hover={{ border: "solid 2px black" }}
            onKeyDown={handleEnter}
          />
        </InputGroup>
        <Button>Wish List</Button>
        <Button>My platforms</Button>

        <Link to="/profile">
          <Avatar src={user.image} />
        </Link>
      </HStack>
    </>
  );
};
