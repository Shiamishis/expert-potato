import React, { useState } from "react";
import Review from "./Review";
import commentIcon from "../images/comment.svg";
import AddReview from "./AddReview";

function Recipe(props) {
  const recipe = props.recipe;
  const userId = props.userId;
  const name = recipe["name"];
  const description = recipe["description"];
  const [reviews, setReviews] = useState(recipe["reviews"]);
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
      {addComment ? (
        <AddReview
          recipeId={recipe.id}
          userId={userId}
          reviews={reviews}
          setReviews={setReviews}
        />
      ) : null}
      <hr />
    </div>
  );
}

export default Recipe;
