import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />,
  };

  return (
    <div className="productCardWrapper">
      <Link className="productCard" to={`/product/${product._id}`}>
        <img
          className="featuredProduct-image"
          src={product.images[0].url}
          alt={product.name}
        />
        <p>{product.name}</p>
        <div className="ratingContainer">
          <Rating {...options} />
          <span className="productCardSpan">
            ({product.noOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </div>
  );
};

export default ProductCard;
