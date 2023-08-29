import React, { useState } from "react";
import { useCheckCodeError } from "./useCheckCodeError";
import { checkCodeConfirmationUser } from "../services/user.service";
import { useAutoLogin } from "./useAutoLogin";
import { useAuth } from "../context/authContext";

export const useCheckCode = () => {
  const { allUser, userLogin } = useAuth();
  const [redirection, setRedirection] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = async ({ confirmationCode }) => {
    setIsLoading(true);

    const userLocal = localStorage.getItem("user");
    const customFormData = {
      confirmationCode: parseInt(confirmationCode),
      email:
        userLocal === null
          ? allUser.data.user.email
          : JSON.parse(userLocal).email,
    };

    checkCodeConfirmationUser(customFormData).then(
      (confirmationCodeResponse) => {
        console.log("confirmationCodeResponse", confirmationCodeResponse);
        const redirection = useCheckCodeError({
          confirmationCodeResponse,
          userLogin,
        });
        setRedirection(redirection);

        if (redirection === "correctCode" && !localStorage.getItem("user")) {
          useAutoLogin(allUser, userLogin);
        }

        setIsLoading(false);
      }
    );
  };

  return {
    isLoading,
    formSubmit,
    redirection,
  };
};
