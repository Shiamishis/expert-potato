import React, { useState, useEffect } from "react";

function SideBar(props) {
  const setGroupInfo = props.setGroupInfo;
  const setCreateJoin = props.setCreateJoin;
  const userId = props.userId;
  console.log("userId: " + userId);
  const [selectedGroup, setSelectedGroup] = [
    props.selectedGroup,
    props.setSelectedGroup,
  ];
  const [searchTerm, setSearchTerm] = useState("");
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
  const groups = props.groups;
  const setGroups = props.setGroups;
  const [filteredGroups, setFilteredGroups] = useState(groups);
  if (selectedGroup != null) {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].name === selectedGroup.name) {
        setSelectedGroup(groups[i]);
        break;
      }
    }
  }
  const getGroupsOfUser = async () => {
    console.log("Reached getGroupsOfUser method");
    const response = await fetch(`/users/groups?user_id=${userId}`, {
      method: "GET",
    });
    const groupsOfUser = await response.json();
    console.log("Groups of user: " + groupsOfUser);
    setGroups(groupsOfUser);
    console.log("Number of groups: " + groups.length);
    console.log("The groups after rendering sidebar are: " + groups);
  };
  useEffect(() => {
    getGroupsOfUser();
  }, []);
  function selectGroup(index) {
    setSelectedGroup(groups[index]);
    setGroupInfo("This is " + groups[index]["name"]);
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  }, [searchTerm, groups]);
  function goToCreateJoin() {
    setCreateJoin(true);
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
          onClick={goToCreateJoin}
        >
          +
        </button>
      </div>
      <form>
        <label>Search for a group:</label>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "90%" }}
        ></input>
      </form>
      <ul style={styles.list}>
        {filteredGroups === []
          ? []
          : filteredGroups.map((group, index) => {
              return (
                <li key={index} style={styles.listItem}>
                  <button
                    style={{
                      ...styles.button,
                      ...(selectedGroup != null &&
                      selectedGroup.name === group.name
                        ? styles.selectedButton
                        : {}),
                    }}
                    onClick={() => selectGroup(index)}
                  >
                    {group["name"]}
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default SideBar;
