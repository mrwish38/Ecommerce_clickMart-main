import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {productsReducer,productDetailsReducer, newReviewReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { OrderDetailsReducer, myOrdersReducer, newOrderReducer } from "./reducers/orderReducer";

const reducer = {
    products:productsReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer,
    orderDetails: OrderDetailsReducer
};

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    },
};

const middleware = [thunk];

const store = configureStore({
    reducer,
    initialState,
    middleware,
    devTools: true,
});

export default store;