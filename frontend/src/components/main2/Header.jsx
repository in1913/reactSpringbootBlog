import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar expand="lg" className="main-header">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto main-header-nav text-end pt-3">
                        <Nav.Link href="#Home">
                            Produce
                        </Nav.Link>
                        <Nav.Link href="#Skill">Skill</Nav.Link>
                        <Nav.Link href="#Portfolio">Portfolio</Nav.Link>
                        <Nav.Link href="#Blog">Blog</Nav.Link>
                        <Nav.Link href="#Contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;