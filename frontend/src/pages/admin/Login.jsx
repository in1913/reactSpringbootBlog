import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const LoginBox = styled.div`
    margin-top: 10%;
    width: 400px;
    color: #495057;
`
const Title = styled.h1`
    margin-top: 10%;
    font-style: italic;
`

const SubTitle = styled.h5`
    margin-top: 10%;
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
const Login = () => {
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
    

    // 로그인 요청을 처리하는 함수를 정의합니다.
    const handleLogin = async () => {
        const response = await axios.post('/api/login', null, { params: { mememail, mempass}});
        if(response.data === "Success"){
            handleIsMem();
            window.location.href="/blog";
        }else{
            handleIsNotMem();
        }
    };
    document.body.style = 'background: #f5f7fb;';
    return (
        <Container className='d-flex justify-content-center'>
            <LoginBox>
                <Title className='text-center'>
                    Inyoung's Blog
                </Title>
                <SubTitle className='text-center'>
                    Log in to your account
                </SubTitle>
                <Box className='mt-4 rounded bg-white' action="login">
                    <InputBox>
                        <InputName>Email Address</InputName>
                        <MyInput placeholder='Email Address' value={mememail} onChange={handleEmailChange} spellCheck="false" type='email'/>
                    </InputBox>
                    <InputBox>
                        <InputName>Password</InputName>
                        <MyInput placeholder='Password' value={mempass} onChange={handlePasswordChange} spellCheck="false" type='password'/>
                    </InputBox>
                    
                    <Warning className={isNotMem ? "d-block" : "d-none"}>일치하는 사용자 정보가 없습니다.</Warning>
                    <Button onClick={handleLogin} className='w-100 bg-info text-center rounded p-2 mt-3 border-0'>Log in</Button>
                </Box>
            </LoginBox>
        </Container>
        
    );
};

export default Login;