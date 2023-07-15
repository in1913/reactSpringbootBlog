import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';


const PortfolioManage = () => {
    // 이미지 리스트 useState
    const [updateImgList, setUpdateImgList] = useState([]);



    // 사진 편집 드래그 하면 사진 업로드
    const handleDragPhoto = async (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

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

    const handleDeletePhoto = (url) => {
        const updateDelImgList = updateImgList.filter((x) => x !== url);
        setUpdateImgList(updateDelImgList);
    }
    return (
        <Container className="pb-5">
            <h2 className="pb-3">포트폴리오</h2>
            <Row >
                <div className="position-relative">
                    {/* 이미지 업로드 */}
                    <button onClick={handleClickInput} onDrop={handleDragPhoto} onDragOver={(e) => e.preventDefault()} className=" border-0 bg-secondary-subtle rounded w-100" style={{height: "500px", textAlign : "start"}}>
                        <div className="h-100">
                            {
                                updateImgList.length === 0 ?
                                    (<p className="text-secondary text-center" style={{lineHeight: "500px"}}>여기를 클릭하거나 이미지를 드래그하세요.</p>)
                                    :
                                    (<></>)
                            }
                        </div>
                    </button>
                    <div onDrop={handleDragPhoto} onDragOver={(e) => e.preventDefault()} className="position-absolute overflow-x-auto" style={{top : "0px", padding : "10px 0px", maxWidth : "calc(100% - 25px"}}>
                        <div style={{width: "max-content"}}>
                            {
                                updateImgList.length !== 0 ?
                                    (<>
                                        {
                                            updateImgList.map((url, index) => (
                                                <div onClick={(e) => e.preventDefault()} key={index} className="me-0 overflow-hidden rounded border-black d-inline-block position-relative ms-2" style={{zIndex : "999"}}>
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
                </div>
            </Row>
        </Container>
    );
};

export default PortfolioManage;