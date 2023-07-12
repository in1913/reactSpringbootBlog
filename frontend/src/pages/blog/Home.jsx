import React, {useState, useEffect} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import {RiSearchLine} from 'react-icons/ri';
import { RiUserFill } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import axios from 'axios';

const MyImgBox = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content:center;
    align-items: center;
`
const MyImg = styled.img`
    max-width: 400px;
    max-height: 400px;
    object-fit: cover;
`
const Title = styled.h1`
    text-align: center;
    font-weight: 900;
    font-style: italic;
    font-size: 30px;

    &:first-letter{
        text-transform: uppercase;
    }
`
const SubTitle = styled.h2`
    text-align: center;
    font-weight: 300;
    font-size: 20px;
`
const Category = styled.p`

    &:first-letter{
        text-transform: uppercase;
    }

`
const Home = () => {
    // 블로그 데이터 가져오기
    const [blog, setBlog] = useState([{}]);

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const blogData = async () => {
            const response = await axios.get('/api/blogmanage');
            if(response.data === ""){
            }else{
                setBlog(response.data);
                const classification = response.data[0]["classification"] && response.data[0]["classification"].split(",");
                setCategoryList(classification || []);
            }
        };
        blogData();
    }, []);
    return (
        <>
            <Container style={{paddingTop: "120px"}}>
                <MyImgBox>
                    {
                        blog[0]["photo_url"] === undefined || blog[0]["photo_url"] === null ?
                        (<RiUserFill size={400} style={{background: "#ccc", marginTop: "45px"}}/>) 
                        :
                        (<MyImg src={blog[0]["photo_url"]} alt="me"/>)
                    }
                </MyImgBox>
                <Title className='mt-3'>
                    {blog[0]["blog_owner_name"]}
                </Title>
                <SubTitle className='mt-3'>
                    Welcome to my Blog!
                </SubTitle>
                <div className='d-flex justify-content-center'>
                    <div> 
                        <input placeholder='search' spellCheck="false" style={{background: "transparent", borderBottom: "2px solid #000", fontSize: "15px", width: "250px"}} className='py-1 px-2 mt-5 ms-1' />
                        <a href="/" className='text-dark'><RiSearchLine size={25}/></a>
                    </div>
                </div>
                <Row className='text-center mt-5'>
                    {
                        categoryList.map((a, index) => (
                            <Col key={index}>
                                <Link className='text-decoration-none'>
                                    <Category className='category-hover text-black rounded-pill py-2'>
                                    {a}
                                    </Category>
                                </Link>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    );
};

export default Home;