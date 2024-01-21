import React from "react";
import { Rating } from "@mui/material";
import "./productDetails.css";
import StarIcon from "@mui/icons-material/Star";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />,
  };

  return (
    <>
      <div className="reviewCard">
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
