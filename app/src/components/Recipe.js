import React, { useState } from "react";
import Review from "./Review";
import commentIcon from "../images/comment.svg";
import AddComment from "./AddComment";

function Recipe(props) {
  const recipe = props.recipe;
  const name = recipe["name"];
  const description = recipe["description"];
  const reviews = recipe["reviews"];
  const [addComment, setAddComment] = useState(false);
  function goToAddComment() {
    setAddComment(!addComment);
  }
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      {reviews.map((review) => (
        <Review review={review} />
      ))}
      <button
        onClick={goToAddComment}
        className="home-button"
        aria-label="Home"
        style={{
          height: "13px",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <img src={commentIcon} alt="Comment icon" style={{ height: "10px" }} />
      </button>
      {addComment ? <AddComment /> : null}
      <hr />
    </div>
  );
}

export default Recipe;
