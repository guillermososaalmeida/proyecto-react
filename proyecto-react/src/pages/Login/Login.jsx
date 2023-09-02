import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services/user.service";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { useLoginError } from "../../hooks/useLoginError";
import { useAuth } from "../../context/authContext";
import { HeaderLogin } from "../../components";

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

  if (loginOk) {
    if (loggedUser?.data?.user.check == false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <>
      <div className="LoginBody">
        <HeaderLogin />
        <div className="form-wrap">
          <h1>Login</h1>

          <form onSubmit={handleSubmit(formSubmit)}>
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
                {...register("email", {})}
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
                {...register("password", {})}
              />
            </div>
            <div className="btn_container">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </form>
          <p>
            Forgot password?
            <Link to="/forgotpassword/forgotpassword">Reset password</Link>
          </p>
        </div>
      </div>
    </>
  );
};
