import React, { useState } from "react";
import SideBar from "./SideBar";
import SelectedGroup from "./SelectedGroup";
import CreateJoinGroup from "./CreateJoinGroup";

function Main(props) {
  const [groupInfo, setGroupInfo] = useState("");
  const userId = props.userId;
  const [createJoin, setCreateJoin] = useState(false);
  if (createJoin) {
    return <CreateJoinGroup setCreateJoin={setCreateJoin} />;
  } else {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar
          setGroupInfo={setGroupInfo}
          userId={userId}
          setCreateJoin={setCreateJoin}
        />
        <SelectedGroup groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
      </div>
    );
  }
}

export default Main;
