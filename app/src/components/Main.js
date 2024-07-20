import React, { useState } from "react";
import SideBar from "./SideBar";
import SelectedGroup from "./SelectedGroup";

function Main(props) {
  const [groupInfo, setGroupInfo] = useState("");
  const userId = props.userId;
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar setGroupInfo={setGroupInfo} userId={userId} />
      <SelectedGroup groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
    </div>
  );
}

export default Main;
