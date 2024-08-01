import React, { useState } from "react";
import SideBar from "./SideBar";
import SelectedGroup from "./SelectedGroup";
import CreateJoinGroup from "./CreateJoinGroup";

function Main(props) {
  const [groupInfo, setGroupInfo] = useState("");
  const [groups, setGroups] = useState([]);
  const userId = props.userId;
  const [createJoin, setCreateJoin] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  if (createJoin) {
    return (
      <CreateJoinGroup
        setCreateJoin={setCreateJoin}
        groups={groups}
        setGroups={setGroups}
        userId={userId}
      />
    );
  } else {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar
          setGroupInfo={setGroupInfo}
          userId={userId}
          setCreateJoin={setCreateJoin}
          groups={groups}
          setGroups={setGroups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <SelectedGroup
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
    );
  }
}

export default Main;
