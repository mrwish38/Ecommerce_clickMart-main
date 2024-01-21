import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "../pages/Home/home.css";
import StarIcon from "@mui/icons-material/Star";

const FeaturedProductCard = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />,
  };

  return (
    <Link className="featured-productCard" to={`/product/${product._id}`}>
      <img
        className="featuredProduct-image"
        src={product.images[0].url}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div className="ratingContainer">
        <Rating {...options} />
        <span className="productCardSpan">({product.noOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default FeaturedProductCard;
