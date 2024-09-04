import React from "react";
import Recipe from "./Recipe";

function SelectedGroup(props) {
  const group = props.selectedGroup;
  const setAddRecipe = props.setAddRecipe;
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
    <>
      <div>
        {recipes.map((recipe, index) => (
          <Recipe recipe={recipe} />
        ))}
      </div>
      <button
        style={{
          position: "absolute",
          top: "0",
          right: "0",
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
    </>
  );
}

export default SelectedGroup;
