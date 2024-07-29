import React, { useEffect, useState } from "react";
import homeButton from "../images/homeButton.svg";
import "../App.css"; // Import CSS file for styling

function EnterInfo(props) {
  const create = props.create;
  const userId = props.userId;
  const goToHome = props.goToHome;
  const [info, setInfo] = useState("");
  const [groups, setGroups] = [props.groups, props.setGroups];
  async function createJoin() {
    if (info === "") {
      return;
    }
    if (create) {
      const data = { info, userId };
      console.log(
        "Data to be sent to groups/create endpoint: " + JSON.stringify(data)
      );
      console.log("User id: " + userId);
      const response = await fetch("/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Just received the response");
      console.log(response);
      const newGroup = await response.json();
      console.log("Received new created group");
      console.log(newGroup);
      setGroups((prevGroups) => [...prevGroups, newGroup.name]);
      console.log("Successfully set groups");
    } else {
      const data = { info, userId };
      console.log(
        "Data to be sent to groups/join endpoint: " + JSON.stringify(data)
      );
      console.log("User id: " + userId);
      const response = await fetch("/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newGroup = await response.json();
      console.log("Received new joined group");
      console.log(newGroup);
      setGroups((prevGroups) => [...prevGroups, newGroup.name]);
      console.log("Successfully set groups");
    }
    goToHome();
  }

  return (
    <div style={{ margin: "20px" }}>
      <label style={{ display: "block", marginBottom: "8px" }}>
        {create ? "Create a new Group" : "Join a Group"}
      </label>
      <input
        type="text"
        id="groupName"
        placeholder={create ? "Enter group name" : "Enter group code"}
        style={{
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
          height: "30px",
        }}
        onChange={(e) => setInfo(e.target.value)}
      />
      <button
        style={{ position: "absolute", marginRight: "50px", height: "30px" }}
        onClick={createJoin}
      >
        {create ? "Create" : "Join"}
      </button>
    </div>
  );
}

function CreateJoinGroup(props) {
  const { setCreateJoin } = props;
  const [create, setCreate] = useState(true);
  const [activeTab, setActiveTab] = useState("create");
  const [groups, setGroups] = [props.groups, props.setGroups];
  const userId = props.userId;

  function goToHome() {
    setCreateJoin(false);
  }

  function switchTab(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="container">
      <div className="central-pane">
        <button
          onClick={goToHome}
          className="home-button"
          aria-label="Home"
          style={{
            height: "13px",
            backgroundColor: "transparent",
            border: "none",
            position: "absolute",
            marginTop: "-130px",
            marginLeft: "-300px",
          }}
        >
          <img src={homeButton} alt="Home Button" style={{ height: "13px" }} />
        </button>
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "create" ? "active" : ""}`}
            onClick={() => switchTab("create")}
          >
            Create
          </button>
          <button
            className={`tab-button ${activeTab === "join" ? "active" : ""}`}
            onClick={() => switchTab("join")}
          >
            Join
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "create" && (
            <EnterInfo
              create={true}
              setCreate={setCreate}
              goToHome={goToHome}
              groups={groups}
              setGroups={setGroups}
              userId={userId}
            />
          )}
          {activeTab === "join" && (
            <EnterInfo
              create={false}
              setCreate={setCreate}
              goToHome={goToHome}
              groups={groups}
              setGroups={setGroups}
              userId={userId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateJoinGroup;
