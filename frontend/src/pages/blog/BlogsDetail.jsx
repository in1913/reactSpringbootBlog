import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import Header from '../../components/blog/Header';
import {RxDotsVertical} from 'react-icons/rx';
import {HiOutlinePencil, HiOutlineTrash} from 'react-icons/hi';
import Colors from '../../assets/CategoryColor';
import Comment from '../../components/blog/Comment';
import Footer from '../../components/main/Footer';

const Category = styled.div`
    color: #fff;
    font-weight: 300;
    padding: 5px 10px;
    display: inline-block;

    &:first-letter{
        text-transform: uppercase;
    }
`
const Title = styled.h1`

`
const MyImgBox = styled.span`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display:flex;
    justify-content: center;
    align-items: center;
`
const MyImg = styled.img`
    max-width: 75px;
    max-height: 75px;
`
const MemName = styled.span`
    color: #333;
    font-size: 18px;
`
const CreatDate = styled.span`
    color: #888888;
    font-weight: 300;
`
const Button = styled.button`
    border: none;
    background: transparent;
`
const Util = styled.div`
    position: absolute;
    background: #fff;
    z-index: 10000;
    width: 150px;
    right: 0;

    &>ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &>ul>li:first-child{
        border-bottom: 1px solid #ccc;
    }
`
const Tags = styled.span`
    background : #cecece;
    display: inline-block;
    font-size: 14px;
    color: #333;

`
const UtilButton = styled.button`
    width: 100%;
    border: none;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`
const BlogsDetail = () => {

    // 로그인 세션 받아오기
    const [sessionEmail, setSessionEmail] = useState(null);
    const [sessionNickname, setSessionNickname] = useState(null);



    useEffect(() => {
        const sessionData = async () => {
            const response = await axios.get('/api/session');
            if(response.data === ""){
                setSessionEmail(null);
                setSessionNickname(null);
            }else{
                setSessionEmail(response.data[0].mememail);
                setSessionNickname(response.data[0].nickname);
            }
        };
        sessionData();
    }, []);


    document.body.style = "background: #f5f5f5;";
    let {num} = useParams();

    // util 버튼 toggle
    const [isUtil, setIsUtil] = useState(false);
    const handleUtilButton = () => {
        setIsUtil(!isUtil);
    };

    // 블로그 데이터 가져오기
    const [category, setCategory] = useState("");
    const [photo_url, setPhoto_url] = useState("");
    const [memname, setMemname] = useState("");
    const [mememail, setMememail] = useState("");
    const [createdTime, setCreatedTime] = useState("");
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const blogData = async () => {
            const response = await axios.get(`/api/blog/${num}`);
            if(response.data !== ""){
                setPhoto_url(response.data[0]["photo_url"]);
                setMemname(response.data[0]["memname"]);
                setCategory(response.data[1]["classification"]);
                setMememail(response.data[0]["mememail"]);

                setCreatedTime(response.data[1]["createdTime"].substring(0, 16).replace(/-/g, ".").replace("T", " "));
                if(response.data[1]["tags"] !== ""){
                    setTags(response.data[1]["tags"].split(','));
                }
                setTitle(response.data[1]["title"]);
                document.getElementById('blog-content').innerHTML = response.data[1]["content"];

            }else{
            }
        };
        blogData();
    }, [num]);

    // 블로그 삭제하기
    const handleBlogDelete = async () => {
        const ques = window.confirm("정말로 삭제하시겠습니까?");
        if(ques){
            const response = await axios.get(`/api/delete/${num}`);
            if(response.data !== ""){
                window.location.href = "/blog";
            }
        }
    }


    // 태그 뿌리기  
    let tagList = [];

    for(let tag in tags){
        tagList.push(<Tags className='px-2 py-1 rounded me-1 mb-1' key={tag}>
            # {tags[tag]}
        </Tags>)
    }


    // 카테고리 색 넣기
    const bgImg = "linear-gradient(45deg, " + Colors[0][category] + ")";
    
    return (
        <>
        <Header/>
        <Container style={{paddingTop: "120px"}}>
            <CreatDate className='me-3'>{createdTime}</CreatDate>
            <Category style={{background : bgImg}} className='rounded-pill'>
            {category}
            </Category>
            <Title className=' mt-4 mb-4' >
                {title}
            </Title>

            {/* writer info */}
            <Row>
                <Col xs={12} className='d-flex my-3 align-items-center justify-content-between'>
                    <span className='d-flex align-items-center'>
                        <MyImgBox>
                            <MyImg src={photo_url} alt='writer'/>
                        </MyImgBox>
                        <MemName className='ms-3'>{memname}</MemName>
                    </span>
                    {
                        sessionEmail !== mememail ?
                            (<></>)
                            :
                            (
                                <span className='position-relative'>
                                <Button className='mb-2' onClick={handleUtilButton}><RxDotsVertical/></Button>
                                        {
                                            isUtil ?
                                                (<Util className='border bg-white rounded'>
                                                    <ul>
                                                        <li><Link to={`/blog/modify/${num}`} className=' d-flex justify-content-between align-items-center text-secondary text-decoration-none' style={{padding: "10px"}}><span>수정하기</span><HiOutlinePencil/></Link></li>
                                                        <li><UtilButton onClick={handleBlogDelete} className='text-danger'><span>삭제하기</span><HiOutlineTrash/></UtilButton></li>
                                                    </ul>
                                                </Util>)
                                                :
                                                (<></>)
                                        }
                                </span>
                            )
                    }

                </Col>
            </Row>
            <Row>
                {/* blog content */}
                <Col xs={12} className='py-5'>
                    <div id="blog-content">
                    </div>
                </Col>
                <Col xs={12} className='py-2 px-4 mb-5'>
                    {tagList}
                </Col>
            </Row>
            <hr />
                {/* comment */}
            <Row>
                <Comment num={num} sessionEmail={sessionEmail} sessionNickname={sessionNickname}/>
            </Row>
        </Container>
        <Footer/>
        </>
    );
};

export default BlogsDetail;