import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap';
import PortfolioCard from "../../components/portfolio/PortfolioCard";
import axios from "axios";

const Title = styled.h1`
    font-weight: 600;
    font-size: 50px;
    text-align: center;
`

const Portfolio = () => {
    const [portfolioList, setPortfolioList] = useState([]);
    useEffect(() => {
        const getPortfolioList = async () =>{
            const response = await axios.get("/api/portfoliolist")
            setPortfolioList(response.data);
        }

        getPortfolioList();
    }, [])

    return (
        <Container className=' my-5 py-5' id='portfolio'>
            <Title className='my-5'>
                Portfolio
            </Title>
            {
                portfolioList.map((list) => (
                    <PortfolioCard
                        key={list.num}
                        photos={list.photos.split(",")}
                        title={list.title}
                        num={list.num}
                    />
                ))
            }


        </Container>
    );
};

export default Portfolio;