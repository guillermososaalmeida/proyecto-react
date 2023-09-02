import { Button, HStack } from "@chakra-ui/react";

import "./HeaderLogin.css";
import { Link } from "react-router-dom";

export const HeaderLogin = () => {
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
