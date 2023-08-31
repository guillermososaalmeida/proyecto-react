import { useEffect, useState } from "react";
import { Header } from "../../components";
import { useAuth } from "../../context/authContext";
import { useAcquired } from "../../hooks/useAcquired";

import "./Dashboard.css";
import { Card, Text } from "@chakra-ui/react";

export const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const userDataResponse = await useAcquired(user._id);
      setUserData(userDataResponse);
      console.log(userDataResponse);
    };
    getData();
  }, []);

  return (
    <>
      <Header />

      {userData?.acquired?.map((game) => (
        <Card>
          <Text>
            {game?.gameId?.name} || {game?.gameId?.genre}
          </Text>
        </Card>
      ))}
    </>
  );
};
