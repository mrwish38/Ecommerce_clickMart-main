import React from "react";
import "./payment.css";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom";

const OrderSuccess = () => {
    return (
        <>
            <div className="orderSuccess">
                <i class="fa-solid fa-circle-check"></i>
                <Typography>Your Order has been Placed Successfully</Typography>
                <Link to="/orders">View Orders</Link>
            </div>
        </>
    )
};

export default OrderSuccess;