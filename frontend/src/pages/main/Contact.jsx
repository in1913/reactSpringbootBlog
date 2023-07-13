import React, {useState} from 'react';
import { Container} from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.h1`
    font-weight: 600;
    font-size: 40px;
    border-bottom: 4px solid;
    display: inline-block;
    padding-right: 20px;
`
const MyInput = styled.div`
    position: relative;

    &>input,textarea{
        background: transparent;
    }
`
const Name = styled.span`
    position: absolute;
    top: -5px;
    left:0;
    color: transparent;
    transition: all 0.3s;
    font-weight: 600;
`
const Button = styled.a`
    display: block;
    text-decoration: none;
    text-align: center;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    border-radius: 35px;
    padding: 10px;
`

const Contact = () => {
    const [isNameOn, setIsNameOn] = useState(false);
    const handleNameOn = () => {
        setIsNameOn(true);
        const name = document.getElementById("name");
        if(name.value === ""){
            handleNameOut();
        }
    }
    const handleNameOut = () => {
        setIsNameOn(false);
    }

    const [isEmailOn, setIsEmailOn] = useState(false);
    const handleEmailOn = () => {
        setIsEmailOn(true);
        const email = document.getElementById("email");
        if(email.value === ""){
            handleEmailOut();
        }
    }
    const handleEmailOut = () => {
        setIsEmailOn(false);
    }

    const [isTextOn, setIsTextOn] = useState(false);
    const handleTextOn = () => {
        setIsTextOn(true);
        const text = document.getElementById("text");
        if(text.value === ""){
            handleTextOut();
        }
    }
    const handleTextOut = () => {
        setIsTextOn(false);
    }
    return (
        <Container id='contact' className='my-5 p-5'>
            <Title className='my-5 border-info'>
                Contact Me
            </Title>
            <div className='px-3'>
                <MyInput>
                    <input onInput={handleNameOn} id="name" name='name' spellCheck="false" className='w-100 py-3 mb-4' type='text' placeholder='이름'/>
                    <Name className={isNameOn ? "text-info" : ""} style={isNameOn ? {transform: "translateY(-10px)"} : {}}>이름</Name>
                </MyInput>
                <MyInput>
                    <input onInput={handleEmailOn} id="email" name='email' spellCheck="false" className='w-100 py-3 mb-4' type='email' placeholder='이메일'/>
                    <Name className={isEmailOn ? "text-info" : ""} style={isEmailOn ? {transform: "translateY(-10px)"} : {}}>이메일</Name>
                </MyInput>
                <MyInput>
                    <textarea spellCheck="false" onInput={handleTextOn} name="text" id="text" cols="30" rows="7" className='w-100 py-3 mb-5' placeholder='내용을 입력해주세요.'></textarea>
                    <Name className={isTextOn ? "text-info" : ""} style={isTextOn ? {transform: "translateY(-10px)"} : {}}>내용</Name>
                </MyInput>
            </div>

            <Button className='bg-info my-3' href="">보내기</Button>
        </Container>
    );
};

export default Contact;