import React, {useState} from 'react';
import {Button, Col} from "react-bootstrap";
import {RxDotsVertical} from "react-icons/rx";
import {HiOutlinePencil, HiOutlineTrash} from "react-icons/hi";
import styled from "styled-components";
import axios from "axios";

const Util = styled.div`
  position: absolute;
  background: #fff;
  z-index: 10000;
  width: 100px;
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
const UtilButton = styled.button`
    width: 100%;
    border: none;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
`
const CmtContent = ({comments, setComments, sessionEmail, setCommentCnt}) => {
    // util 버튼 toggle
    const [isUtil, setIsUtil] = useState(false);
    // 수정 버튼
    const [isModify, setIsModify] = useState(false);
    const handleUtilButton = () => {
        setIsUtil(!isUtil);
    };

    // 댓글 수정 버튼
    const handleUpdateCmt = () => {
        setIsModify(true);
    }

    // 댓글 수정 취소
    const handleCancelUpdate = () => {
        setIsModify(false);
        setIsUtil(false);
    }
    // 댓글 삭제
    const handleDeleteCmt = async () => {
        const ques = window.confirm("정말로 삭제하시겠습니까?");
        if(ques) {
            const response = await axios.get(`/api/blog/comment/delete/${comments["blogDto"]["blog_num"]}/${comments["cmt_num"]}`)
            if(response.data !== ""){
                setComments(response.data);
                setIsUtil(false);
                setCommentCnt(response.data.length);
            }
        }
    }

    const [content, setContent] = useState("");
    // 댓글 수정 등록
    const handleUpdate = async () => {
        const response = await axios.post(`/api/blog/comment/update`, {
            cmt_num : comments["cmt_num"],
            blogDto : {blog_num : comments["blogDto"]["blog_num"]},
            content : content
        });
        if(response.data !== ""){
            setComments(response.data);
            setIsModify(false);
            setIsUtil(false);
        }

    }

    // 날짜 변환 하기
    const rawDbDate = new Date(comments["createdTime"]);
    const year = rawDbDate.getFullYear();
    const month = rawDbDate.getMonth() + 1;
    const day = rawDbDate.getDate();
    const hours = rawDbDate.getHours().toString().padStart(2, '0');
    const minutes = rawDbDate.getMinutes().toString().padStart(2, '0');

    const dbTime = `${hours}:${minutes}`;
    const dbDate = `${year}.${month}.${day}.`;
    const todayDate = new Date().toLocaleString().substring(0, 12).replaceAll(" ", "");

    let showDate = "";
    if(dbDate === todayDate){
        showDate = dbTime;
    }else{
        showDate = dbDate;
    }

    return (
        <Col xs={12} className="py-3">
            <div className="d-flex justify-content-between mb-1">
                <span><strong className="text-secondary fs-5">{comments["nickname"]}</strong> 님</span>
                {
                    isModify ?
                        (<div className="text-end">
                            <Button onClick={handleCancelUpdate} className="me-4 bg-transparent border-0 text-secondary p-0" style={{fontSize: "15px"}}>취소</Button>
                            <Button onClick={handleUpdate} className="me-2 bg-transparent border-0 text-secondary p-0" style={{fontSize: "15px"}}>등록</Button>
                        </div>)
                        :
                        (<span>
                    <span className="text-secondary me-2">{showDate}</span>
                            {
                                sessionEmail !== comments["mememail"] ?
                                    (<></>)
                                    :
                                    (
                                        <span className="position-relative">
                        <Button onClick={handleUtilButton} className="p-0 bg-transparent text-black border-0"><RxDotsVertical style={{marginBottom : "6px"}}/></Button>
                                            {
                                                isUtil ?
                                                    (<Util className='border bg-white rounded'>
                                                        <ul>
                                                            <li><UtilButton onClick={handleUpdateCmt} className='text-secondary'><span>수정하기</span><HiOutlinePencil/></UtilButton></li>
                                                            <li><UtilButton onClick={handleDeleteCmt} className='text-danger'><span>삭제하기</span><HiOutlineTrash/></UtilButton></li>
                                                        </ul>
                                                    </Util>)
                                                    :
                                                    (<></>)
                                            }

                        </span>
                                    )
                            }

                </span>)
                }

            </div>
            {
                isModify ?
                    (<textarea
                        onChange={(e) => setContent(e.target.value)}
                        className="w-100 rounded border p-2"
                        style={{resize: "none", height: "100px"}}
                        name="" id="" cols="30" rows="10"
                        defaultValue={comments["content"]}></textarea>)
                    :
                    (<div className="rounded bg-secondary-subtle p-2 text-secondary text-break">
                        {comments["content"]}
                    </div>)
            }




        </Col>
    );
};

export default CmtContent;