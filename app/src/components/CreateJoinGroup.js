import React, { useState } from "react";
import homeButton from "../images/homeButton.svg";
import "../App.css"; // Import CSS file for styling

function EnterInfo(props) {
  const create = props.create;
  const setCreate = props.setCreate;
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
        }}
      />
    </div>
  );
}

function Join(props) {
  return <h1>Join a Group!</h1>;
}

function CreateJoinGroup(props) {
  const { setCreateJoin } = props;
  const [create, setCreate] = useState(true);
  const [activeTab, setActiveTab] = useState("create");

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
            <EnterInfo create={true} setCreate={setCreate} />
          )}
          {activeTab === "join" && (
            <EnterInfo create={false} setCreate={setCreate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateJoinGroup;
