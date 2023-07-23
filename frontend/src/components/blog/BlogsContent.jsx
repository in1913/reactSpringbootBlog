import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {SlEye} from 'react-icons/sl';
import axios from "axios";

const Box = styled.div`
    display: block;
    border-radius: 20px;
    overflow: hidden;
    color: #000;
    transition: all .3s;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
    background: #fff;
`
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
`
const Title = styled.h5`
    color: #333;
    font-weight: 800;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const Class = styled.span`
    color: #fff;
    background: linear-gradient(45deg, purple, violet);
    border-radius: 15px;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-size: 14px;
    display: inline-block;

    &::first-letter{
        text-transform: uppercase;
    }
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
const TagBox = styled.div`
    width: 100%;
    overflow-x: auto;

    height: 45px;
    white-space:nowrap;

    &::-webkit-scrollbar{
        height: 5px;
        background-color: #000;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #2f3542;
    }
    &::-webkit-scrollbar-track{
        background-color: grey;
    }
`
const Tag = styled.span`
    background: #6883BC;
    color: #fff;
    display: inline-block;
`
const BlogsContent = ({num, classification, title, content, createdTime, mememail, hits, updatedTime, tags}) => {



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
            case "server":
                return "green, yellowgreen";
            case "frontend":
                return "purple, violet";
            case "backend":
                return "blue, aqua";
            case "coding":
                return "red, orange";
            default:
                return "black, black";
        }
    }


    const tagList = tags.split(',');

    let result = [];

    if(tags !== ""){
        for(let a in tagList) {
            result.push(<Link to={`/blog/${classification}/${tagList[a].replace(/\s/g, "%20")}`} key={a}><Tag key={a} className='me-2 mb-1 rounded px-2 p-1'>#{tagList[a]}</Tag></Link>)
        }
    }

    const handleHitsUpdate = async () => {
        await axios.get(`/api/blog/hits/${num}`);
    }

    return (
        <Box className='blog-content-hover'>
            <Link to={`/blog/${num}`} onClick={handleHitsUpdate}>
                <BlogImgBox>
                    <BlogImg src={imgStr(content)[0]} alt="blog_photo"/>
                </BlogImgBox>
            </Link>
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
                
                <Link to={`/blog/${num}`} className='text-decoration-none' onClick={handleHitsUpdate}>
                    <Title>{title}</Title>
                    <Contents>{content.replace(/(<([^>]+)>)/gi, "").substring(0, 50)}</Contents>
                </Link>
                <TagBox>
                    {result}
                </TagBox>
            </Bottom>
        </Box>
    );
};

export default BlogsContent;