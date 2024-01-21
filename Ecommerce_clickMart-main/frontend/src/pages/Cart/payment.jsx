import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import MetaData from "../../components/metaData";
import CheckOutSteps from "./checkOutSteps";
import { useDispatch, useSelector } from "react-redux";
import "./payment.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles";
import { clearError, createOrder } from "../../actions/orderAction";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.newOrder);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    order.paymentInfo = {
        id: "Sample_Id",
        status: "Paid",
    };

    const handlePayment = () => {
        dispatch(createOrder(order));
        navigate("/success");
        toast.success("Payment successful", toastSuccessOptions);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <>
            <MetaData title="Payment" />
            <CheckOutSteps activeStep={2} />
            <div className="paymentSection">
                <div className="paymentLink">
                    <button onClick={handlePayment}>Pay - ₹{orderInfo && orderInfo.totalPrice}</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Payment;
