import React, { useState } from "react";
import Sign from "./Sign";
import Main from "./Main";

function Router(props) {
  const [userId, setUserId] = useState(-1);
  const sign = props.sign;
  if (sign) {
    console.log("UserId before rendering Main: " + userId);
    return <Main userId={userId} />;
  } else {
    return <Sign setSign={props.setSign} setUserId={setUserId} />;
  }
}

export default Router;
