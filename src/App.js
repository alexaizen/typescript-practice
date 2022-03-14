import { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "./UI/Layout";
import Dashboard from "./Pages/Dashboard";
import LeftSidebar from "./LeftSidebar";
import { Route, Switch } from "react-router-dom";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Tasks from "./Pages/Tasks";
import Welcome from "./Pages/Welcome";

function App() {
  const isLogedIn = useSelector((state) => state.login.isLogedIn);
  const [isLoaded, setIsloaded] = useState(false);

  // Identifies currently logged user by email
  const [currentUserEmail, setCurrentUserEmail] = useState({
    email: "no email",
  });
  // Set currently logged user by email
  const currentUserDataHandler = function (dbData, id) {
    setCurrentUserEmail((prevState) => {
      return { ...prevState, ...dbData, id: id, test: "test" };
    });
    console.log(currentUserEmail);
    setIsloaded(true);
  };

  const currentUserDataUpdater = function (user) {
    setCurrentUserEmail(user);
  };

  return (
    <Layout>
      <LeftSidebar user={currentUserEmail} userData={currentUserDataHandler} />
      <Switch>
        {isLogedIn && isLoaded && (
          <Route path="/dashboard" exact>
            <Dashboard user={currentUserEmail} />
          </Route>
        )}

        {isLogedIn && isLoaded && (
          <Route path="/tasks" exact>
            <Tasks
              user={currentUserEmail}
              dataUpdater={currentUserDataHandler}
              userUpdater={currentUserDataUpdater}
            />
          </Route>
        )}
        {isLogedIn && isLoaded && (
          <Route path="/profile" exact>
            <Profile
              user={currentUserEmail}
              dataUpdater={currentUserDataHandler}
            />
          </Route>
        )}
        {isLogedIn && isLoaded && (
          <Route path="/settings" exact>
            <Settings user={currentUserEmail} />
          </Route>
        )}
        <Route path="*">
          <Welcome />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
