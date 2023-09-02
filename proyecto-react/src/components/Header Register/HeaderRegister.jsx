import { Button, HStack } from "@chakra-ui/react";

import "./HeaderRegister.css";
import { Link, useNavigate } from "react-router-dom";

export const HeaderRegister = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="HeaderLoginContainer">
        <HStack p="5">
          <HStack>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </HStack>
        </HStack>
      </div>
    </>
  );
};
