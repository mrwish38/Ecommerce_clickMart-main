import { Fragment, React } from "react";
import "./cart.css";
import CartItemCard from "./cartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../components/metaData";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkOutHandler = () => {
        navigate("/login?redirect=/checkout");
      };    

    return (
        <>
            <Fragment>
            <MetaData title="Cart" />
                {cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <img src="/empty-cart.png" alt="" />
                        <span>No Product In Your Cart</span>
                        <Link to="/products">View Store</Link>
                    </div>
                ) : (
                    <div id="cart-section">

                        <div className="cart-headings">
                            <h4>Product</h4>
                            <h4>Quantity</h4>
                            <h4>Total</h4>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cart-body" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="quantity-box">
                                        <button className="quantity-control"
                                            onClick={() =>
                                                decreaseQuantity(item.product, item.quantity)
                                            }
                                        >
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button className="quantity-control"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.product,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubTotal">{`₹${item.price * item.quantity
                                        }`}</p>
                                </div>
                            ))}

                        <div className="cartGrossTotal">
                            <div></div>
                            <div className="cartGrossTotalBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc,item) => acc + item.quantity * item.price , 0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="placeOrder-btn">
                                <button onClick={checkOutHandler} >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        </>
    )
}

export default Cart;