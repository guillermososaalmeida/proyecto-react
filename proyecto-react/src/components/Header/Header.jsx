import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Input, Stack } from "@chakra-ui/react";
import "./Header.css";

export const Header = () => {
  return (
    <>
      <Stack>
        <Input type="text" placeholder="Search game"></Input>
      </Stack>
    </>
  );
};
