import React, { useState } from "react";

function AddReview(props) {
  const recipeId = props.recipeId;
  const userId = props.userId;
  const [text, setText] = useState("");
  const [reviews, setReviews] = [props.reviews, props.setReviews];
  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  async function newReview() {
    const data = {
      text,
      recipeId,
      userId,
    };
    const response = await fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Just received the response");
    console.log(response);
    const newReview = await response.json();
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setText("");
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter your comment"
        style={{ height: "10px" }}
      />
      <button type="submit" onClick={newReview} style={{ height: "20px" }}>
        Submit
      </button>
    </div>
  );
}

export default AddReview;
