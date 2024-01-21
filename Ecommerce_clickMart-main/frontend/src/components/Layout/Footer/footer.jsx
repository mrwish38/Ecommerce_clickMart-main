import React from "react";
import "./footer.css";
import FooterLogo from "../../../images/logo-white.png";
import PaymentMethods from "../../../images/lower-footer_img.png";

function Footer() {
    return (
        <footer id="footer">
            <div className="upper-footer">
                <div className="footer-content">
                    <a className="brand-logo-footer" href="/">
                        <img src={FooterLogo} alt="logo" className="mr-5" />
                    </a>
                    <p className="footer-link">GENUINE PRODUCTS BY TOP RATED BRANDS</p>
                    <div>
                        <p className="footer-link" style={{ maxWidth: "70%" }}>
                            Download our App and get extra 10% Discount on your First order
                        </p>
                        <div style={{ marginTop: "1.5rem" }}>
                            <a className="app-button" href="https://play.google.com/" target="_blank" rel="noopener noreferrer" role="button">
                                <i className="fa-brands fa-google-play"></i>
                                Play Store
                            </a>
                            <a className="app-button" href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer" role="button">
                                <i className="fa-brands fa-apple"></i>
                                App Store
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-content">
                    <h4 className="footer-heading">Account</h4>
                    <div className="footer-links">
                        <ul>
                            <li className="footer-link">
                                <a href="/about">About Us</a>
                            </li>
                            <li className="footer-link">
                                <a href="/faq">Faq</a>
                            </li>
                            <li className="footer-link">
                                <a href="/sizeChart">Size chart</a>
                            </li>
                            <li className="footer-link">
                                <a href="/contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-content">
                    <h4 className="footer-heading">Policy</h4>
                    <div className="footer-links">
                        <ul>
                            <li className="footer-link">
                                <a href="/privacy-policy">Privacy Policy</a>
                            </li>
                            <li className="footer-link">
                                <a href="/shipping-policy">Shipping Policy</a>
                            </li>
                            <li className="footer-link">
                                <a href="/return-policy">Return Policy</a>
                            </li>
                            <li className="footer-link">
                                <a href="/tnc">T & C</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-content">
                    <h4 className="footer-heading">Products</h4>
                    <div className="footer-links">
                        <ul>
                            <li className="footer-link">
                                <a href="/products">Laptops</a>
                            </li>
                            <li className="footer-link">
                                <a href="/products">Headphones</a>
                            </li>
                            <li className="footer-link">
                                <a href="/products">Women's Wear</a>
                            </li>
                            <li className="footer-link">
                                <a href="/products">Mobiles</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-content">
                    <h4 className="footer-heading">Contact Us</h4>
                    <div>
                        <address className="footer-link">
                            IIIT Bhubaneswar, <br />
                            Gothapatana, Bhubaneswar, Odisha <br />
                            PinCode: 751003
                        </address>
                        <div className="footer-links">
                            <ul>
                                <li className="footer-link">
                                    <a className="text-white call-link" href="tel: ++91 6389276893">
                                        +91 6389276893
                                    </a>
                                </li>
                                <li className="footer-link">
                                    <a className="text-white mail-link" href="mailto: clickMart01@gmail.com">
                                        clickmartkp@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/kundan-prasad-kp/" className="social-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                            <a href="https://www.facebook.com/" className="social-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/" className="social-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                            <a href="https://github.com/kundanKP35" className="social-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-square-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="line"></div>
            <div className="lower-footer">
                <div className="lower-footer-content">
                    <p>Copyright@kundan_2023</p>
                    <img src={PaymentMethods} alt="accepted payment methods" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
