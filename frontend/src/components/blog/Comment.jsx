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

const Comment = ({num, sessionEmail, sessionNickname}) => {
    // 댓글 정보 GET
    const [commentCnt, setCommentCnt] = useState(0);
    const [comments, setComments] = useState([{}]);


    // 댓글 전부 가져오기
    useEffect(() => {
        const commentData = async () => {
            const response = await axios.get(`/api/blog/comment/${num}`);
            setCommentCnt(response.data.length);
            setComments(response.data);
        }
        commentData();

    }, [num]);

    // 댓글 작성 POST
    const [content, setContent] = useState('');


    const handlePostComment = async () => {
        if(sessionEmail === null){
            alert("로그인이 필요한 서비스입니다.");
        }else{
            const response = await axios.post(`/api/blog/comment/write/${num}`,{
                mememail : sessionEmail,
                nickname : sessionNickname,
                content : content
            });

            if(response.data === ""){

            }else{
                setContent("");
                setComments(response.data);
                setCommentCnt(response.data.length);
            }
        }


    };

    return (
        <>
            <CountComment className='mb-3'>{commentCnt}개의 댓글</CountComment>
            {
                comments.map((list, index) => (
                    <CmtContent key={index}
                        setComments={setComments}
                        setCommentCnt={setCommentCnt}
                        comments={list}
                        sessionEmail={sessionEmail}
                    />
                ))
            }
            <Col xs={12}>
                <Textarea className='border rounded w-100 p-2'  placeholder='댓글을 작성해주세요.' onChange={(e) => setContent(e.target.value)} value={content}/>
                <div className='text-end my-3'>
                    <Button onClick={handlePostComment} className='bg-info border-0'>댓글 작성</Button>
                </div>
            </Col>
        </>
    );
};

export default Comment;