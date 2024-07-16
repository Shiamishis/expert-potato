import React, { useState, useEffect } from "react";
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

function SideBar(props) {
  const setGroupInfo = props.setGroupInfo;
  const [selectedGroup, setSelectedGroup] = useState(null);
  const styles = {
    sidebar: {
      width: "35vh",
      backgroundColor: "#f4f4f4",
      padding: "15px",
      borderRight: "1px solid #ccc",
    },
    header: {
      margin: "0 0 10px 0",
      fontSize: "18px",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      overflowY: "auto",
      maxHeight: "90vh",
    },
    listItem: {
      height: "10vh",
    },
    button: {
      background: "lightblue",
      borderRadius: "20px",
      display: "block",
      width: "100%",
      height: "90%",
      border: "none",
    },
    selectedButton: {
      background: "blue",
      color: "white",
    },
  };
  const groups = ["Group 1", "Group 2", "Group 3"];
  function selectGroup(index) {
    setSelectedGroup(groups[index]);
    setGroupInfo("This is " + groups[index]);
  }
  return (
    <div style={styles.sidebar}>
      <div style={{ display: "flex", alignContent: "center" }}>
        <h2 style={styles.header}>Groups</h2>
        <button
          style={{
            marginLeft: "10px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "lightblue",
            height: "24px",
            width: "24px",
          }}
        >
          +
        </button>
      </div>
      <ul style={styles.list}>
        {groups.map((group, index) => (
          <li key={index} style={styles.listItem}>
            <button
              style={{
                ...styles.button,
                ...(selectedGroup === group ? styles.selectedButton : {}),
              }}
              onClick={() => selectGroup(index)}
            >
              {group}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectedGroup(props) {
  const groupInfo = props.groupInfo;
  const setGroupInfo = props.setGroupInfo;
  return <h1>{groupInfo}</h1>;
}

function Main() {
  const [groupInfo, setGroupInfo] = useState("");
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar setGroupInfo={setGroupInfo} />
      <SelectedGroup groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
    </div>
  );
}

function App() {
  const [sign, setSign] = useState(false);
  useEffect(() => {
    const savedSign = localStorage.getItem("sign");
    if (savedSign) {
      setSign(JSON.parse(savedSign));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sign", JSON.stringify(sign));
  }, [sign]);
  return <Router sign={sign} setSign={setSign} />;
}

export default App;
