import React, { Fragment, useEffect } from "react";
import Marquee from "react-fast-marquee";
import MetaData from "../../components/metaData";
import FeaturedProductCard from "../../components/featuredProducts";
import { clearError, getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import Loader from "../../components/Layout/Loader/loader";
import BannerSlider from "./bannerSlider";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions} from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if(error){
            toast.error(error,toastErrorOptions);
            dispatch(clearError());
        }
        dispatch(getProduct());
    }, [dispatch,error])

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="CLICKMART" />
                    <BannerSlider />
                    <h2 className="home-heading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <FeaturedProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    <section id="marquee">
                        <Marquee className="marquee-content">
                            <div className="brands-image">
                                <img src="/images/brands/brand-01.png" alt="Brand Logo 1" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-02.png" alt="Brand Logo 2" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-03.png" alt="Brand Logo 3" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-04.png" alt="Brand Logo 1" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-05.png" alt="Brand Logo 2" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-06.png" alt="Brand Logo 3" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-07.png" alt="Brand Logo 2" />
                            </div>
                            <div className="brands-image">
                                <img src="images/brands/brand-08.png" alt="Brand Logo 3" />
                            </div>
                        </Marquee>
                    </section>
                </>
            )}
            <ToastContainer />
        </Fragment>
    )
};

export default Home;