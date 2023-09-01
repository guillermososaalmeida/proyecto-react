import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="SidebarContainer">
      <div className="Logo">
        <img src="https://res.cloudinary.com/drt000pht/image/upload/v1693565652/logo_bwjssr.png"></img>
      </div>
      <div className="SidebarLinks">
        <NavLink className="SidebarItem" to="/Home">
          Home
        </NavLink>
        <NavLink className="SidebarItem" to="/profile">
          Profile
        </NavLink>
        <NavLink className="SidebarItem" to="/">
          Library
        </NavLink>
        <NavLink className="SidebarItem" to="/">
          Platforms
        </NavLink>
      </div>
    </div>
  );
};
