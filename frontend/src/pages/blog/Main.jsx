import React from 'react';
import Home from './Home';
import Header from '../../components/blog/Header';
import Footer from '../../components/main/Footer';
import Blogs from './Blogs';


const Main = () => {
    return (
        <div style={{background: "#f5f5f5"}}>
            <Header />
            <Home />
            <Blogs/>
            <Footer/>
        </div>
    );
};

export default Main;