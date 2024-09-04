import homeButton from "../images/homeButton.svg";
import React, { useState } from "react";

function AddRecipe(props) {
  const setAddRecipe = props.setAddRecipe;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userId = props.userId;
  const groupId = props.groupId;
  function goToHome() {
    setAddRecipe(false);
  }
  async function newRecipe() {
    const data = {
      name,
      description,
      userId,
      groupId,
    };
    const response = await fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Just received the response");
    console.log(response);
    goToHome();
  }
  return (
    <div>
      <h1>Add a new recipe</h1>
      <button
        onClick={goToHome}
        className="home-button"
        aria-label="Home"
        style={{
          height: "13px",
          backgroundColor: "transparent",
          border: "none",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <img src={homeButton} alt="Home Button" style={{ height: "13px" }} />
      </button>
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="recipeName"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Recipe Name:
        </label>
        <input
          type="text"
          id="recipeName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="recipeDescription"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Description:
        </label>
        <textarea
          id="recipeDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", width: "300px", height: "100px" }}
        ></textarea>
      </div>
      <button
        onClick={newRecipe}
        style={{
          height: "30px",
          width: "100px",
          backgroundColor: "lightblue",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add Recipe
      </button>
    </div>
  );
}
export default AddRecipe;
