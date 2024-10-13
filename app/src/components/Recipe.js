import React, { useState } from "react";
import Review from "./Review";
import commentIcon from "../images/comment.svg";
import star from "../images/star.svg";
import filled_star from "../images/filled_star.svg";
import AddReview from "./AddReview";

function Recipe(props) {
  const recipe = props.recipe;
  const userId = props.userId;
  const name = recipe["name"];
  const description = recipe["description"];
  const [reviews, setReviews] = useState(recipe["reviews"]);
  const [addComment, setAddComment] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [rated, setRated] = useState(false);

  function goToAddComment() {
    setAddComment(!addComment);
  }

  async function addRating() {
    //data
    const data = {
      userId,
      recipeId: recipe.id,
      stars: hoveredStar + 1,
    };
    //response
    const response = await fetch("/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setHoveredStar(hoveredStar);
    setRated(true);
  }
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      {reviews.map((review) => (
        <Review review={review} />
      ))}
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img
            key={index}
            src={index <= hoveredStar ? filled_star : star}
            alt="Star"
            style={{ height: "15px", cursor: "pointer" }}
            onMouseEnter={() => !rated && setHoveredStar(index)}
            onMouseLeave={() => !rated && setHoveredStar(-1)}
            onClick={addRating}
          />
        ))}
      <br />
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
