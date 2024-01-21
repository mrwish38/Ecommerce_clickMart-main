import React from "react";

function About() {

    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50vh',
    };

    const headingStyle = {
        fontSize: '2rem',
        color: 'rgb(48,48,48)',
        marginBottom: '1rem',
    };

    const paragraphStyle = {
        fontSize: '16px',
        color: 'rgb(48,48,48)',
        marginBottom: '3px',
    };

    return (
        <>
            <div style={containerStyle}>
                <h1 style={headingStyle}>About Us</h1>
                <p style={paragraphStyle}>Welcome to my ecommerce website!</p>
                <p style={paragraphStyle}>Feel free to explore the website and check out the products I have listed.</p>
            </div>
        </>
    )
}

export default About;