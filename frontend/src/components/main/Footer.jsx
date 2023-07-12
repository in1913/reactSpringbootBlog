import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container fluid className='bg-secondary text-center text-white py-5 px-2'>
            2023 &copy; <strong>Inyoung Choi.</strong> All rights reserved. <br />
            Designed by <strong>Inyoung Choi.</strong>

        </Container>
    );
};

export default Footer;