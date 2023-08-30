import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import "./Header.css";

export const Header = () => {
  return (
    <>
      <Stack>
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
            _hover={{ border: "solid 1px black", color: "white" }}
          />
        </InputGroup>
      </Stack>
    </>
  );
};
