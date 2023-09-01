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
import { Link, useNavigate } from "react-router-dom";
import { useGetByName } from "../../hooks/useGetByName";
import { useEffect, useState } from "react";

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value;
      name ? navigate(`/home?name=${name}`) : navigate("/home");
    }
  };

  return (
    <>
      <HStack p="5">
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
        <HStack>
          <Button>Wish List</Button>
          <Button>My platforms</Button>
          <Link to="/profile">
            <Avatar src={user.image} />
          </Link>
        </HStack>
      </HStack>
    </>
  );
};
