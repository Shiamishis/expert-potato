import React from "react";

function SelectedGroup(props) {
  const groupInfo = props.groupInfo;
  const setGroupInfo = props.setGroupInfo;
  return <h1>{groupInfo}</h1>;
}

export default SelectedGroup;
