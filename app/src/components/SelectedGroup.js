import React from "react";
import Recipe from "./Recipe";

function SelectedGroup(props) {
  const groupInfo = props.groupInfo;
  const setGroupInfo = props.setGroupInfo;
  const group = props.selectedGroup;
  function addRecipe(recipe) {
    return;
  }
  console.log("Group: " + group);
  let recipes = [];
  if (group == null || group === undefined) {
    recipes = [];
  } else {
    recipes = group.recipes;
    console.log("Recipes: " + recipes);
    if (recipes == null || recipes.length === undefined) {
      recipes = [];
    }
  }
  console.log("Recipes: " + recipes);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <button
          style={{
            marginRight: "10px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "lightblue",
            height: "24px",
            width: "24px",
          }}
          onClick={addRecipe}
        >
          +
        </button>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <Recipe recipe={recipe} />
        ))}
      </div>
    </>
  );
}

export default SelectedGroup;
