import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import SelectedGroup from "./SelectedGroup";
import CreateJoinGroup from "./CreateJoinGroup";
import AddRecipe from "./AddRecipe";
import TopBar from "./TopBar";

function Main(props) {
  const [groupInfo, setGroupInfo] = useState("");
  const [groups, setGroups] = useState([]);
  const userId = props.userId;
  const [createJoin, setCreateJoin] = useState(false);
  const [addRecipe, setAddRecipe] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  if (selectedGroup != null) {
    console.log("Recipes of selected group " + selectedGroup.recipes);
  }
  if (createJoin) {
    return (
      <CreateJoinGroup
        setCreateJoin={setCreateJoin}
        groups={groups}
        setGroups={setGroups}
        userId={userId}
      />
    );
  } else if (addRecipe) {
    return (
      <AddRecipe
        setAddRecipe={setAddRecipe}
        userId={userId}
        groupId={selectedGroup.id}
      ></AddRecipe>
    );
  } else {
    return (
      <div>
        <TopBar />
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
            setAddRecipe={setAddRecipe}
            userId={userId}
          />
        </div>
      </div>
    );
  }
}

export default Main;
