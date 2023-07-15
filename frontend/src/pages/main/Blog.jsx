import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import BlogsContent from '../../components/blog/BlogsContent';
import {FaArrowCircleRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Title = styled.h1`
    font-weight: 600;
    font-size: 50px;
    text-align: center;
`
const Subtitle = styled.h2`
    font-weight: 400;
    font-size: 20px;
    text-align: center;
`
const Blog = () => {
    const [isHover, setIsHover] = useState(false);
    const handleHoverOut = () => {
        setIsHover(false);
    }
    const handleHoverOver = () => {
        setIsHover(true);
    }

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        const getBloglist = async () => {
            const response = await axios.get('/api/bloglist');
            setBlogList(response.data);
        };
        getBloglist();
    }, []);

    
    return (
        <Container className='py-5 my-5' id='blog'>
            <Title className='my-5'>
                Blog
            </Title>
            <Subtitle>
                코딩을 하며 발견한 에러, 꿀팁, 인상 깊은 코드를 리뷰하는 블로그입니다. <br />
            </Subtitle>
            <Row className='mt-5'>
                {
                    blogList.slice(0, 6).map((list) => (
                    <Col lg={4} md={6} sm={12} className='mb-4' key={list.blog_num}>
                        <BlogsContent
                        num={list.blog_num}
                        classification={list.classification}
                        title={list.title}
                        content={list.content}
                        createdTime={list.createdTime}
                        mememail={list.mememail}
                        hits={list.hits}
                        updatedTime={list.updatedTime}
                        tags={list.tags}
                        />
                    </Col>
                    ))
                }
                
                
            </Row>  
            <Link 
                to="blog" 
                onMouseOver={handleHoverOver} 
                onMouseOut={handleHoverOut}
                className={isHover ? "go-blog-btn bg-dark text-white ms-auto rounded-pill p-2 me-3" : "go-blog-btn ms-auto rounded-pill p-2 me-3"}
            >더보기 <FaArrowCircleRight className='mb-1 ms-1'/></Link>
            
            
        </Container>
    );
};

export default Blog;