import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer, Header } from "./components";
import { AuthContextProvider } from "./context/authContext";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <AuthContextProvider>
          <div className="Sidebar">
            <Sidebar />
          </div>
          <div className="Container">
            {" "}
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
