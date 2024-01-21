import React, { useState, useEffect, Fragment } from "react";
import "./accountCommon.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser, clearError, updateProfile } from "../../actions/userAction";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles"
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";


const UpdateProfile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPrevew] = useState("/Profile.png");

    const updateProfileSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (event) => {
        const render = new FileReader();

        render.onload = () => {
            if (render.readyState === 2) {
                setAvatarPrevew(render.result);
                setAvatar(render.result);
            }
        };
        render.readAsDataURL(event.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPrevew(user.avatar.url);
        }
    
        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }
    
        if (isUpdated) {
            navigate("/account");
            toast.success("Profile Updated Successfully", toastSuccessOptions);
            dispatch(LoadUser());
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, navigate, user, isUpdated]);
    

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                <MetaData title="Edit Profile" />
                <div id="account-section">
                    <div className="accountCommon-box">
    
                        <h2>Edit Profile</h2>
                        <form className="accountCommonForm " encType="multipart/form-data"  action="/" onSubmit={updateProfileSubmit}>
                            <div className="accountCommonName inputWithIcon">
                                <i class="fa-solid fa-face-grin-wide"></i>
                                <input type="text" placeholder="Name" required name="name" value={name} onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div className="accountCommonEmail inputWithIcon">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="email" placeholder="Email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="accountCommonImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
    
                                <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} style={{ padding: 0 }} />
    
                            </div>
    
                            <button className="accountCommon-btn" type="submit">Edit Profile</button>
                        </form>
                    </div>
                </div>
            </>
            )}
            <ToastContainer />
        </Fragment>
    )
};

export default UpdateProfile;