import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { RiUserFill } from 'react-icons/ri';
import axios from 'axios';
const MyImgBox = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 0 auto;
    background: #ccc;
`
const MyImg = styled.img`
    max-width: 400px;
    max-height: 400px;
    object-fit: cover;
`
const MyInfo = styled.div`
`
const Title = styled.h5`
    line-height: 45px;
`
const Edit = styled.button`
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    border: none;
    width: 100%;
    color: white;
    font-size: 14px;
    height: 30px;
`
const Content = styled.p`
    font-size: 15px;
    font-weight: 300;
    line-height: 45px;
`
const MyInput = styled.input`
    padding: 7px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 200px;
    margin-top: 5px;

    &::placeholder{
        font-size: 14px;
    }
`
const Home = ({session}) => {
    if(session === null){
        session = [{}];
    }


    // 수정 버튼 클릭 토글
    const [isModi, setIsModi] = useState(false);
    const handleIsModi = () => {
        setIsModi(true);
    }

    // 사진 편집 버튼 누르면 input file 실행
    const PhotoModi = () => {
        const upload = document.getElementById("photo-upload");
        upload.click();
    }    

    // 사진 선택하면 자동으로 업로드 
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('image', file);

        
        const response = await fetch('/api/upload', {
            method : "POST",
            body : formData
        });

        if(response !== null){
            const data = await response.json();
            setPhoto_url(data.url);
            document.getElementById("myimgbox").innerHTML = `<img src=${data.url} alt="me" style="max-width: 400px; max-height: 400px; object-fit: cover;" id="uploadimg"/>`
        }else{
            console.error('이미지 업로드 실패');
        }
    }
    // 비동기로 값보내기
    const [memname, setMemname] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [education, setEducation] = useState('');
    const [photo_url, setPhoto_url] = useState('');
    const [mempass, setMempass] = useState('');


    const handleIsNotModi = async () => {
        setIsModi(false);

        const response = await axios.post('/api/update', {
            num : session[0]["num"],
            mememail : session[0]["mememail"],
            nickname : nickname,
            memname : memname,
            birth : birth,
            address : address,
            tel : tel,
            education : education,
            mempass : mempass,
            photo_url : photo_url
        })

        if(response.data === ""){
            console.log("실패");
        }else{
            window.location.reload();
        }
    }

    let mempasslen = "";
    // 비밀번호 길이만큼 *
    for(let i in session[0]["mempass"]){
        mempasslen += "*";
    }

    return (
        <>
            <Container style={{paddingTop : "120px"}} className='pb-5'>
                <h1>개인정보</h1>
                <Row className='my-3'>
                    
                    <Col lg={4} md={6} sm={12} className='mb-3 mt-4'>
                        <MyImgBox>
                            <MyImgBox id='myimgbox'>
                            {
                                session[0]["photo_url"] === undefined || session[0]["photo_url"] === null ? 
                                (<RiUserFill size={400} style={{background: "#ccc", marginTop: "45px"}}/>)
                                :
                                (<MyImg src={session[0]["photo_url"]} alt="me"/>)
                            }
                            </MyImgBox>
                            <input type="file" style={{display : "none"}} id='photo-upload' accept='image/*' onChange={handleImageUpload}/>
                            {
                                isModi ? 
                                (<Edit onClick={PhotoModi}>편집</Edit>)
                                :
                                (<></>)
                            }
                            
                        </MyImgBox>
                    </Col>
                    <Col lg={8} md={6} sm={12} className='mt-1 ps-4 pe-4'>
                        <MyInfo>
                            {/* 이름 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>이름</Title>
                                </Col>
                                <Col xs={8}>
                                    {isModi ? 
                                    (
                                        <MyInput defaultValue={session[0]["memname"] === null ? "" : session[0]["memname"]} type='text' onChange={(e) => setMemname(e.target.value)}  placeholder='이름' spellCheck="false"/>
                                    ): 
                                    (
                                        <Content>{session[0]["memname"]}</Content>
                                    )}
                                </Col>
                                
                            </Row>
                            {/* 닉네임 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>닉네임</Title>
                                </Col>
                                <Col xs={8}>
                                    {isModi ?
                                        (
                                            <MyInput defaultValue={session[0]["nickname"] === null ? "" : session[0]["nickname"]} type='text' onChange={(e) => setNickname(e.target.value)}  placeholder='닉네임' spellCheck="false"/>
                                        ):
                                        (
                                            <Content>{session[0]["nickname"]}</Content>
                                        )}
                                </Col>

                            </Row>
                            {/* 생년월일 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>생년월일</Title>
                                </Col>
                                <Col xs={8}>
                                {isModi ? 
                                    (
                                        <MyInput defaultValue={session[0]["birth"] === null ? "" : session[0]["birth"]} type='text' onChange={(e) => setBirth(e.target.value)} placeholder='0000.00.00' spellCheck="false"/>
                                    ): 
                                    (
                                        <Content>{session[0]["birth"]}</Content>
                                    )}
                                </Col>
                                
                            </Row>
                            {/* 이메일 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>이메일</Title>
                                </Col>
                                <Col xs={8}>
                                    <Content>{session[0]["mememail"]}</Content>
                                </Col>
                                
                            </Row>

                            {/* 비밀번호 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>비밀번호</Title>
                                </Col>
                                <Col xs={8}>
                                { isModi ? 
                                    (
                                        <MyInput defaultValue="" type='password' onChange={(e) => setMempass(e.target.value)}  spellCheck="false"/>
                                    )
                                    :
                                    (
                                        <Content>{mempasslen}</Content>
                                    )}
                                </Col>
                                
                            </Row>
                            
                            {/* 주소 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>주소</Title>
                                </Col>
                                <Col xs={8}>
                                    { isModi ? 
                                    (
                                        <MyInput defaultValue={session[0]["address"] === null ? "" : session[0]["address"]} type='text' onChange={(e) => setAddress(e.target.value)}  placeholder='주소' spellCheck="false"/>
                                    )
                                    :
                                    (
                                        <Content>{session[0]["address"]}</Content>
                                    )}
                                </Col>
                                
                            </Row>
                            
                            {/* 전화번호 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>전화번호</Title>
                                </Col>
                                <Col xs={8}>
                                    {isModi ? 
                                    (
                                        <MyInput defaultValue={session[0]["tel"] === null ? "" : session[0]["tel"]} type='text' onChange={(e) => setTel(e.target.value)} placeholder='숫자만 입력' spellCheck="false"/>
                                    ): 
                                    (
                                        <Content>{session[0]["tel"]}</Content>
                                    )}
                                </Col>
                                
                            </Row>
                            {/* 학력 */}
                            <Row style={{height: "45px"}}>
                                <Col xs={4}>
                                    <Title>학력</Title>
                                </Col>
                                <Col xs={8}>
                                    {isModi ? 
                                    (
                                        <MyInput defaultValue={session[0]["education"] === null ? "" : session[0]["education"]} type='text' onChange={(e) => setEducation(e.target.value)}  placeholder='00대학교 00학부(00과)' spellCheck="false"/>
                                    ): 
                                    (
                                        <Content>{session[0]["education"]}</Content>
                                    )}
                                    
                                    
                                </Col>
                            </Row>
                            {/* 수정하기 */}
                            <Row>
                                <Col xs={8}>
                                    
                                </Col>
                                <Col xs={4} className='text-end'>
                                    { isModi ? 
                                    (
                                        <Button onClick={handleIsNotModi}  className=' text-white rounded px-3'>
                                            수정 완료
                                        </Button>
                                    ):
                                    (
                                        <Button onClick={handleIsModi} className=' text-white rounded px-3'>
                                        수정
                                        </Button>
                                    )}
                                    
                                </Col>
                            </Row>
                        </MyInfo>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;