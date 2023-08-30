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
          <div className="Container">
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
