import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Input } from "@chakra-ui/react";
import "./Header.css";

export const Header = () => {
  return (
    <>
      <Input
        w="xs"
        type="text"
        placeholder="Search game"
        pl="10"
        rounded="30"
        borderColor={"#90a4ae"}
        fontSize="15"
        fontFamily="sans-serif"
        letterSpacing="2px"
        fontWeight={"100"}
        _hover={{ border: "solid 1px black", color: "white" }}
      />
    </>
  );
};
