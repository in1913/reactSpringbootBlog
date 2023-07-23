import React from 'react';
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {BiSolidQuoteLeft, BiSolidQuoteRight} from 'react-icons/bi';
const MyImg = styled.img`
  
`
const Home = () => {
    return (
        <div id="Home">
            <Row className="p-5">
                <h1 style={{fontSize: "40px", fontStyle: "italic"}} className="mb-4 text-white"># Produce</h1>
                <Col
                    lg={5} md={6}
                     className="bg-white pt-5 d-flex justify-content-center align-items-center">
                    <img src="/images/mimoticon/flower.png" alt="test"/>
                </Col>
                <Col lg={7} md={6} className="bg-dark p-5 text-white" style={{fontSize: "20px"}}>
                    <div style={{fontSize: "24px"}} className="d-flex">
                        <div>
                            <BiSolidQuoteLeft className="mb-4 me-2"/>
                        </div>
                        <div>
                            안녕하세요. <br/> 수학을 전공했고 꼼꼼함을 갖춘 자바 웹 백엔드 개발자
                            <strong className="text-success" style={{fontSize: "24px"}}> 최인영</strong>
                            입니다.
                        </div>
                        <div>
                            <BiSolidQuoteRight  className="mt-4 ms-2"/>
                        </div>
                    </div>

                    <br/>
                    <br/>
                    전자제품을 매우 좋아하는 사람으로서 새로운 기술이 나오면 그것을 배우고 활용하고 적용하는 것을 좋아합니다.
                    덕분에 저는 집에서 홈 네트워크, 서버, 리눅스, DOCKER 등등 많은 것을 알게 되었습니다.
                    <br/>
                    <br/>
                    홈 네트워크를 구축하면서 수많은 GitHub 문서들을 보았고 언제부턴가 "나도 그들처럼 되고 싶다",
                    "나도 코딩을 하고 싶다"는 생각을 하게 되었습니다.
                    <br/>
                    <br/>
                    그리고 이제 그 첫 걸음을 시작하려 합니다.
                </Col>
            </Row>


        </div>
    );
};

export default Home;