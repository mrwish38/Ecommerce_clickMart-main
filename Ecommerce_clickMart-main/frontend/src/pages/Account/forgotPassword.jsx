import React, { useState, useEffect, Fragment } from "react";
import "./accountCommon.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../actions/userAction";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {

    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {

        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }

        if (message) {
            toast.success(message,toastSuccessOptions);
        }
    }, [dispatch, error, message]);

    return (
        <>

            <Fragment>
                {loading ? (<Loader />) : (
                    <>
                        <MetaData title="Forgot Password" />
                        <div id="account-section">
                            <div className="accountCommon-box">

                                <h2>Forgot Password ?</h2>
                                <form className="accountCommonForm " action="/" onSubmit={forgotPasswordSubmit}>
                                <p>No worries, we'll send you an email to reset your password</p>

                                    <div className="accountCommonEmail inputWithIcon">
                                        <i class="fa-solid fa-envelope"></i>
                                        <input type="email" placeholder="Email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>

                                    <button className="accountCommon-btn" type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                        <ToastContainer />
                    </>
                )}
            </Fragment>
        </>
    )
}

export default ForgotPassword;