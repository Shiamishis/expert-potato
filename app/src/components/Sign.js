import React, { useState } from "react";
import potato from "../images/potato.svg";

function Sign(props) {
  const setSign = props.setSign;
  const setUserId = props.setUserId;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const [borderColorUsername, setBorderColorUsername] = useState("white");
  const [borderColorPassword, setBorderColorPassword] = useState("white");

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

  async function enter() {
    if (username === "" && password === "") {
      setBorderColorUsername("red");
      setBorderColorPassword("red");
    } else if (username === "") {
      setBorderColorUsername("red");
      setBorderColorPassword("green");
    } else if (password === "") {
      setBorderColorUsername("green");
      setBorderColorPassword("red");
    } else if (signText === "Sign in") {
      setBorderColorUsername("green");
      setBorderColorPassword("green");
      const data = { username, password };
      try {
        const response = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const userId = await response.json().id;
        console.log(response.json());
        console.log("User id after signing up:" + userId);
        setUserId(userId);
        setSign(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      const data = { username, password };
      try {
        const response = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(response);
        const d = await response.json();
        const body = d.body;
        console.log("---------------------");
        console.log(body);
        console.log("---------------------");
        const userId = d.id;
        console.log("User id after signing in:" + userId);
        if (response.ok) {
          setUserId(userId);
          setSign(true);
        } else {
          console.log("Error creating user");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: backColor,
                  borderColor: borderColorUsername,
                  border: "2px solid",
                }}
              />
            </div>
            <div className="form-group" style={{ color: labelColor }}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={passwordPlaceholder}
                required
                onClick={handlePasswordInputClick}
                onBlur={restorePasswordPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: backColor,
                  borderColor: borderColorPassword,
                  border: "2px solid",
                }}
              />
            </div>
            <button
              className="enterButton"
              style={{
                marginTop: "2%",
                width: "30%",
                height: "30px",
                border: "none",
                backgroundColor: labelColor,
                color: "black",
                borderRadius: "15px",
              }}
              onClick={enter}
            >
              {signText === "Sign up" ? "Sign in" : "Sign up"}
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

export default Sign;
