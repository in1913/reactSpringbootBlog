import React, {useState, useEffect} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri'

const UserBox = styled.div`
    transition: all 0.3s;
    position: relative;
`
const MyLink = styled.a`
    text-decoration: none;
    color: black;
    display: inline-block;
`
const ToggleBox = styled.div`
    transition: all .3s;
    position: absolute;
    top: 40px;
    width: 100%;
    background: rgba(245,245,245, .5);
    backdrop-filter: blur(12px);
    border-radius: 20px;
`
// background: #f5f7fb
const Header = () => {
    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);

    // 로그인 세션 받아오기
    const [session, setSession] = useState(null);


    useEffect(() => {
        const sessionData = async () => {
            const response = await axios.get('/api/session');
            if(response.data === ""){
                setIsLogin(false);
                setSession(null);
            }else{
                setIsLogin(true);
                setSession(response.data);
            }
        };
        sessionData();
    }, []);


    // 로그아웃
    const handleLogout = async () => {
        const response = await axios.get('/api/logout');
        if(response.data === "Success"){
            setIsLogin(false);
            window.location.reload();
        }
    };

    // 토글 버튼
    const [isToggle, setIstoggle] = useState(false);
    const handleToggle = (e) => {
        e.preventDefault();
        setIstoggle(!isToggle);
    }
    
    return (
        <Navbar expand="lg" className='mb-3' fixed='top' style={{background: "rgba(245,245,245, .5)", backdropFilter: "blur(12px)"}}>
            <Container>
            <Navbar.Brand style={{fontWeight: "900", fontStyle: "italic"}}>
                <Link to="/blog" style={{textDecoration: "none", color: "#000"}}>Inyoung's Blog</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basice-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Link to="/"
                        className="my-2 active rounded-pill px-3 me-3 p-1 text-decoration-none header-hover" 
                        style={{fontWeight:" 600"}}
                        >Home</Link>
                    {
                        isLogin ? 
                        // 로그인 했을 때
                        (
                            <UserBox className='py-2 d-flex flex-column me-3'>
                                <MyLink 
                                    href="#"
                                    onClick={handleToggle}
                                    className="px-3 p-1 rounded-pill text-decoration-none header-hover"
                                    style={{fontWeight: "600"}}
                                    >
                                    {session[0]["memname"]}님 
                                    {
                                        isToggle ? (<RiArrowDropUpLine/>) : (<RiArrowDropDownLine/>)
                                    }
                                    
                                </MyLink>
                                {
                                    isToggle ? 
                                    (<ToggleBox className="d-flex flex-column pe-3 pb-2">
                                    <Link
                                        to="admin"
                                        className='px-3 p-1 mt-2 rounded-pill text-decoration-none header-hover'
                                        style={{fontWeight: "600"}}
                                    >
                                        MyPage
                                    </Link>
                                    <MyLink 
                                        href="#"
                                        onClick={handleLogout}
                                        className="px-3 p-1 mt-2 rounded-pill text-decoration-none header-hover"
                                        style={{fontWeight: "600"}}
                                        >
                                        LogOut
                                    </MyLink>
                                </ToggleBox>)
                                    :
                                    (<></>)
                                }
                            </UserBox>
                        ) : 

                        // 로그인 안했을때
                        (
                            <Link 
                                to="/blog/login" 
                                className="active rounded-pill px-3 me-3 pb-1  pt-1 text-decoration-none my-2 header-hover"
                                style={{fontWeight:" 600", transition: "all 0.3s"}}
                                >LogIn</Link>
                        )
                    }
                    
                </Nav>
            </Navbar.Collapse> 
            </Container>
        </Navbar>
        
    );
};

export default Header;