import React, { useEffect, Fragment } from 'react';
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, orderDetails } from "../../actions/orderAction";
import Loader from "../../components/Layout/Loader/loader";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../../components/metaData";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions } from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error, toastErrorOptions);
      dispatch(clearError());
    }

    dispatch(orderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="order-details-page">
            <div className="order-details-container">
              <h2>
                Order #{order && order._id}
              </h2>
              <Typography>Shipping Info</Typography>
              <div className="shipping-info-container">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order.shippingInfo && order.shippingInfo.phoneNumber}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="payment-info-container">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "Paid"
                        ? "green-color"
                        : "red-color"
                    }
                  >
                    {order.paymentInfo &&
                      order.paymentInfo.status === "Paid"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="order-status-container">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "green-color"
                        : "red-color"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-items-container">
              <Typography>Order Items:</Typography>
              <div className="order-items-list">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link><br></br>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </Fragment>
  );
}

export default OrderDetails;
