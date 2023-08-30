import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import "./CheckCode.css";
import { Navigate } from "react-router-dom";
import { useCheckCode } from "../../hooks/useCheckCode";

const redirectionTarget = (redirection) => {
  switch (redirection) {
    case "deletedUser":
      return "/register";
    case "userNotFound":
      return "/login";
    case "correctCode":
      return "/dashboard";
    default:
      break;
  }
};

export const CheckCode = () => {
  const { register, handleSubmit } = useForm();
  const { isLoading, formSubmit, redirection } = useCheckCode();
  const handleReSend = () => {};

  return redirection ? (
    <Navigate to={redirectionTarget(redirection)} />
  ) : (
    <>
      <Heading>Verify your code 👌</Heading>

      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl>
          <FormLabel>Registration code</FormLabel>
          <Input
            type="text"
            {...register("confirmationCode", { required: false })}
          />
          <FormHelperText>Write the code sent to your email</FormHelperText>

          <HStack m="2">
            <Button type="submit" isLoading={isLoading}>
              Verify Code
            </Button>
            <Button onClick={() => handleReSend()} isLoading={isLoading}>
              Resend Code
            </Button>
          </HStack>
          <FormHelperText>
            If the code is not correct ❌, your user will be deleted from the
            database and you will need to register again.
          </FormHelperText>
        </FormControl>
      </form>
    </>
  );
};
