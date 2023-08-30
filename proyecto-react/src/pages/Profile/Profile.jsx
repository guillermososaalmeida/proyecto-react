import { useState } from "react";
import { useAuth } from "../../context/authContext";
import "./Profile.css";

export const Profile = () => {
  const [toggleRender, setToggleRender] = useState(false);
  const { setUser } = useAuth();
  return (
    <ul>
      <li>cambiar contraseña</li>
      <li>modificar usuario</li>
      <li>borrar usuario, doble verificación</li>
    </ul>
  );
};
