import Swal from "sweetalert2";

export const useAddAcquiredGameError = (isAcquired) => {
  if (isAcquired) {
    Swal.fire({
      icon: "success",
      title: "Game acquired",
      text: "You can check it on your library!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (isAcquired === false) {
    Swal.fire({
      icon: "error",
      title: "Game removed",
      text: "You can acquire it again!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
