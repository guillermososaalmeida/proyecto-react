import { useForm } from "react-hook-form";
import "./Register.css";

import { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../../components";
import { useRegisterError } from "../../hooks/useRegisterError";
import { useAuth } from "../../context/authContext";
import { registerUser } from "../../services/user.service";
import { FormControl } from "@chakra-ui/react";

export const Register = () => {
  const { setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  //! ------------------------------------------------------------------------------
  //? 1) funcion que se encarga del formulario - de la data del formulario
  //! ------------------------------------------------------------------------------

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length !== 0) {
      // cuando me han hayan puesto una imagen por el input

      const custonFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerUser(custonFormData));
      setSend(false);

      //! me llamo al servicio
    } else {
      const custonFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await registerUser(custonFormData));
      setSend(false);

      ///! me llamo al servicio
    }
  };

  //! ------------------------------------------------------------------------------
  //? 2) funcion que se encarga del formulario- de la data del formulario
  //! ------------------------------------------------------------------------------
  useEffect(() => {
    console.log(res);
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status == 200) bridgeData("ALLUSER");
  }, [res]);

  //! ------------------------------------------------------------------------------
  //? 3) Estados de navegacion ----> lo veremos en siguiente proyectos
  //! ------------------------------------------------------------------------------

  if (okRegister) {
    // no se puede utilizar el useNavigate porque es un hook y esto es un if y son incompatibles
    // por lo caul utilizamos un compnente que nos lo react-hook-form
    return <Navigate to="/verifyCode" />;
  }
  return (
    <>
      <div className="RegisterBody">
        <div className="form-wrap">
          {" "}
          <h1>Sign Up</h1>
          <p>It’s free and only takes a minute.</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <p>username</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("name", { required: true })}
              />
            </div>
            <div className="password_container form-group">
              <p>password</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />
            </div>

            <div className="email_container form-group">
              <p>email</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>
              <input
                className="input_user"
                type="email"
                id="email"
                name="email"
                autoComplete="false"
                {...register("email", { required: true })}
              />
            </div>
            <div className="year_container form-group">
              <p>year</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>
              <input
                type="number"
                id="year"
                name="year"
                {...register("year", { required: true })}
              ></input>

              <Uploadfile />
            </div>

            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#2f7a67" }}
              >
                Register
              </button>
            </div>
            <p className="bottom-text">
              <small>
                By clicking the Sign Up button, you agree to our{" "}
                <Link className="anchorCustom">Terms & Conditions</Link> and{" "}
                <Link className="anchorCustom">Privacy Policy</Link>.
              </small>
            </p>
          </form>
        </div>
        <div className="footerForm">
          <p className="parrafoLogin">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </>
  );
};
