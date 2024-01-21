import React, { useState, useEffect, Fragment } from "react";
import "./accountCommon.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../../actions/userAction";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles"
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }

        if (isUpdated) {
            toast.success("Password Updated Successfully", toastSuccessOptions);
            navigate("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="Update Password" />
                    <div id="account-section">
                        <div className="accountCommon-box">

                            <h2>Update Password</h2>
                            <form className="accountCommonForm" action="/" onSubmit={updatePasswordSubmit}>

                                <div className="loginPassword inputWithIcon">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Old Password" required value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />
                                </div>
                                <div className="loginPassword inputWithIcon">
                                    <i className="fas fa-key"></i>
                                    <input type="password" placeholder="New Password" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
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

export default UpdatePassword;