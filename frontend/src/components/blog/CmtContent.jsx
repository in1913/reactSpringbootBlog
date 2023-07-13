import React, {useState} from 'react';
import {Button, Col} from "react-bootstrap";
import {RxDotsVertical} from "react-icons/rx";
import {HiOutlinePencil, HiOutlineTrash} from "react-icons/hi";
import styled from "styled-components";

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
const CmtContent = ({comments}) => {
    // util 버튼 toggle
    const [isUtil, setIsUtil] = useState(false);
    const handleUtilButton = () => {
        setIsUtil(!isUtil);
    };

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
                <span>
                    <span className="text-secondary me-2">{showDate}</span>
                    <span className="position-relative">
                        <Button onClick={handleUtilButton} className="p-0 bg-transparent text-black border-0"><RxDotsVertical style={{marginBottom : "6px"}}/></Button>
                        {
                            isUtil ?
                                (<Util className='border bg-white rounded'>
                                    <ul>
                                        <li><UtilButton className='text-secondary'><span>수정하기</span><HiOutlinePencil/></UtilButton></li>
                                        <li><UtilButton className='text-danger'><span>삭제하기</span><HiOutlineTrash/></UtilButton></li>
                                    </ul>
                                </Util>)
                                :
                                (<></>)
                        }

                    </span>
                </span>
            </div>
            <div className="rounded bg-secondary-subtle p-2 text-secondary text-break">
                {comments["content"]}
            </div>

        </Col>
    );
};

export default CmtContent;