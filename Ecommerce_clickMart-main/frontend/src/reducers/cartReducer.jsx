import { ADD_TO_CART, REMOVE_CART_ITEM, SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] , shippingInfo:{}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemPresent = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemPresent) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemPresent.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };

        case SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};