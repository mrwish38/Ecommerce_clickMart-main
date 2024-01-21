import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MetaData from "../../components/metaData";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, newReview, clearError } from "../../actions/productAction";
import ReviewCard from "./reviewCard";
import "./productDetails.css";
import Loader from "../../components/Layout/Loader/loader";
import { addItemsToCart } from "../../actions/cartAction";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import StarIcon from "@mui/icons-material/Star";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    emptyIcon: <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const newQty = quantity + 1;
    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    setQuantity(newQty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart", toastSuccessOptions);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, toastErrorOptions);
      dispatch(clearError());
    }

    if (reviewError) {
      toast.error(reviewError, toastErrorOptions);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review Submitted Successfully", toastSuccessOptions);
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, id]);


  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <>
          <MetaData title={`${product.name} -- CLICKMART`} />
          <section id="product-details-section">
            <div className="product-details">
              <div className="product-image">
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="carousel-image"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
              <div className="product-info">
                <div>
                  <h3 className="product-name">{product.name}</h3>
                  <p>Product # {product._id}</p>
                  <div className="overall-rating">
                    <div style={{ display: "flex", alignItems: "center" }} >
                      <Rating {...options} />
                      <span style={{ fontSize: "0.9rem" }}>
                        ({product.noOfReviews} Reviews)
                      </span>
                    </div>
                  </div>
                  <div className="line"></div>
                  <h3 className="product-price">{`₹${product.price}`}</h3>
                </div>
                <div>
                  <div className="product-extra-detail">
                    <p className="bold-para">Quantity :</p>
                    <button className="quantity-control" onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button className="quantity-control" onClick={increaseQuantity}>+</button>
                  </div>
                  <div className="line"></div>
                  <span className="bold-para">
                    Status:
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </span>
                  <div className="line"></div>
                  <div className="product-extra-detail" style={{ display: "block" }}>
                    <span className="bold-para">Description :</span>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-extra-detail">
                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler} className="addToCart-btn" href="/signup">
                      <i class="fa-solid fa-cart-shopping" style={{ marginRight: "8px" }}></i>
                      ADD TO CART
                    </button>

                    <button onClick={submitReviewToggle} className="review-btn">
                      Review Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-section">
              <h3>Ratings & Reviews</h3>


              <Dialog
                open={open}
                onClose={submitReviewToggle}
                aria-labelledby="simple-dialog-title"
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent>
                  <Rating
                    onChange={(event) => setRating(event.target.value)}
                    value={rating}
                    size="large"
                  />
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                </div>
              ) : (
                <p className="no-reviews">No Reviews Yet</p>
              )}
            </div>
          </section>
        </>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProductDetails;