import React from "react";
import Recipe from "./Recipe";

function SelectedGroup(props) {
  const group = props.selectedGroup;
  const setAddRecipe = props.setAddRecipe;
  const userId = props.userId;
  function addRecipe(recipe) {
    setAddRecipe(true);
  }
  console.log("Group: " + group);
  let recipes = [];
  if (group == null || group === undefined) {
    recipes = [];
  } else {
    recipes = group.recipes;
    if (recipes == null || recipes.length === undefined) {
      recipes = [];
    }
  }
  console.log("Recipes: " + recipes);
  return (
    <div>
      <div>
        {recipes.map((recipe, index) => (
          <Recipe recipe={recipe} userId={userId} />
        ))}
      </div>
      <button
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          marginTop: "85px",
          marginRight: "25px",
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
  );
}

export default SelectedGroup;
