import Swal from "sweetalert2";

export const useCheckCodeError = ({
  confirmationCodeResponse,
  setRedirection,
  userlogin,
}) => {
  // ---------------------> 500
  if (confirmationCodeResponse?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // ------------------------- 200 test todo correcto

  if (confirmationCodeResponse?.data?.testCheckOk?.toString() == "true") {
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseUser = JSON.parse(currentUser);
      const customUser = {
        ...parseUser,
        check: true,
      };

      const stringUser = JSON.stringify(customUser);
      // llamamos a la funcion de login para resetear que el check esta a true
      userlogin(stringUser);
    }
    setRedirection(() => "correctCode");
    Swal.fire({
      icon: "success",
      title: "Ok correct code ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // -------------- 200 test = false

  if (confirmationCodeResponse?.data?.testCheckOk?.toString() == "false") {
    // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
    Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "No deleted user. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // -------------- 200: delete: 'ok delete user'
  if (confirmationCodeResponse?.data?.delete?.includes("ok delete user")) {
    // esto le enviamos al register porque le henmos borrrado el usuario
    setRedirection(() => "deletedUser");
    Swal.fire({
      icon: "error",
      title: "No correct Code ❎.",
      text: "Your user is deleted. Register again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- 200: delete: 'error delete user'
  if (confirmationCodeResponse?.data?.delete?.includes("error delete user")) {
    Swal.fire({
      icon: "error",
      title: "No correct Code ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- userNoFound ---> 404

  if (confirmationCodeResponse?.response?.status == 404) {
    setRedirection(() => "userNotFound");
    Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
