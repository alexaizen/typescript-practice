import { useSelector, useDispatch } from "react-redux";

import LoginForm from "./Components/LoginForm";
import { NavLink, useHistory } from "react-router-dom";
import "./LeftSidebar.css";
import { loginActions } from "./store";

function LeftSidebar(props) {
  const dispatch = useDispatch();
  const isLogedIn = useSelector((state) => state.login.isLogedIn);
  const history = useHistory();

  const loginStatusHandler = function (e) {
    // e.preventDefault();
    dispatch(loginActions.loginToggle());
    history.push(isLogedIn ? "/welcome" : "/dashboard");
  };

  return (
    <nav className="left-sidebar">
      <div className="profile-area">
        <img
          src="/Assets/network.png"
          alt="avatar"
          width="60px"
          height="60px"
        />
        <h4>Connectify</h4>
      </div>
      {!isLogedIn && (
        <LoginForm
          onLogin={loginStatusHandler}
          userData={props.userData}
          user={props.user}
        />
      )}

      {isLogedIn && (
        <ul className="nav-menu">
          <NavLink activeClassName="nav-active" to="/dashboard">
            <li>
              <img
                src="/Assets/chart-network.png"
                alt="Dashboard"
                width="24px"
              ></img>
              Dashboard
            </li>
          </NavLink>

          <NavLink activeClassName="nav-active" to="/tasks">
            <li>
              <img src="/Assets/list-check.png" alt="Tasks" width="24px" />
              Tasks
            </li>
          </NavLink>

          <NavLink activeClassName="nav-active" to="/profile">
            <li>
              <img src="/Assets/user.png" alt="Profile" width="24px" />
              Profile
            </li>
          </NavLink>

          <NavLink activeClassName="nav-active" to="/settings">
            <li>
              <img src="/Assets/settings.png" alt="Settings" width="24px" />
              Settings
            </li>
          </NavLink>
        </ul>
      )}
      {isLogedIn && (
        <button
          className="button-log-out"
          type="button"
          onClick={loginStatusHandler}
        >
          Log out
        </button>
      )}
    </nav>
  );
}

export default LeftSidebar;
