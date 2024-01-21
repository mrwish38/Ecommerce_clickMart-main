import React, { useState, useEffect, Fragment } from "react";
import "./accountCommon.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../actions/userAction";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles"
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();

    const { token } = useParams();

    const dispatch = useDispatch();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }

        if (success) {
            navigate("/login");
            toast.success("Password Updated Successfully", toastSuccessOptions);
        }
    }, [dispatch, error, navigate, success]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="Update Password" />
                    <div id="account-section">
                        <div className="accountCommon-box">

                            <h2>Update Password</h2>
                            <form className="accountCommonForm" action="/" onSubmit={resetPasswordSubmit}>

                                <div className="loginPassword inputWithIcon">
                                    <i className="fas fa-key"></i>
                                    <input type="password" placeholder="New Password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className="loginPassword inputWithIcon">
                                    <i className="fas fa-check"></i>
                                    <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                                </div>
                                <button className="accountCommon-btn" type="submit">Update Password</button>

                            </form>
                        </div>
                    </div>
                </>
            )}
            <ToastContainer />
        </Fragment>
    )
};

export default ResetPassword;