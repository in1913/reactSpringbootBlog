import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand="lg" className='mb-3' fixed='top' style={{background: "#f5f5f5", backdropFilter: "blur(12px)"}}>
            <Container>
            <Navbar.Brand style={{fontWeight: "900", fontStyle: "italic"}}>
                Inyoung
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basice-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link 
                        href='#home'
                        className="active rounded-pill px-3 header-hover"
                        style={{fontWeight:" 600", marginRight: "20px", transition: "all 0.3s"}}
                    >Home</Nav.Link>
                    <Nav.Link 
                        href='#portfolio' 
                        className="active rounded-pill px-3 header-hover"
                        style={{fontWeight:" 600", marginRight: "20px", transition: "all 0.3s"}}
                    >Portfolio</Nav.Link>
                    <Nav.Link
                        href='#blog'
                        className="active rounded-pill px-3 header-hover"
                        style={{fontWeight:" 600", marginRight: "20px", transition: "all 0.3s"}}
                    >Blog</Nav.Link>
                    <Nav.Link 
                        href='#contact' 
                        className="active rounded-pill px-3 header-hover"
                        style={{fontWeight:" 600", transition: "all 0.3s"}}
                    >Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse> 
            </Container>
        </Navbar>
        
    );
};

export default Header;