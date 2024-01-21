import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserOptions from './userOptions';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from "../../../images/clickmart-logo.png";


function Header() {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const { isAuthenticated, user } = useSelector(state => state.user);


    const handleSearch = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };


    return (
        <>
            <div class="header-container">
                <div class="row">

                    <div class="col text-center">
                        <p className="text-white header-content">Free Shipping On Order Over ₹399</p>
                    </div>
                    
                </div>
            </div>


            <Navbar expand="md" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="logo" className="mr-5" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                            <img src={Logo} alt="logo" className="mr-5" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3">
                                <Nav.Link className="navbar-nav-item" href="/">HOME</Nav.Link>
                                <Nav.Link className="navbar-nav-item" href="/products">VIEW STORE</Nav.Link>
                                <Nav.Link className="navbar-nav-item" href="/contact">CONTACT</Nav.Link>
                                <Nav.Link className="navbar-nav-item" href="/about">ABOUT</Nav.Link>
                            </Nav>
                            <div className="search-box">
                                <Form className="d-flex search-box" onSubmit={handleSearch}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search Products Here ..."
                                        className="me-2 search-input"
                                        onChange={(event) => setKeyword(event.target.value)}
                                        aria-label="Search"
                                    />
                                    <Button type="submit" className="search-icon" variant="outline-success"   style={{ backgroundColor: '#ff3f6c' }}
>  
                                        <i class="fa-solid fa-magnifying-glass" />
                                    </Button>
                                </Form>
                            </div>
                            
                            <div className="account">
                                {isAuthenticated ? (
                                    <UserOptions user={user} />
                                ) : (
                                    <a href="/login"><p><i className="fa-solid fa-user"></i></p><span className="icon-name">Profile</span></a> // Render default account option when user is not authenticated
                                )}
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;