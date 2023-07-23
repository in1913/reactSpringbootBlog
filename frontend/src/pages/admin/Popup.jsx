import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import {TfiClose} from 'react-icons/tfi';
import {Link} from "react-router-dom";
import Signup from "../blog/Signup";

const PopupBox = styled.div`
    margin-top: 10%;
    width: 400px;
    color: #495057;
`

const Box = styled.div`
    border: 1px solid #ccc;
    padding: 10%;
`
const InputBox = styled.div`
    width: 100%;

`
const InputName = styled.span`
    font-size: 14px;
    font-weight: 600;
`
const MyInput = styled.input`
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 1%;
    margin-bottom: 5%;
`

const Warning = styled.span`
    color: red;
    font-size: 13px;
    display: none;
`
const Popup = ({isLoginPopup, isSignupPopup, setIsLoginPopup, setSignupPopup}) => {
    const [mememail, setMememail] = useState('');
    const [mempass, setMempass] = useState('');
    const [isNotMem, setIsNotMem] = useState(false);


    // 이메일과 비밀번호 상태 업데이트 함수들을 정의합니다.
    const handleEmailChange = (e) => {
        setMememail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setMempass(e.target.value);
    };

    const handleIsNotMem = () => {
        setIsNotMem(true);
    }
    const handleIsMem = () => {
        setIsNotMem(false);
    }

    const handleSignupPopup = () => {

    }


    // 로그인 요청을 처리하는 함수를 정의합니다.
    const handleLogin = async () => {
        const response = await axios.post('/api/login', null, { params: { mememail, mempass}});
        if(response.data === "Success"){
            handleIsMem();
            window.location.reload();
        }else{
            handleIsNotMem();
        }
    };
    document.body.style = 'background: #f5f7fb;';
    return (
        <Container fluid className='d-flex justify-content-center position-fixed w-100 h-100' style={{background: "rgba(0,0,0,0.7)", zIndex: 10000000}}>
            {
                isLoginPopup ?
                    (<PopupBox className="loginbox">
                        <Box className='mt-3 rounded bg-white'>
                            <div className="text-end " style={{marginRight: "-20px", marginTop: "-20px"}}>
                                <button onClick={() => setIsLoginPopup(false)} className="bg-transparent border-0"><TfiClose size={30} color="#ccc"/></button>
                            </div>
                            <h5 className='text-center mb-3 text-dark' style={{fontWeight: "900", fontStyle: "italic"}}>
                                Inyoung's Blog
                            </h5>
                            <InputBox>
                                <InputName>이메일</InputName>
                                <MyInput placeholder='Email Address' value={mememail} onChange={handleEmailChange} spellCheck="false" type='email'/>
                            </InputBox>
                            <InputBox>
                                <InputName>비밀번호</InputName>
                                <MyInput placeholder='Password' value={mempass} onChange={handlePasswordChange} spellCheck="false" type='password'/>
                            </InputBox>

                            <Warning className={isNotMem ? "d-block" : "d-none"}>일치하는 사용자 정보가 없습니다.</Warning>
                            <Button onClick={handleLogin} className='w-100 bg-info text-center rounded p-2 mt-3 border-0'>Log in</Button>
                            <div style={{fontSize: "14px"}} className="text-center mt-3">회원이 아니신가요?
                                <button onClick={handleSignupPopup} className="border-0 bg-transparent text-primary ms-1">회원가입</button>
                            </div>
                        </Box>
                    </PopupBox>)
                    :
                    (<></>)

            }

        </Container>
        
    );
};

export default Popup;