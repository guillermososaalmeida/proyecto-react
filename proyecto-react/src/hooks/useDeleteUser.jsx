import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUserService } from "../services/user.service";

export const useDeleteUser = (setUser) => {
  Swal.fire({
    title: "Are you sure you want to delete your profile?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {});
};
