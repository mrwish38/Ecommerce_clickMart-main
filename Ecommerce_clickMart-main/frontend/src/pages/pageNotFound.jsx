import React from 'react';
import "./commanPage.css";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found-container">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p className="page-not-found-message">Oops! Page not found.</p>
        <Link to="/">Home</Link>
      </div>
    </>
  )
};

export default PageNotFound
