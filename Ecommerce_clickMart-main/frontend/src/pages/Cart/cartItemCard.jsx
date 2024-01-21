import React from "react";
import "./cartItemCard.css"
import { Link } from "react-router-dom";

const CartItemCard = ({item,deleteCartItems}) => {
    return(
        <>
            <div className="cartItemCard">
                <img src={item.image} alt={item.name} />
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span >{`Price: ₹${item.price}`}</span>
                    <i onClick={() => deleteCartItems(item.product)} class="fa-solid fa-trash"></i>
                </div>
            </div>
        </>
    )
};

export default CartItemCard;