import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { router } from "./routes/routes.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
