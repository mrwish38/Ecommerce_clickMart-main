import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    CLEAR_ERROR,
} from "../constants/orderConstants";

import axios from "axios";


// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post("/api/v1/order/new",order,config);

        dispatch({type:CREATE_ORDER_SUCCESS, payload:data});

    }catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDERS_REQUEST});

        const {data} = await axios.get("/api/v1/order/myOrders");

        dispatch({type:MY_ORDERS_SUCCESS, payload:data.orders});

    }catch (error) {
        dispatch({
            type: MY_ORDERS_FAILURE,
            payload: error.response.data.message,
        });
    }
};

// Order Details
export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/order/${id}`);

        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data.order});

    }catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
}