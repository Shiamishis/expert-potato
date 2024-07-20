import React, { useState, useEffect } from "react";
import {type} from "@testing-library/user-event/dist/type";

function SideBar(props) {
  const setGroupInfo = props.setGroupInfo;
  const userId = props.userId;
  console.log("userId: " + userId);
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
  const [groups, setGroups] = useState([]);
  const getGroupsOfUser = async () => {
    const response = await fetch(`/users/groups?user_id=${userId}`, {
      method: "GET",
    });
    console.log(response);
    setGroups(await response.json());
  };
  useEffect(() => {
    getGroupsOfUser();
  }, []);
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
        {groups === []
          ? []
          : groups.map((group, index) => (
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

export default SideBar;
