import React from 'react';
import styled from 'styled-components';
import {Container, Row} from 'react-bootstrap';
import PortfolioContent from '../../components/main/PortfolioContent';
import PortfolioCard from "../portfolio/PortfolioCard";

const Title = styled.h1`
    font-weight: 600;
    font-size: 50px;
    text-align: center;
`

const Portfolio = () => {
    return (
        <Container className=' my-5 py-5' id='portfolio'>
            <Title className='my-5'>
                Portfolio
            </Title>
            <PortfolioCard/>
            <PortfolioContent/>
            <PortfolioContent/>

        </Container>
    );
};

export default Portfolio;