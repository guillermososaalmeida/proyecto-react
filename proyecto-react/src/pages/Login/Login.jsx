import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../service/API_user/user.service";
import { Heading, Box } from "@chakra-ui/react";
import { FormControl, FormLabel, Flex, FormHelperText } from "@chakra-ui/react";
import { Input, Button, Center } from "@chakra-ui/react";
import "./Login.css";
export const Login = () => {
  const { handleSubmit, register } = useForm();

  //componetizar por una parte el welcome y por otra el login, y este componente que se encargue de saber si está logado o no
  return false ? (
    //!false por testear el login pero hay que cambiarlo
    <div>
      <Heading>Welcome, {username}!</Heading>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
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
          <form onSubmit={handleSubmit(login)}>
            <FormControl isRequired mt={10}>
              <label>
                <FormLabel>Email</FormLabel>
                <Input
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
                  type="password"
                  placeholder="Password"
                  {...register("password", {})}
                  size="lg"
                />
              </label>
            </FormControl>
          </form>
        </Box>
      </Flex>
      <Center>
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
      </Center>
    </>
  );
};
