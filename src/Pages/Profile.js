import React from "react";
import { useState } from "react";

import "./profile.css";

import MainAreaLarge from "../UI/MainAreaLarge";
import NavBar from "../NavBar";
import ProfileData from "../Components/ProfileData";
import ProfileForm from "../Components/ProfileForm";

function Profile(props) {
  const [editProfileToggler, setEditProfileToggler] = useState(false);
 

  const editToggleHandler = function () {
    setEditProfileToggler((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <NavBar user={props.user}>
        <h2>Profile</h2>
      </NavBar>

      <MainAreaLarge>
        {!editProfileToggler && (
          <ProfileData data={props.user} user={props.user} />
        )}
        {editProfileToggler && (
          <ProfileForm
            data={props.user}
            onSubmit={editToggleHandler}
            dataUpdater={props.dataUpdater}
          />
        )}
        {!editProfileToggler && (
          <button className="prof-edit-btn" onClick={editToggleHandler}>
            {!editProfileToggler ? "EDIT" : "SAVE"}
          </button>
        )}
      </MainAreaLarge>
    </React.Fragment>
  );
}

export default Profile;
