import React, {useState} from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import {SiGithub} from 'react-icons/si';
import {ImEarth} from 'react-icons/im';

const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
    width: 80%;
    border-radius: 20px;
`
const Description = styled.div`
    padding: 10px 40px;
    text-align: center;
    font-weight: 300;
`
const Portfolio = styled.div`
    margin: 70px 0;
    box-shadow: 10px 10px 10px 10px rgba(0,0,0,0.3);
    padding-top: 100px;
    padding-bottom: 50px;
    border-radius: 20px;
    background: #f8f8f8;
`
const Link = styled.a`
    text-decoration: none;
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
`
const PortfolioContent = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <Portfolio>
        <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
            <Carousel.Item>
                <Img src="images/portfolio/ezencinema/01.png" alt="frist side" />
            </Carousel.Item>
            
            <Carousel.Item>
                <Img src="images/portfolio/ezencinema/02.png" alt="frist side" />
            </Carousel.Item>

            <Carousel.Item>
                <Img src="images/portfolio/ezencinema/03.png" alt="frist side" />
            </Carousel.Item>
        </Carousel>
        <Description>
            <h2 className='text-center my-5'>EzenCinema</h2>
            <p className='display-6 my-5'>영화 정보 제공 및 영화 예매 사이트</p>
            <Row className='mb-5'>
                <Col xs={6} className='text-end'>
                    <Link href="https://github.com/in1913/ezenCinema">
                        <SiGithub className='mb-1 me-1' size={20}/> GitHub
                    </Link>    
                </Col>
                <Col xs={6} className='text-start'>
                    <Link href="https://ezencinema.com">
                        <ImEarth className='mb-1 me-1' size={20}/> WebSite
                    </Link>    
                </Col>
            </Row>
            
            <hr />
            <div>
                <Row>
                    <Col lg={4} md={2} className='d-flex justify-content-center align-items-center pb-3'>
                        <h5>주요기능</h5>
                    </Col>
                    <Col lg={8} md={10} className='text-start d-flex justify-content-center align-items-center'>
                        <ul className='portfolio-li'>
                            <li>Oracle Cloud 서버에 웹사이트 실제 운영</li>
                            <li>Docker 컨테이너로 MySQL, Tomcat 서버 실행</li>
                            <li>MySQL과 연동하여 로그인, 회원가입, 프로필 수정 기능, 이미지 업로드, 영화 리뷰 등록, 영화 리뷰 좋아요 구현</li>
                            <li>MySQL을 이용하여 영화 DB 가져오기</li>
                            <li>카카오, 네이버, 구글 Oauth를 이용하여 싱크로 로그인 구현, 우편번호 검색 구현</li>
                            <li>Jsp, Java Servlet 이용하여 톰캣 서버 구성</li>
                            <li>Oracle Cloud 발신 전용 전자 메일 구성</li>
                            <li>Java로 메일 인증 코드 전송 및 JavaScript로 인증 구현</li>
                            <li>Docker 컨테이너 Nginx Proxy Manager를 이용하여 프록시,  SSL 연결 (HTTPS)</li>
                        </ul>
                    </Col>
                    <hr />
                    <Col lg={4} md={2} className='d-flex justify-content-center align-items-center pb-3'>
                        <h5>FrontEnd</h5>
                    </Col>
                    <Col lg={8} md={10} className='text-start d-flex justify-content-center align-items-center pb-3'>
                        HTML5, CSS
                    </Col>
                    <hr />
                    <Col lg={4} md={2} className='d-flex justify-content-center align-items-center pb-3'>
                        <h5>BackEnd</h5>
                    </Col>
                    <Col lg={8} md={10} className='text-start d-flex justify-content-center align-items-center pb-3'>
                        Java Servlet, JSP
                    </Col>
                    <hr />
                    <Col lg={4} md={2} className='d-flex justify-content-center align-items-center pb-3'>
                        <h5>Database</h5>
                    </Col>
                    <Col lg={8} md={10} className='text-start d-flex justify-content-center align-items-center pb-3'>
                        MySQL
                    </Col>
                    <hr />
                    <Col lg={4} md={2} className='d-flex justify-content-center align-items-center pb-3'>
                        <h5>Deployment</h5>
                    </Col>
                    <Col lg={8} md={10} className='text-start d-flex justify-content-center align-items-center pb-3'>
                        Oracle Cloud (Ampere A1)
                    </Col>
                    <hr />
                </Row>

            </div>
        </Description>
        </Portfolio>
    );
};

export default PortfolioContent;