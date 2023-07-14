import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BlogsContent from '../../components/blog/BlogsContent';
import {ImPencil} from 'react-icons/im';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [blogList, setBlogList] = useState([]);

    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        const sessionData = async () => {
            const response = await axios.get('/api/session');
            if(response.data === ""){
                setIsLogin(false);
            }else{
                setIsLogin(true);
            }
        };
        sessionData();
    }, []);

    useEffect(() => {
        const getBloglist = async () => {
            const response = await axios.get('/api/bloglist');
            setBlogList(response.data);
        };
        getBloglist();
    }, []);

    return (
        <Container className='my-5'>
            <Row>
                {
                    blogList.map((list) => (
                        <Col lg={4} md={6} sm={12} className='p-4' key={list.blog_num}>
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
            <Row>
                {
                    isLogin ? 
                    (<Col xs={12} className='text-end'>
                        <Link to="write" className='text-white text-decoration-none px-3 p-2 rounded-pill bg-secondary border-0'><ImPencil className='me-2'/>글쓰기</Link>
                    </Col>)
                    :
                    (<Col xs={12}></Col>)
                }
                
            </Row>
        </Container>
    );
};

export default Blogs;