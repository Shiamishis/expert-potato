import React from "react";

function Review(props) {
  const review = props.review;
  console.log("Review in review component: " + review.text);
  const text = review.text;
  return (
    <h5>
      <i>{text}</i>
    </h5>
  );
}

export default Review;
