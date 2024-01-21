import React from "react";
import "./commanPage.css";

function Contact() {
    return (
        <>
            <section id="contact-section">
                <div className="location-container">
                    <div className="row">
                        <div className="col-12">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2945.267938902846!2d85.74220103645318!3d20.293357713997874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1907923fc9c557%3A0xd3b0b05336a9dfaa!2sInternational%20Institute%20of%20Information%20Technology%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1678106138854!5m2!1sen!2sin"
                                width="600" 
                                height="450" 
                                allowFullScreen="" 
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                <div className="contact-details">
                    <div className="row">
                        <div className="col-3">
                            <i className="fa-solid fa-house-chimney contact-icon"></i>
                            <address>
                                IIIT Bhubaneswar, <br />Gothapatana,Bhubaneswar, Odisha <br />
                                PinCode: 751003
                            </address>
                        </div>
                        <div className="col-3">
                            <i className="fa-solid fa-envelope contact-icon"></i>
                            <a className="mail-link" href="mailto: clickMart01@gmail.com"><p>clickmartkp@gmail.com</p></a>
                        </div>
                        <div className="col-3">
                            <i className="fa-solid fa-phone-volume contact-icon"></i>
                            <a className="call-link" href="tel: +91 6389276893"><p>+91 6389276893</p></a>
                        </div>
                        <div className="col-3">
                            <i className="fa-solid fa-hourglass-half contact-icon"></i>
                            <p>Monday - Friday 10 AM - 6 PM</p>
                        </div> 
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;