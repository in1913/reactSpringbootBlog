import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { RiUserFill } from 'react-icons/ri';
import {TbPhotoFilled} from 'react-icons/tb';
import axios from 'axios';
import Tag from '../../components/admin/Tag';
const MyInput   = styled.input`
    padding: 7px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 200px;
    margin-top: 5px;
`
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
const OriginCat = styled.div`
    font-size: 20px;

    &:first-letter{
        text-transform: uppercase;
    }
`
const BlogManage = () => {
    // 비동기로 값보내기
    const [blog_name, setBlog_name] = useState('');
    const [blog_owner_name, setBlog_owner_name] = useState('');
    const [photo_url, setPhoto_url] = useState('');

    const handleIsNotModiBlog = async () => {
        setIsModi(false);

        const response = await axios.post('/api/blogupdate', {
            num : 1,
            blog_name : blog_name,
            blog_owner_name : blog_owner_name,
            photo_url : photo_url,
            classification : tags.join(',')
        })

        if(response.data === ""){

            console.log("실패");
        }else{
            setBlog_name(response.data[0]["blog_name"]);
            setBlog_owner_name(response.data[0]["blog_owner_name"]);
            setPhoto_url(response.data[0]["photo_url"]);

        }
    }
     // 태그 만들기
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const handleRemoveTag = (removedTag) => {
        const updatedTags = tags.filter((tag) => tag !== removedTag);
        setTags(updatedTags);
    }
    const handleCategoryPlus = () => {
            setTags([...tags, text]);
            setText("");
        
    }

    useEffect(() => {
        const blogManageData = async () => {
            const response = await axios.get('/api/blogmanage');
            if(response.data === ""){

            }else{
                setBlog_name(response.data[0]["blog_name"]);
                setBlog_owner_name(response.data[0]["blog_owner_name"]);
                setPhoto_url(response.data[0]["photo_url"]);
                const categoryList = response.data[0]["classification"] && response.data[0]["classification"].split(",");
                setTags(categoryList || []);
            }
        };
        blogManageData();
    }, []);
    
    // 수정 버튼 클릭 토글
    const [isModi, setIsModi] = useState(false);
    const handleIsModi = () => {
        setIsModi(true);
    }

    // 사진 편집 버튼 누르면 input file 실행
    const BlogPhotoModi = () => {
        const upload = document.getElementById("blogphoto-upload");
        upload.click();
    }    

    // 사진 선택하면 자동으로 업로드 
    const handleImageBlogUpload = async (e) => {
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
        }else{
            console.error('이미지 업로드 실패');
        }
    }
    return (
        <Container>
            <h1>
                설정
            </h1>
            <Row className='mt-3 mb-5'>
                {/* 사진 주소 */}
                <Col lg={4}>
                    <h4>블로그 사진</h4>
                    <MyImgBox>
                        <MyImgBox id='blogimgbox'>
                        {
                            photo_url === "" ?
                            (<TbPhotoFilled size={200} style={{background: "#ccc", marginTop: "0px"}}/>)
                            :
                            (<MyImg src={photo_url} alt="me"/>)
                        }
                        </MyImgBox>
                        <input type="file" style={{display : "none"}} id='blogphoto-upload' accept='image/*' onChange={handleImageBlogUpload}/>
                        {
                            isModi ? 
                            (<Edit onClick={BlogPhotoModi}>편집</Edit>)
                            :
                            (<></>)
                        }
                        
                    </MyImgBox>
                </Col>
                {/* 블로그 이름 */}
                {/* 블로그 소유자 이름 */}
                <Col lg={4}>
                    <div className='mb-5'>
                        <h4>블로그 이름</h4>
                        {
                            isModi ?
                            (<MyInput type="text" onChange={(e) => setBlog_name(e.target.value)} spellCheck="false" defaultValue={blog_name} placeholder='블로그 이름'/>)
                            :
                            (<Content>{blog_name}</Content>)
                        }
                        
                    </div>
                    <div>
                        <h4>블로그 소유자 이름</h4>
                        {
                            isModi ? 
                            (<MyInput type="text" onChange={(e) => setBlog_owner_name(e.target.value)} spellCheck="false" defaultValue={blog_owner_name} placeholder='블로그 소유자 이름'/>)
                            :
                            (<Content>{blog_owner_name}</Content>)
                        }
                        
                    </div>
                    
                </Col>
                {/* 분류 */}
                <Col lg={4}>
                    <h4>카테고리</h4>
                    {
                        isModi ? 
                        (<>
                        <div>
                        
                            {
                                tags.map((tags, index) => (
                                <Tag
                                    tags={tags}
                                    key={index}
                                    onRemove={handleRemoveTag}
                                />
                                ))
                            }
                        </div>
                        <MyInput 
                        type="text" 
                        spellCheck="false" 
                        placeholder='카테고리'
                        className='rounded' 
                        value={text}
                        onChange={(e) => {setText(e.target.value)}}
                        />
                        <Button onClick={handleCategoryPlus} className='ms-2'>추가</Button>
                        </>)
                        :
                        (<>{
                            tags.map((tags,index) => (
                                <OriginCat key={index}
                                    className='rounded m-1 py-1 px-2 bg-secondary text-white'
                                >{tags}</OriginCat>
                            ))
                        }
                        </>
                        )
                    }
                    
                </Col>

                {/* 수정하기 */}
                <Col xs={8}>
                </Col>
                <Col xs={4} className='text-end'>
                    { isModi ? 
                    (
                        <Button onClick={handleIsNotModiBlog}  className=' text-white rounded px-3'>
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
        </Container>
    );
};

export default BlogManage;