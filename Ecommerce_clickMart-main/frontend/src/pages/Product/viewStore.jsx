import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";
import "./viewStore.css";
import Loader from "../../components/Layout/Loader/loader";
import MetaData from "../../components/metaData";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions } from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';

const categories = [
    "Men",
    "Women",
    "Laptop",
    "SmartPhones",
    "Watch",
    "Camera",
    "Footwear"
];

const Products = () => {
    const dispatch = useDispatch();

    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [price, setPrice] = useState([0, 120000]);

    const { loading, products, error, productsCount, productPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const setCurrentPageNo = (event) => {
        setCurrentPage(event);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            toast.error(error, toastErrorOptions);
            dispatch(clearError());
        }

        dispatch(getProduct(keyword, currentPage, category, ratings, price));

    }, [dispatch, keyword, currentPage, category, ratings,price, error]);

    let count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title={"STORE"} />

                    <div id="products-page">
                        <h2 className="products-heading">Products</h2>

                        <div className="main-products-container">
                            <div className="products-container" style={{ paddingLeft: "1rem" }}>
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                }
                            </div>
                            <div className="filters-container">
                                <h3 className="filter-title">Filters</h3>

                                <div className="filter-card">
                                    <div className="filter">
                                        <Typography>Shop By Categories</Typography>
                                        <div className="category-options">
                                            <ul>
                                                {categories.map((category) => (
                                                    <li
                                                        className="category-link"
                                                        key={category}
                                                        onClick={() => setCategory(category)}
                                                    >{category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="slider filter">
                                        <fieldset>
                                            <Typography>Ratings</Typography>
                                            <Slider
                                                value={ratings}
                                                onChange={(event, newRating) => {
                                                    setRatings(newRating);
                                                }}
                                                aria-labelledby="continuous-slider"
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={5}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="line"></div>
                                    <div className="slider filter">
                                        <Typography>Price</Typography>
                                        <Slider
                                            value={price}
                                            onChange={priceHandler}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            min={0}
                                            max={120000}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {productPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={productPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
            <ToastContainer />
        </Fragment>
    )
}


export default Products;