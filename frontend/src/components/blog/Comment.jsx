import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import CmtContent from "./CmtContent";

const CountComment = styled.span`
    font-weight: bold;
    font-size: 20px;
`
const Textarea = styled.textarea`
    height: 100px;
    resize: none;
`
const MyInput = styled.input`
    width: 100%;
`

const Comment = ({num}) => {
    // 댓글 정보 GET
    const [commentCnt, setCommentCnt] = useState(0);
    const [comments, setComments] = useState([{}]);


    // 댓글 전부 가져오기
    useEffect(() => {
        const commentData = async () => {
            const response = await axios.get(`/api/blog/comment/${num}`);
            console.log(response.data);
            setCommentCnt(response.data.length);
            setComments(response.data);
        }
        commentData();

    }, [num]);

    // 댓글 작성 POST
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [commentemail, setCommentemail] = useState('');

    const [content, setContent] = useState('');


    const handlePostComment = async () => {
        const response = await axios.post(`/api/blog/comment/write/${num}`,{
            nickname : nickname,
            commentemail : commentemail,
            content : content,
            password : password
        });

        if(response.data === ""){

        }else{
            setNickname("");
            setPassword("");
            setCommentemail("");
            setContent("");
            setComments(response.data);
            setCommentCnt(response.data.length);
        }
    };

    return (
        <>
            <CountComment className='mb-3'>{commentCnt}개의 댓글</CountComment>
            {
                comments.map((list, index) => (
                    <CmtContent key={index}
                        comments={list}
                    />
                ))
            }
            <Col xs={12}>
                <Row>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                        <div className='mb-1 text-secondary'>닉네임</div>
                        <MyInput className='rounded border p-2' type='text' placeholder='닉네임' onChange={(e) => setNickname(e.target.value)} value={nickname}/>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-3">
                        <div className='mb-1 text-secondary'>비밀번호</div>
                        <MyInput className='rounded border p-2' type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </Col>
                    <Col xs={12} className="mb-3">
                        <div className='mb-1 text-secondary'>이메일</div>
                        <MyInput className='rounded border p-2' type='email' placeholder='이메일' onChange={(e) => setCommentemail(e.target.value)} value={commentemail}/>
                    </Col>

                </Row>
                <Textarea className='border rounded w-100 p-2'  placeholder='댓글을 작성해주세요.' onChange={(e) => setContent(e.target.value)} value={content}/>
                <div className='text-end my-3'>
                    <Button onClick={handlePostComment} className='bg-info border-0'>댓글 작성</Button>
                </div>
            </Col>
        </>
    );
};

export default Comment;