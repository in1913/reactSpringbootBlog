import React, {useState, useEffect} from 'react';
import Header from '../../components/blog/Header';
import TextEditor from '../../components/blog/TextEditor';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Tag from '../../components/blog/Tag';
import axios from 'axios';
import Footer from '../../components/main/Footer';
import {useParams} from "react-router-dom";
import blog from "../main/Blog";

const MyInput = styled.input`
    background: transparent;
    padding: 7px 10px;
    font-weight: 600;
    font-size: 25px;
`
const Class = styled.div`
    position: absolute;
    top: 40px;
    right: 0;
    padding: 2%;
    background: #fff;
    z-index: 100000000;
    width: 270px;
`
const ClassTitle = styled.h6`
    font-size: 12px;
    font-weight: 600;
`
const Tagbox = styled.div`
    overflow-x: auto;
`
const MyTagInput = styled.input`
    font-size: 14px;
    padding: 5px 10px;
    color: #333;
    overflow: hidden;

    &::placeholder{
        font-size: 14px;
    }
`

const Modify = () => {
    const {num} = useParams();
    document.body.style = 'background: #f5f7fb;';

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
                window.location.href = "/blog";
            }else{
                setIsLogin(true);
                setSession(response.data);
            }
        };
        sessionData();


        const blogData = async () => {
            const response2 = await axios.get(`/api/blog/${num}`);
            if(response2.data !== ""){
                setTitle(response2.data[1].title);
                setContent(response2.data[1].content);
                setTags(response2.data[1].tags.split(","));
                setClassification(response2.data[1].classification);
            }
        };
        blogData();

    }, []);


    // 태그 만들기
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const handleRemoveTag = (removedTag) => {
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);
    }
    const handleKeyPress = (e) => {
        if(e.key ==='Enter' && text.trim() !== ""){
            setTags([...tags, text]);
            setText("");
        }
    }

    // 완료버튼 누르면 class 컴포넌트 보이기
    const [isWrite, setIsWrite] = useState(false);
    document.addEventListener("click", function(e){
        if(e.target.closest(".write-class") !== null || e.target.classList.contains("write-btn") || e.target.classList.contains("close-btn")){
        }else{
            handleWriteOver();
        }
        
    })    
    const handleWriteOn = () => {
        setIsWrite(true);
    }
    const handleWriteOver = () => {
        setIsWrite(false);
    }

    //호버
    const [isHover, setIsHover] = useState(false);
    const handleHoverOver = () => {
        setIsHover(true);
    }
    const handleHoverOut = () => {
        setIsHover(false);
    }
    

    // 비동기로 글쓰기 보내기
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [classification, setClassification] = useState("");

    const handleSubmit = async () => {
        await axios.post(`/api/modify`,{
            blog_num : num,
            classification: classification, 
            title: title, 
            content: content, 
            tags: tags.join(',')})
        window.location.href = `/blog/${num}`;
    }

    
    return (
        <>
            <Container style={{paddingTop: "70px"}}>
                <Header session={session} isLogin={isLogin} setIsLogin={setIsLogin}/>
                    <Row>
                        <Col xs={12} className='text-end'>
                            <div style={{position :"relative"}}>
                                <Button 
                                    className='bg-info border-0 px-3 py-1 write-btn'
                                    onClick={handleWriteOn}
                                >완료</Button>
                                {
                                    isWrite ? 
                                    (<Class className='border rounded text-start write-class'>
                                    <Row>
                                        <Col lg={12} md={12} className='mb-3'>
                                            <ClassTitle>분류</ClassTitle>
                                            <Form.Select defaultValue={classification} onChange={(e) => {setClassification(e.target.value)}}>
                                                <option value="server">Server</option>
                                                <option value="frontend">FrontEnd</option>
                                                <option value="backend">BackEnd</option>
                                                <option value="coding">Coding</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={12} md={12} className='mb-3'>
                                            <ClassTitle>태그</ClassTitle>
                                            <Tagbox className='border rounded'>
                                            <MyTagInput 
                                                className='border-0 rounded w-100' 
                                                type='text' 
                                                placeholder='#태그 입력' 
                                                value={text}
                                                onChange={(e) => {setText(e.target.value)}}
                                                onKeyPress={handleKeyPress}
                                            />
                                            <div className='d-flex flex-wrap'>
                                                {
                                                    tags.map((tags, index) => (
                                                        <Tag
                                                            tags={tags}
                                                            key={index}
                                                            onRemove={handleRemoveTag}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </Tagbox>
                                        </Col>
                                        <Col lg={12} className='text-end'>
                                            <Button 
                                            onClick={handleSubmit}
                                            onMouseOut={handleHoverOut}
                                            onMouseOver={handleHoverOver}
                                            className={isHover ? 'px-3 py-1 border-info bg-info text-white' : 'px-3 py-1 border-info bg-white text-info'}>완료</Button>
                                        </Col>
                                    </Row>
                                </Class>) 
                                    : 
                                    (<></>)
                                }
                                
                            </div>
                        </Col>
                        <Col xs={12} className='text-center my-4'>
                            <MyInput className='w-50 text-center write-title' type='text' placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Col>
                        <Col xs={12} style={{height: "750px"}}>
                            <TextEditor
                                value={content} onChange={(value) => setContent(value)}/>
                        </Col>
                    </Row>
                
            </Container>
            <Footer/>
        </>
    );
};

export default Modify;