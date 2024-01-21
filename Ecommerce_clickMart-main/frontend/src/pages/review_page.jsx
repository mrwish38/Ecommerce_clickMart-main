import React from "react";
import ReactStars from "react-stars";

function GiveReview() {
    return(
        <>
            <section id="review-page-section">
                <div className="review-head">
                    <div>
                        <h3 style={{margin:0}}>Ratings & Reviews</h3>
                    </div>
                    <div>
                        <a href="">
                            <div className="reviewed-product">
                                <div>
                                    <p style={{margin:0}}>OnePlus Bullets Wireless..</p>
                                    <ReactStars
                                        count={5}
                                        size={18}
                                        half="true"
                                        value="4.5"
                                        color2={'#ffd700'}
                                        edit={false} />
                                </div>
                                <div className="product-image-review">
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="review-body">
                    <div className="row" style={{padding:"0"}}>
                        <div className="col-4 review-guidelines">
                            <div>
                                <h4>What makes a good review</h4>
                                <div className="line"></div>
                            </div>
                            <div>
                                <div>
                                    <h6>Have you used this product?</h6>
                                    <p>Your review should be about your experience with the product.</p>
                                </div>
                                <div className="line"></div>
                                <div>
                                    <h6>Why review a product?</h6>
                                    <p>Your valuable feedback will help fellow shoppers decide!</p>
                                </div>
                                <div className="line"></div>
                                <div>
                                    <h6>How to review a product?</h6>
                                    <p>Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 p-0">
                            <div className="row review-form">
                                <div col-12>
                                    <h4>Rate this product</h4>
                                    <ReactStars
                                        count={5}
                                        size={18}
                                        half="true"
                                        value="4.5"
                                        color2={'#ffd700'}
                                        edit={true} />
                                </div>
                                <div className="line"></div>
                                <div className="col-12">
                                    <h4>Review this product</h4>
                                    <form className="row" action="">
                                        <div className="col-12 form-data mb-3">
                                            <textarea className="form-control" id="YouReview" rows="5" placeholder="Your Review"></textarea>
                                            <p className="mt-3" style={{display:"flex",justifyContent: "flex-end"}}>
                                                <input className="contact-submit-btn" type="submit" value="Submit" />
                                            </p>
                                        </div>
                                    </form>
                                </div>           
                            </div>  
                        </div>
                    </div>
                </div>      
            </section>
        </>
    )
}

export default GiveReview;