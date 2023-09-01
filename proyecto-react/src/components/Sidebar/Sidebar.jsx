import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="SidebarContainer">
      <div className="Logo">
        <img src="https://i.imgur.com/tgd6cyW.png"></img>
      </div>
      <div className="SidebarLinks">
        <NavLink className="SidebarItem" to="/Home">
          Home
        </NavLink>
        <NavLink className="SidebarItem" to="/profile">
          Profile
        </NavLink>
        <NavLink className="SidebarItem" to="/dashboard">
          Library
        </NavLink>
        <NavLink className="SidebarItem" to="/">
          Platforms
        </NavLink>
      </div>
    </div>
  );
};
