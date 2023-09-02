import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Avatar,
} from "@chakra-ui/react";

import "./HeaderLogin.css";
import { Link, useNavigate } from "react-router-dom";

export const HeaderLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="HeaderLoginContainer">
        <HStack p="5">
          <HStack>
            <Link to="/register">
              <Button>Regístrate</Button>
            </Link>
          </HStack>
        </HStack>
      </div>
    </>
  );
};
