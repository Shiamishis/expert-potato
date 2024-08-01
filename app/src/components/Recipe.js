import React, { useState } from "react";

function Recipe(props) {
  const recipe = props.recipe;
  const name = recipe["name"];
  const description = recipe["description"];
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <hr />
    </div>
  );
}

export default Recipe;
