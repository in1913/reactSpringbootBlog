import React from 'react';
import Home from "./Home";
import Header from "../../components/main2/Header";
import {Container} from "react-bootstrap";
const Main = () => {
    document.body.style ="background: rgba(33,62,64, 0.9); overflow-x: hidden "
    return (
        <Container fluid >
            <Header/>
            <Home/>

        </Container>
    );
};

export default Main;