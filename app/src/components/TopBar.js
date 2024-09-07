import React from "react";
import settings from "../images/settings.svg";
import profile from "../images/profile.svg";

function TopBar() {
  return (
    <>
      <div
        style={{
          backgroundColor: "lightblue",
          height: "75px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <img className={"settings"} src={settings} alt={"Settings"} />
        <img className={"profile"} src={profile} alt={"Profile"} />
      </div>
    </>
  );
}
export default TopBar;
