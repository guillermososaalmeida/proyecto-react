import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import {
  CheckCode,
  Dashboard,
  Detail,
  ForgotPassword,
  Welcome,
  Login,
  Profile,
  Register,
  Home,
} from "../pages/index.js";
import { Protected, ProtectedCheckChildren } from "../components/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/forgotpassword/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/verifyCode",
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: "/gameDetail",
        element: (
          <Protected>
            <Detail />
          </Protected>
        ),
      },
    ],
  },
]);
