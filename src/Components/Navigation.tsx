import { NavLink } from "react-router-dom";

import "./Navigation.css";

const Navigation = () => {
  return (
    <ul className="nav-menu">
      <NavLink activeClassName="nav-active" to="/dashboard">
        <li>Dashboard</li>
      </NavLink>

      <NavLink activeClassName="nav-active" to="/tasks">
        <li>Tasks</li>
      </NavLink>

      <NavLink activeClassName="nav-active" to="/profile">
        <li>Profile</li>
      </NavLink>

      <li>Settings</li>
    </ul>
  );
};

export default Navigation;
