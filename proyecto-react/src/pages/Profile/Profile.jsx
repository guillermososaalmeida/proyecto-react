import { useState } from "react";
import "./Profile.css";
import { ChangePassword, FormProfile, Header, Sidebar } from "../../components";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center,
} from "@chakra-ui/react";
import { useDeleteUser } from "../../hooks";
import { useAuth } from "../../context/authContext";

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { setUser } = useAuth();

  //? -------- Cambio de contraseña con token

  //?--------- Cambio de datos del usuario

  //?--------- Borrado del usuario

  return (
    <>
      <div className="profileBody">
        <Sidebar />
        <div className="profilePageContainer">
          <Header />
          <div className="profileContainer">
            <Tabs isFitted variant="enclosed" size="lg" w="80vw">
              <TabList mb="1em">
                <Tab flexDir="column">
                  <img
                    src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125399/pngwing.com_npd5sa.png"
                    alt="go to ChangePassword"
                    className="iconNav"
                  />
                  <p>Edit Profile</p>
                </Tab>
                <Tab flexDir="column">
                  <img
                    src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
                    alt="go to change data profile"
                    className="iconNav iconChangeProfile"
                  />
                  <p>Change Password</p>
                </Tab>
                <Tab flexDir="column">
                  <img
                    src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686140226/eliminar_user_rmwoeg.png"
                    alt="user delete button"
                    className="iconNav iconDeleteUser"
                    // custom hook que hace la peticion al servicio de delete User y setea el usuario a null en el contexto
                    onClick={() => useDeleteUser(setUser)}
                  />
                  <Text color="red">Delete User</Text>
                </Tab>
              </TabList>
              <TabPanels mt="-5">
                <TabPanel>
                  <Center>
                    <FormProfile />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <ChangePassword />
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
