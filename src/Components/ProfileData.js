import React from "react";
import "./ProfileData.css";

function ProfileData(props) {
  return (
    <React.Fragment>
      <div className="prof-header">
        <span>
          <h3>Name: {props.data.name}</h3>
          <p>Occupation: {props.data.occupation}</p>
        </span>
        <img src={props.data.avatar} height="100px" alt="avatar img" />
      </div>
      <span className="prof-bio">
        <h4>Bio</h4>
        <p>{props.data.bio + " " + props.data.id}</p>
      </span>

      <ul className="prof-social">
        <li>
          <a href={props.data.fb}>
            <img
              src="/Assets/facebook-ico.png"
              alt="Facebook profile"
              width="46px"
            />
          </a>
        </li>
        <li>
          <a href={props.data.insta}>
            <img
              src="/Assets/instagram-ico.png"
              alt="Instagram profile"
              width="46px"
            />
          </a>
        </li>
        <li>
          <a href={props.data.li}>
            <img
              src="/Assets/linked-in-ico.png"
              alt="Linked In profile"
              width="46px"
            />
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default ProfileData;
