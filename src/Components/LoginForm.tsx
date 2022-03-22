import React from "react";

import { useState, useRef } from "react";

import "./LoginForm.css";

type TaskModel = {
  desc: string;
  id: number;
  status: string;
  title: string;
};

type UserModel = {
  avatar: string;
  bio: string;
  email: string;
  fb: string;
  id: string;
  insta: string;
  li: string;
  name: string;
  occupation: string;
  password: string;
  tasks: TaskModel[];
};

const LoginForm: React.FC<{
  onLogin: () => void;
  userData: (dbData: UserModel) => void;
}> = (props) => {
  const userEmailLogin = useRef<HTMLInputElement>(null);
  const userPassLogin = useRef<HTMLInputElement>(null);

  const userNameReg = useRef<HTMLInputElement>(null);
  const userEmailReg = useRef<HTMLInputElement>(null);
  const userPassReg = useRef<HTMLInputElement>(null);

  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Error message handler and display
  const errorHandler = function (error: string) {
    if (error === "INVALID_EMAIL") {
      setError("Incorect E-mail, please enter valid E-mail address");
    } else if (error === "MISSING_PASSWORD") {
      setError("Password field cant be empty, please provide password");
    } else if (error === "INVALID_PASSWORD") {
      setError("Incorect password, please enter valid login credentials");
    } else {
      setError(error);
    }

    setTimeout(() => setError(null), 5000);
  };

  // registering form toggler
  const authFormHandler = function () {
    setRegistering((prevState) => !prevState);
  };

  // function push user's profile data to database (called on a new user creation)
  const pushUser = function (
    userEmail: string,
    userName: string,
    enteredPassReg: string
  ) {
    fetch(
      "https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          avatar:
            "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
          name: userName,
          email: userEmail,
          password: enteredPassReg,
          occupation: "not set",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          fb: "link not provided",
          insta: "profile not provided",
          li: "profile not provided",
          // id: userEmail, ovde treba ubaciti name iz database koji se dobije tek nakon sto ova push user funkcija uspjesno fetchuje, najlakse ovde preskociti pa u load user staviti odvojenu funkciju da unese ovaj id u korisnika
          tasks: [
            {
              id: Math.random(),
              title: "Welcome",
              desc: "This is your first task",
              status: "active",
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("user added");
        return res.json().then((data) => {
          console.log(data.name);
          console.log(data);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
  };

  // function that load profile data from database to loaclly loaded user for user that just logged in
  const loadUser = function (currUserEmail: string) {
    fetch(
      "https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    ).then((res) => {
      if (res.ok) {
        console.log("users fetched");
        return res.json().then((data) => {
          for (const key in data) {
            if (data[key].email === currUserEmail) {
              props.userData(data[key]);
              console.log("User loaded");
            }
          }
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
  };

  // function that triggers on logging in, it perform user credentials auth and calls loadUser() function to load profile data for current user if login was successful
  const logingIn = function (event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const enteredEmailLogin: string = userEmailLogin.current!.value;
    const enteredPassLogin: string = userPassLogin.current!.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsObJ1tkr1E0pqYRAzEQTHdI7i_S5-agA",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmailLogin,
          password: enteredPassLogin,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res
          .json()
          .then((resJSON) => {
            //   !!!!!!!!!!!!!!!!!!!!!!!!
            loadUser(resJSON.email);
            props.onLogin();
          })
          .catch((err) => {
            console.log("Iz res.ok bloka " + err);
          });
      } else {
        res
          .json()
          .then((data) => data.error.message)
          .then((data) => {
            errorHandler(data);
            throw new Error(data);
          })
          .catch((err) => {
            console.log("Iz !res.ok bloka" + err);
          });
      }
    });
  };

  // signUp function that create new user account and calls pushUser() to create new user into database and populate it with profile data
  const signUp = function (event: React.FormEvent) {
    event.preventDefault();
    const enteredEmailReg = userEmailReg.current!.value;
    const enteredPassReg = userPassReg.current!.value;
    const enteredNameReg = userNameReg.current!.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsObJ1tkr1E0pqYRAzEQTHdI7i_S5-agA",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmailReg,
          password: enteredPassReg,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application-json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          pushUser(data.email, enteredNameReg, enteredPassReg);
        });
      } else {
        res
          .json()
          .then((data) => data.error.message)
          .then((data) => {
            errorHandler(data);
            throw new Error(data);
          })
          .catch((err) => {
            console.log("Iz !res.ok bloka" + err);
          });
      }
    });
  };

  return (
    <React.Fragment>
      {/* Logging in auth form */}
      {!registering && (
        <form className="login-form" onSubmit={logingIn}>
          {error && <p className="error-box">{error}</p>}
          <input
            id="email-login"
            placeholder="Enter E-mail"
            ref={userEmailLogin}
          ></input>
          <input
            id="pass-login"
            ref={userPassLogin}
            placeholder="Enter Password"
            type="password"
          ></input>

          <button className="button-login-main" type="submit">
            Log in
          </button>
          <button
            className="button-login-secondary"
            type="button"
            onClick={authFormHandler}
          >
            Register
          </button>
        </form>
      )}

      {/* Registering auth form */}
      {registering && (
        <form className="login-form" onSubmit={signUp}>
          {error && <p className="error-box">{error}</p>}
          <input
            id="name-reg"
            type="text"
            placeholder="Your Name"
            ref={userNameReg}
          ></input>

          <input
            id="email-reg"
            type="email"
            placeholder="Your E-mail"
            ref={userEmailReg}
          ></input>

          <input
            id="pass-reg"
            placeholder="Enter Password"
            type="password"
            ref={userPassReg}
          ></input>

          <button className="button-login-main" type="submit">
            Register
          </button>
          <button
            className="button-login-secondary"
            type="button"
            onClick={authFormHandler}
          >
            Log in
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
