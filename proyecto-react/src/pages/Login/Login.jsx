import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Flex,
  FormHelperText,
  Heading,
  Box,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { login } from "../../services/user.service";
import "./Login.css";
import { Link } from "react-router-dom";
import { useLoginError } from "../../hooks/useLoginError";
import { useAuth } from "../../context/authContext";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [loginOk, setLoginOk] = useState(false);
  const { userLogin, setUser } = useAuth();

  const { handleSubmit, register } = useForm();

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setLoggedUser(await login(formData));
    //llama al servicio de login con los datos del formulario para logarlo y darle token
    setIsLoading(false);
  };

  useEffect(() => {
    //! revisar nombres de estados
    useLoginError(loggedUser, setLoggedUser, userLogin, setLoginOk);
  }, [loggedUser]);

  useEffect(() => {
    setUser(() => null);
    localStorage.removeItem("user");
  }, []);

  //!GESTIONAR EL REDIRECT SI SE LOGEA O NO

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p="8"
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          color={"#c3ef3cff"}
        >
          <Box textAlign="center">
            <Heading as="h1" size="4xl">
              Login
            </Heading>
          </Box>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl isRequired mt={10}>
              <label>
                <FormLabel>Email</FormLabel>
                <Input
                  id="emailInputLogin"
                  size="lg"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    minLength: 2,
                  })}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </label>
              <label>
                <FormLabel>Password</FormLabel>
                <Input
                  id="passwordInputLogin"
                  type="password"
                  placeholder="Password"
                  {...register("password", {})}
                  size="lg"
                />
              </label>
              <Button
                colorScheme="pink"
                variant="outline"
                type="submit"
                minW="2xs"
                mt={4}
                size="lg"
              >
                Login
              </Button>
            </FormControl>

            <Text>
              Forgot password?
              <Link to="/forgotpassword">Reset password</Link>
            </Text>
          </form>
        </Box>

        <p>
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </Flex>
    </>
  );
};
