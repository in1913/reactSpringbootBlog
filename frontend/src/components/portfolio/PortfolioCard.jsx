import React, {useEffect, useState} from 'react';
import {Col, Row, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const PortfolioCard = ({num, photos, title}) => {

    return (
        <Row>
            <Col lg={4}>
                <Link to={`/portfolio/${num}`}>

                    <Image src={photos[0]} thumbnail className="bg-secondary border-2 border-black" alt="portfolio"/>
                </Link>
            </Col>
            <Col lg={8}>
                <h1>{title}</h1>

            </Col>
        </Row>



    );
};

export default PortfolioCard;