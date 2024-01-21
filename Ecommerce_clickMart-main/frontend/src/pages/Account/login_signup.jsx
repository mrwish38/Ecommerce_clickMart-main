import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "./login_signup.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, Login, Signup } from "../../actions/userAction";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions, toastSuccessOptions } from "../../components/toastStyles"
import 'react-toastify/dist/ReactToastify.css';


const LoginSignup = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const signupTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",

    });

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPrevew] = useState("/Profile.png");

    const { name, email, password } = user;

    const loginSubmit = (event) => {
        event.preventDefault();
        dispatch(Login(loginEmail, loginPassword));
    };

    const signupSubmit = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(Signup(myForm));
    }

    const signupDataChange = (event) => {
        if (event.target.name === "avatar") {
            const render = new FileReader();

            render.onload = () => {
                if (render.readyState === 2) {
                    setAvatarPrevew(render.result);
                    setAvatar(render.result);
                }
            };
            render.readAsDataURL(event.target.files[0]);
        } else {
            setUser({ ...user, [event.target.name]: event.target.value });
        }
    };

    const redirect = new URLSearchParams(location.search).get("redirect") || "/account";
    
    useEffect(() => {
        if (error) {
            toast.error(error,toastErrorOptions);
            dispatch(clearError());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, navigate, isAuthenticated,redirect]);

    const switchTabs = (event, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            signupTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "signup") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            signupTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title={"Accounts"} />
                    <section id="account-section">
                        <div className="account-box">
                            <div>
                                <div className="login_signup_toggle">
                                    <p onClick={(event) => switchTabs(event, "login")}>LOGIN</p>
                                    <p onClick={(event) => switchTabs(event, "signup")}>SIGNUP</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} action="/" onSubmit={loginSubmit}>
                                <div className="loginEmail inputWithIcon">
                                    <i class="fa-solid fa-envelope"></i>
                                    <input type="email" placeholder="Email" required value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} />
                                </div>
                                <div className="loginPassword inputWithIcon">
                                    <i class="fa-solid fa-key"></i>
                                    <input type="password" placeholder="Password" required value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
                                </div>
                                <Link to="/password/forgot">Forgot Password ?</Link>
                                <button className="login-btn" type="submit">Login</button>
                            </form>

                            <form className="signupForm" encType="multipart/form-data" ref={signupTab} action="/" onSubmit={signupSubmit}>
                                <div className="signupName inputWithIcon">
                                    <i class="fa-solid fa-face-grin-wide"></i>
                                    <input type="text" placeholder="Name" required name="name" value={name} onChange={signupDataChange} />
                                </div>
                                <div className="signupEmail inputWithIcon">
                                    <i class="fa-solid fa-envelope"></i>
                                    <input type="email" placeholder="Email" name="email" required value={email} onChange={signupDataChange} />
                                </div>
                                <div className="loginPassword inputWithIcon">
                                    <i class="fa-solid fa-key"></i>
                                    <input type="password" placeholder="Password" name="password" required value={password} onChange={signupDataChange} />
                                </div>
                                <div className="signupImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />

                                    <input type="file" name="avatar" accept="image/*" onChange={signupDataChange} style={{ padding: 0 }} />

                                </div>

                                <button className="signup-btn" type="submit">Signup</button>
                            </form>
                        </div>
                    </section>
                </>
            )}
            <ToastContainer />
        </Fragment>
    )
}

export default LoginSignup;
