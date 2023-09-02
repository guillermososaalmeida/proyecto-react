import "./Welcome.css";
import { Link, HStack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="welcomeBody">
        <div className="HeaderWelcomeContainer">
          <button className="btn">Register</button>
        </div>
      </div>
    </>
  );
};
