import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../components/metaData";
import Loader from "../../components/Layout/Loader/loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profile-container">
            <div className="profile-left">
              <h1 className="profile-heading">My Profile</h1>
              <img
                src={user.avatar.url}
                alt={user.name}
                className="profile-image"
              />
              <Link className="edit-button" to="/me/update">Edit Profile</Link>
            </div>

            <div className="profile-right">
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="right-buttons">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Update Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
