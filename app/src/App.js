import React, { useState, useEffect } from "react";
import Router from "./components/Router";
import "./App.css";

function App() {
  const [sign, setSign] = useState(false);
  useEffect(() => {
    const savedSign = localStorage.getItem("sign");
    if (savedSign) {
      setSign(JSON.parse(savedSign));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sign", JSON.stringify(sign));
  }, [sign]);

  return <Router sign={sign} setSign={setSign} />;
}

export default App;
