import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer, Sidebar } from "./components";
import { AuthContextProvider } from "./context/authContext";
import "./App.css";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <AuthContextProvider>
          <div className="Sidebar">
            <Sidebar />
          </div>
          <main>
            <Outlet />
          </main>
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
