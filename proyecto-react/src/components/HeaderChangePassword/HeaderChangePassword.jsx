import { Button, HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./HeaderChangePassword.css";
export const HeaderChangePassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="HeaderChangePasswordContainer">
        <HStack p="5">
          <HStack>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </HStack>
        </HStack>
      </div>
    </>
  );
};
