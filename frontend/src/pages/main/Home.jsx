import React, {useState} from 'react';
import Header from '../../components/main/Header';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap'
import {FaArrowCircleDown} from 'react-icons/fa';
const Jumbotron = styled.div`
    width: 100%;
    margin: 200px 0;
`
const Title = styled.h1`
    font-weight: 600;
    font-size: 50px;
`
const Content = styled.p`
    word-break: break-word;
    font-size: 30px;
`
const MyImg = styled.img`
    width: 100%;
    box-shadow: 10px 5px 10px rgba(0, 0, 0, .5);
    border-radius: 20px;
`
const Link = styled.a`
    display: block;
    text-decoration: none;
    width: 200px;
    height: 50px;
    line-height: 45px;
    text-align: center;
    font-size: 25px;
    color: purple;
    border: 2px solid purple;
    transition: all .3s;
`
const Home = () => {
    const [isHover, setIsHover] = useState(false);
    const handleMouseOut = () => {
        setIsHover(false);
    }
    const handleMouseOver = () => {
        setIsHover(true);
    }
    return (
        <>
        <Header/>
        <Container id='home' className='py-5'>
            <Jumbotron>
                <Row>
                    <Col lg={7}>
                        <Title>
                            Hi, I'm Inyoung Choi.
                        </Title>
                        <Content className='pe-3 pt-5 pb-5'>
                            안녕하세요. 프론트엔드 & 벡엔드 풀스택 개발자입니다. <br />
                            <Link href="#portfolio" className=' rounded-pill mt-5'
                                style={isHover ? {background : "purple", color: "#fff"} : {}}
                                onMouseOut={handleMouseOut}
                                onMouseOver={handleMouseOver}
                            > 
                                <FaArrowCircleDown className='me-2 mb-1'/>
                                Go Portfolio
                            </Link>
                        </Content>
                    </Col>
                    <Col lg={5}>
                        <MyImg src="images/home/me.jpg" alt='me'/>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
        </>
        
        
    );
};

export default Home;