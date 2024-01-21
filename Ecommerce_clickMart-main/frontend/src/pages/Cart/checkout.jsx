import React, { useState } from "react";
import MetaData from "../../components/metaData";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";
import CheckOutSteps from "./checkOutSteps";
import { ShippingInfo } from "../../actions/cartAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles";

function CheckOut() {

    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart); 
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [city, setCity] = useState(shippingInfo.city);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

    const shippingSubmit = (event) => { 
        event.preventDefault();

        if(phoneNumber.length < 10 || phoneNumber.length > 10){
            toast.error('Phone Number should be of 10 digits', toastErrorOptions);
            return;
        }
        dispatch(
            ShippingInfo({address,country,state,city,pinCode,phoneNumber})
        );
        navigate("/order/confirm");
        toast.success('Shipping details saved successfully', toastSuccessOptions);

    };

    return (
        <>
            <MetaData title="CheckOut" />

            <CheckOutSteps activeStep={0} />

            <div id="checkout-section">
                <div className="shipping-box">
                    <h2 >Shipping Details</h2>
                    <form className="shipping-form" excType="multipart/form-data" onSubmit={shippingSubmit}>

                        <div className="inputWithIcon">
                            <i class="fa-solid fa-house"></i>
                            <input type="text" placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)} required />
                        </div>

                        <div className="inputWithIcon">
                            <i class="fa-solid fa-city"></i>
                            <input type="text" placeholder="City" value={city} onChange={(event) => setCity(event.target.value)} required />
                        </div>

                        <div className="inputWithIcon">
                            <i class="fa-solid fa-location-dot"></i>
                            <input type="number" placeholder="Pin Code" value={pinCode} onChange={(event) => setPinCode(event.target.value)} required />
                        </div>

                        <div className="inputWithIcon">
                            <i class="fa-solid fa-phone"></i>
                            <input type="number" placeholder="Phone Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} size="10" required />
                        </div>

                        <div className="inputWithIcon">
                            <i class="fa-solid fa-globe"></i>
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div className="inputWithIcon">
                                <i className="fas fa-map-marker-alt"></i>
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <input type="submit" className="shipping-btn" value="Continue to Payment" n />

                        <Link to="/cart" className="return-to-cart-link">
                            <i class="fa-solid fa-arrow-left fa-md" style={{ marginRight: "10px" }}></i>
                            Return to Cart
                        </Link>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default CheckOut;