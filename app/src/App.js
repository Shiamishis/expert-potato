import React, { useState } from "react";
import "./App.css";
import potato from "./images/potato.svg";
function Router(props) {
  const sign = props.sign;
  if (sign) {
    return <Main />;
  } else {
    return <Sign setSign={props.setSign} />;
  }
}

function Sign(props) {
  const setSign = props.setSign;
  const [usernamePlaceholder, setUsernamePlaceholder] = useState(
    "Enter your username"
  );
  const [passwordPlaceholder, setPasswordPlaceholder] = useState(
    "Enter your password"
  );
  const [signText, setSignText] = useState("Sign in");
  const [signQuestion, setSignQuestion] = useState("Already have an account?");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [backColor, setBackColor] = useState("lightpink");
  const [boxColor, setBoxColor] = useState("rgb(93, 0, 255)");
  const [boxShadow, setBoxShadow] = useState("purple");
  const [labelColor, setLabelColor] = useState("magenta");
  function handleUsernameInputClick() {
    if (usernamePlaceholder === "Enter your username") {
      setUsernamePlaceholder("");
    }
  }

  function handlePasswordInputClick() {
    if (passwordPlaceholder === "Enter your password") {
      setPasswordPlaceholder("");
    }
  }
  function restoreUsernamePlaceholder() {
    if (usernamePlaceholder === "") {
      setUsernamePlaceholder("Enter your username");
    }
  }
  function restorePasswordPlaceholder() {
    if (passwordPlaceholder === "") {
      setPasswordPlaceholder("Enter your password");
    }
  }

  function signToggle() {
    if (signText === "Sign in") {
      setSignText("Sign up");
      setSignQuestion("Don't have an account?");
      setBackColor("lightblue");
      setBoxColor("rgb(0, 93, 255)");
      setBoxShadow("#020079");
      setLabelColor("lightblue");
    } else {
      setSignText("Sign in");
      setSignQuestion("Already have an account?");
      setBackColor("lightpink");
      setBoxColor("rgb(93, 0, 255)");
      setBoxShadow("purple");
      setLabelColor("magenta");
    }
    setRotationAngle((prevAngle) => (prevAngle + 180) % 360);
  }
  function enter() {
    setSign(true);
  }

  return (
    <div
      style={{
        backgroundColor: backColor,
        transition: "background-color 0.5s linear",
      }}
    >
      <div className="login-container">
        <div
          className="login-box"
          style={{
            backgroundColor: boxColor,
            boxShadow: `10px 10px 7px ${boxShadow}`,
            transition: "background-color 0.5s linear",
          }}
        >
          <div className="input-container">
            <div className="form-group" style={{ color: labelColor }}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={usernamePlaceholder}
                required
                onClick={handleUsernameInputClick}
                onBlur={restoreUsernamePlaceholder}
                style={{
                  backgroundColor: backColor,
                }}
              />
            </div>
            <div className="form-group" style={{ color: labelColor }}>
              <label htmlFor="password">Password:</label>
              <input
                type="password" // Fixed type to "password"
                id="password" // Fixed id to "password"
                name="password" // Fixed name to "password"
                placeholder={passwordPlaceholder}
                required
                onClick={handlePasswordInputClick}
                onBlur={restorePasswordPlaceholder}
                style={{
                  backgroundColor: backColor,
                }}
              />
            </div>
            <button
              className="enterButton"
              style={{
                marginTop: "4%",
                width: "30%",
                height: "30px",
                border: "none",
                backgroundColor: labelColor,
                color: "black",
                borderRadius: "15px",
              }}
              onClick={enter}
            >
              {signText}
            </button>
            <img
              className="potato"
              src={potato}
              alt={"Logo"}
              style={{
                height: "180px",
                marginTop: "5%",
                transform: `rotate(${rotationAngle}deg)`,
              }}
            />
          </div>
          <div className="Sign-in">
            <h3 style={{ marginLeft: "20px", color: backColor }}>
              {signQuestion}
              <button
                className="signButton"
                style={{ background: "none", border: "none" }}
                onClick={signToggle}
              >
                <h3 style={{ color: backColor }}>
                  <u>{signText}</u>
                </h3>
              </button>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideBar() {
  return <div>This is the side bar</div>;
}

function SelectedGroup() {
  return <h1>This is the selected group</h1>;
}

function Main() {
  return (
    <div>
      <SideBar />
      <SelectedGroup />
    </div>
  );
}

function App() {
  const [sign, setSign] = useState(false);
  return <Router sign={sign} setSign={setSign} />;
}

export default App;
