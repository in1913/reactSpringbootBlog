import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const MyLink = styled.a`
    text-decoration: none;
    color: black;
    display: inline-block;
`
const Header = ({setIsLogin}) => {
    // 로그아웃
    const handleLogout = async () => {
        const response = await axios.get('/api/logout');
        if(response.data === "Success"){
            setIsLogin(false);
        }
    };

    
    return (
        <Navbar expand="lg" className='mb-3' fixed='top' style={{background: "rgba(245,245,245, .5)", backdropFilter: "blur(12px)"}}>
            <Container>
            <Navbar.Brand style={{fontWeight: "900", fontStyle: "italic"}}>
                <Link to="/" style={{textDecoration: "none", color: "#000"}}>Inyoung</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basice-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Link to="/blog"
                        className="my-2 active rounded-pill px-3 me-3 p-1 text-decoration-none header-hover"
                          style={{fontWeight: "900", fontStyle: "italic"}}
                        >Inyoung's blog</Link>
                    <MyLink 
                        href="#"
                        onClick={handleLogout}
                        className="px-3 p-1 mt-2 rounded-pill text-decoration-none header-hover"
                        style={{fontWeight: "600"}}
                        >
                        LogOut
                    </MyLink>
                </Nav>
            </Navbar.Collapse> 
            </Container>
        </Navbar>
        
    );
};

export default Header;