import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {SlEye} from 'react-icons/sl';

const BlogImgBox = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    display:flex;
    justify-content: center;
    align-items:center;
`
const BlogImg = styled.img`
    height: 400px;
    object-fit: cover;
`
const Bottom = styled.div`
    padding: 20px;
    background: #f5f5f5;
`
const Title = styled.h5`
    color: #333;
    font-weight: 800;
`
const Class = styled.span`
    color: #fff;
    background: linear-gradient(45deg, purple, violet);
    border-radius: 15px;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-size: 14px;
    display: inline-block;
`
const Date = styled.span`
    color: #ababab;
`

const Hits = styled.span`

`
const Contents = styled.p`
    word-break: break-word;
    color: #a1a1a1;
    height: 65px;
`
const Tag = styled.span`
    background: #6883BC;
    color: #fff;
`
const BlogsContent = ({num, classification, title, content, createdTime, mememail, hits, updatedTime, tags}) => {
    // 호버
    const [isHover, setIsHover] = useState(false);
    const handleHoverOver = () => {
        setIsHover(true);
    }
    const handleHoverOut = () => {
        setIsHover(false);
    }

    // 이미지 소스만 받아오기
    const imgStr = (str) => {
        const regex = /src="(.*?)"/g;
        const matches = str.match(regex);
        if (matches) {
            return matches.map((match) => match.match(/src="(.*?)"/)[1]);
        } else {
            return [];
        }
    }

    // 분류 색깔 바꾸기
    const classColor = (str) => {
        switch(str){
            case "Server":
                return "orangered, orange";
            case "FrontEnd":
                return "purple, violet";
            case "BackEnd":
                return "blue, aqua";
            case "Coding":
                return "red, orange";
            default:
                return "black, black";
        }
    }

    
    const tagList = tags.split(',');
    
    let result = [];
    for(let a in tagList){
        result.push(<Tag key={a} className='me-2 rounded px-2 p-1'># {tagList[a]}</Tag>)
    }
    return (
        <Link to={`/blog/${num}`} onMouseOut={handleHoverOut} onMouseOver={handleHoverOver}
            className={isHover ? "up" : ""}
            style={{ display: "block",
                borderRadius: "20px",
                overflow: "hidden",
                color: "#000",
                textDecoration: "none",
                transition: "all .3s",
                boxShadow: "5px 5px 10px 5px rgba(0,0,0,0.1)",
                background: "#fff"}}
        >
            <BlogImgBox>
                <BlogImg src={imgStr(content)[0]} alt="blog_photo"/>
            </BlogImgBox>
            <Bottom>
                <div className='d-flex justify-content-between'>
                    <span>
                        <Class style={ {background: `linear-gradient(45deg, ${classColor(classification)})`}}>{classification}</Class>
                        <Date className='ms-3'>{createdTime.substring(0, 10).replace(/-/g, ".")}</Date>
                    </span>
                    <span className='text-secondary'>
                        <SlEye className='mb-1'/>
                        <Hits className='ms-2'>{hits}</Hits>
                    </span>
                </div>
                
                
                <Title>{title}</Title>
                <Contents>{content.replace(/(<([^>]+)>)/gi, "").substring(0, 50)}</Contents>
                {result}
            </Bottom>
        </Link>
    );
};

export default BlogsContent;