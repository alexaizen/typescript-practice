import "./ProfileForm.css";

import { useRef, useState } from "react";

function ProfileForm(props) {
  const avatarInput = useRef();
  const nameInput = useRef();
  const occupationInput = useRef();
  const socialFbInput = useRef();
  const socialInstaInput = useRef();
  const socialLiInput = useRef();

  const [ profileFormValidationMsg, setProfileFormValidationMsg ] = useState(null);

  const validationMessage = function(msg) {
      setProfileFormValidationMsg(msg)
      setTimeout(()=>setProfileFormValidationMsg(null), 5000)
  }

  // Regex to check is input is valid URL
  const validURL = function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }


  // Profile data update function. Update to database and to current user data
  const updateProfileData = function (avatarInputValue, nameInputValue, occupationInputValue, socialFbInputValue, socialInstaInputValue, socialLiInputValue){
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.data.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...props.data,
          avatar: avatarInputValue,
          name: nameInputValue,
          // email: userEmail,
          // password: "ggggggn",
          occupation: occupationInputValue,
          // bio: "not set",
          fb: socialFbInputValue,
          insta: socialInstaInputValue,
          li: socialLiInputValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("User data updated");
        return res.json().then((data) => {
          console.log(data.name);
          console.log(data);
          console.log("***********");
          // console.log(occupationInput.current.value);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
    props.dataUpdater(
      {
        avatar: avatarInputValue,
        name: nameInputValue,
        occupation: occupationInputValue,
        fb: socialFbInputValue,
        insta: socialInstaInputValue,
        li: socialLiInputValue,
      },
      props.data.id
    );
  }

  // Function that is called on submit form. It check for input validity and eventually submit and update data
  const profileDataLift = function (e) {
    e.preventDefault();

    const avatarInputValue = avatarInput.current.value;
    const nameInputValue = nameInput.current.value;
    const occupationInputValue = occupationInput.current.value;
    const socialFbInputValue = socialFbInput.current.value;
    const socialInstaInputValue = socialInstaInput.current.value;
    const socialLiInputValue = socialLiInput.current.value;

    

    if (!validURL(avatarInputValue)) {
      validationMessage("Profile picture must be URL")
      return
    }

    if (!validURL(socialFbInputValue)) {
      validationMessage("Facebook URL is not valid")
      return
    }
    if (!validURL(socialInstaInputValue)) {
      validationMessage("Instagram URL is not valid")
      return
    }

    if (!validURL(socialLiInputValue)) {
      validationMessage("LinkedIn URL is not valid")
      return
    }
    
     
    updateProfileData(avatarInputValue, nameInputValue, occupationInputValue, socialFbInputValue, socialInstaInputValue, socialLiInputValue)
    
    props.onSubmit();
  };

  return (
    <form className="prof-form" onSubmit={profileDataLift}>
      <span className="prof-form-field">
        <label htmlFor="avatar">Profile picture URL</label>
        <input
          id="avatar"
          ref={avatarInput}
          defaultValue={props.data.avatar}
        ></input>
      </span>

      <span className="prof-form-field">
        <label htmlFor="name">Full name</label>
        <input id="name" ref={nameInput} defaultValue={props.data.name}></input>
      </span>

      <span className="prof-form-field">
        <label htmlFor="occupation">Position</label>
        <input
          id="occupation"
          ref={occupationInput}
          defaultValue={props.data.occupation}
        ></input>
      </span>

      <span className="prof-form-field">
        <label htmlFor="social-fb">Facebook</label>
        <input
          id="social-fb"
          ref={socialFbInput}
          defaultValue={props.data.fb}
        ></input>
      </span>

      <span className="prof-form-field">
        <label htmlFor="social-insta">Instagram</label>
        <input
          id="social-insta"
          ref={socialInstaInput}
          defaultValue={props.data.insta}
        ></input>
      </span>

      <span className="prof-form-field">
        <label htmlFor="social-li">LinkedIn</label>
        <input
          id="social-li"
          ref={socialLiInput}
          defaultValue={props.data.li}
        ></input>
      </span>
      {profileFormValidationMsg && <p>{profileFormValidationMsg}</p>}

      <button className="prof-form-submit-btn" type="submit">
        Confirm
      </button>
    </form>
  );
}

export default ProfileForm;
