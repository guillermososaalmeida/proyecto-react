import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer, Header } from "./components";
import { AuthContextProvider } from "./context/authContext";
import "./App.css";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <AuthContextProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
