import React, { useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {ko} from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const MyDatePicker = styled(DatePicker)`
  width: 100%;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
`
const PortfolioManage = () => {
    // 이미지 리스트 useState
    const [updateImgList, setUpdateImgList] = useState([]);

    // 프로젝트 날짜 useState
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    // 사진 편집 드래그 하면 사진 업로드
    const handleDragPhoto = async (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        if(files[0] !== undefined){
            const formData = new FormData();
            formData.append('image', files[0]);

            const response = await fetch('/api/upload', {
                method : "POST",
                body : formData
            });

            if(response !== null){
                const data = await response.json();
                setUpdateImgList([...updateImgList, data.url]);
            }else{
                console.error('이미지 업로드 실패');
            }
        }


    }

    // 사진 선택하면 자동으로 업로드
    const handleClickInput = async (e) => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.style.display = "none";
        document.body.appendChild(input);

        input.click();

        input.onchange = async () => {
            const file = input.files[0];

            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method : "POST",
                body : formData
            });

            if(response !== null){
                const data = await response.json();
                setUpdateImgList([...updateImgList, data.url]);
                document.body.querySelector(':scope > input').remove();
            }else{
                console.error('이미지 업로드 실패');
                document.body.querySelector(':scope > input').remove();
            }

        }
    }

    // 이미지 드래그 시작
    const handleDragStart = (e, index) => {
        // 드래그 한 항목의 index를 dataTransfer에 저장
        e.dataTransfer.setData('text/plain', index);

    }


    // 드래그 하면 스크롤 이동
    const handleDragCoordination = (e) => {
        const {clientX} = e;
        const photoBox = e.currentTarget.parentNode.parentNode;
        const photoRect = photoBox.getBoundingClientRect();

        const photoBoxWidth = photoRect.width;

        const offsetX = clientX - photoRect.left;

        if(offsetX < photoBoxWidth * 0.5){
            photoBox.scrollTo(offsetX - 1, 0);
        }
        if(offsetX > photoBoxWidth * 0.5){
            photoBox.scrollTo(offsetX + 1, 0);
        }

    }

    // 이미지 드래그 드롭하면 이미지 순서 변경
    const handleDropEnd = (e, index) => {
        e.preventDefault();
        // drop한 위치의 index를 가져오기
        const newIndex = Number(e.dataTransfer.getData('text/plain'));

        // 배열의 순서를 변경
        const updateDragImgList = [...updateImgList];
        const [removeItem] = updateDragImgList.splice(newIndex, 1);
        updateDragImgList.splice(index, 0, removeItem);

        setUpdateImgList(updateDragImgList);
    }

    // 이미지 삭제
    const handleDeletePhoto = (url) => {
        const updateDelImgList = updateImgList.filter((x) => x !== url);
        setUpdateImgList(updateDelImgList);
    }
    return (
        <Container className="pb-5">
            <h2 className="pb-3">포트폴리오</h2>
            <Row >
                <h4>Carousel</h4>
                <Col xs={12} className="position-relative pb-5">
                    {/* 초기 이미지 업로드 */}
                    <button onClick={handleClickInput} onDrop={handleDragPhoto} onDragOver={(e) => e.preventDefault()} className=" border-0 bg-secondary-subtle rounded w-100" style={{height: "500px", textAlign : "start"}}>
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            {
                                updateImgList.length === 0 ?
                                    (<p className="text-secondary text-center" >여기를 클릭하거나 이미지를 드래그하세요.</p>)
                                    :
                                    (<></>)
                            }
                        </div>
                    </button>
                    {/* 한번 이미지 업로드 된 후 박스 */}
                    <div onDrop={handleDragPhoto} onDragOver={(e) => e.preventDefault()} className="position-absolute overflow-x-auto" style={{top : "0px", padding : "10px 0px", maxWidth : "calc(100% - 25px"}}>
                        <div style={{width: "max-content"}} onDragOver={(e) => e.preventDefault()}>
                            {
                                updateImgList.length !== 0 ?
                                    (<>
                                        {
                                            updateImgList.map((url, index) => (
                                                <div
                                                    onClick={(e) => e.preventDefault()}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, index)}
                                                    onDrop={(e) => handleDropEnd(e, index)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    key={index}
                                                    className="me-0 overflow-hidden rounded border-black d-inline-block position-relative ms-2"
                                                    style={{zIndex : "999", transition : "all .3s"}}
                                                    onDrag={(e) => handleDragCoordination(e)}
                                                >
                                                    <img src={url} alt={url} style={{maxHeight : "476px", minHeight: "100px"}}/>
                                                    <button onClick={() => handleDeletePhoto(url)} className="position-absolute rounded-circle photo-del-hover" style={{top: "5px", right: "5px", padding : "0 6px", zIndex : "1000", transition: "all .3s"}}>X</button>
                                                </div>
                                            ))
                                        }
                                    </>)
                                    :
                                    (<></>)
                            }
                        </div>
                    </div>
                </Col>
                <Col xs={12}>
                    {/* 프로젝트명 */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>프로젝트명</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="프로젝트명"/>
                        </Col>
                    </Row>
                    {/* 프로젝트 기간 */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>프로젝트 기간</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <Row>
                                <Col lg={6} className="d-flex pb-2">

                                    <div className="border h-100 px-2 pt-2 text-secondary" style={{borderRadius : "0.375rem", borderTopRightRadius: "0", borderBottomRightRadius : "0"}}>시작일</div>
                                    <MyDatePicker
                                        isClearable
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        endDate={endDate}
                                        locale={ko}
                                        dateFormat="yyyy.MM.dd"
                                        type="text"
                                        className="border px-2 py-1"
                                        placeholderText="프로젝트 시작 날짜를 선택해주세요."/>
                                </Col>
                                <Col lg={6} className="d-flex pb-2">
                                    <div className="border h-100 px-2 pt-2 text-secondary" style={{borderRadius : "0.375rem", borderTopRightRadius: "0", borderBottomRightRadius : "0"}}>종료일</div>
                                    <MyDatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        minDate={startDate}
                                        locale={ko}
                                        dateFormat="yyyy.MM.dd"
                                        type="text"
                                        className="border px-2 py-1"
                                        placeholderText="프로젝트 시작 날짜를 선택해주세요."/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* 프로젝트 참여 인원 */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>프로젝트 참여 인원</h4>
                        </Col>
                        <Col lg={8} md={12} className="d-flex">
                            <input type="number" className="border px-2 py-1" placeholder="숫지만 입력해주세요." style={{borderRadius : "0.375rem", borderTopRightRadius: "0", borderBottomRightRadius : "0"}}/>
                            <div className="border h-100 px-2 pt-2 text-secondary" style={{borderTopRightRadius: "0.375rem", borderBottomRightRadius : "0.375rem"}}>명</div>
                        </Col>
                    </Row>
                    {/* 요약 */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>요약</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="최대한 짧게 써주세요."/>
                        </Col>
                    </Row>
                    {/* GitHub */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>Github 주소</h4>
                        </Col>
                        <Col lg={8} md={12} className="d-flex">
                            <div className="border h-100 px-2 pt-2 text-secondary" style={{borderRadius : "0.375rem", borderTopRightRadius: "0", borderBottomRightRadius : "0"}}>https://</div>
                            <input type="text" className="border w-100 px-2 py-1"style={{borderRadius : "0.375rem", borderTopLeftRadius: "0", borderBottomLeftRadius : "0"}} placeholder="github.com/yourID/yourRepository"/>
                        </Col>
                    </Row>
                    {/* WebSite */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>WebSite 주소</h4>
                        </Col>
                        <Col lg={8} md={12} className="d-flex">
                            <div className="border h-100 px-2 pt-2 text-secondary" style={{borderRadius : "0.375rem", borderTopRightRadius: "0", borderBottomRightRadius : "0"}}>https://</div>
                            <input type="text" className="border w-100 px-2 py-1"style={{borderRadius : "0.375rem", borderTopLeftRadius: "0", borderBottomLeftRadius : "0"}} placeholder="yourDomain.com"/>
                        </Col>
                    </Row>
                    {/* 주요기능 */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>주요기능</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <Row>
                                <Col lg={10} className="pb-2">
                                    <input type="text" className="border rounded w-100 px-2 py-1" placeholder="주요기능을 한줄씩 추가해주세요."/>
                                </Col>
                                <Col lg={2} className="d-flex justify-content-end pb-2">
                                    <Button className="me-2 border-0" style={{whiteSpace: "nowrap"}}>추가</Button>
                                    <Button className="bg-danger border-0" style={{whiteSpace: "nowrap"}}>삭제</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* FrontEnd */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>FrontEnd</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="프론트엔드 스택을 써주세요."/>
                        </Col>
                    </Row>
                    {/* BackEnd */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>BackEnd</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="백엔드 스택을 써주세요."/>
                        </Col>
                    </Row>
                    {/* Database */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>Database</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="데이터베이스 스택을 써주세요."/>
                        </Col>
                    </Row>
                    {/* Deployment */}
                    <Row className="pb-3">
                        <Col lg={4} md={12}>
                            <h4>Deployment</h4>
                        </Col>
                        <Col lg={8} md={12}>
                            <input type="text" className="border rounded w-100 px-2 py-1" placeholder="배포환경을 써주세요."/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioManage;