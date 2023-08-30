import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- REGISTER -----------------------------------
export const registerUser = async (formData) => {
  return APIuser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------- LOGIN
export const login = async (formData) => {
  return APIuser.post("/users/login", formData)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! -------------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APIuser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------------- BPRRADP DEL USUARIO -------------------------

export const deleteUserService = async () => {
  return APIuser.delete("/users/")
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------------ CAMBIO CONTRASEÑA SIN TOKEN-------------

export const forgotPasswordUser = async (formData) => {
  return APIuser.patch("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};
