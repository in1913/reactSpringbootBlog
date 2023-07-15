import React, {useState, useEffect} from 'react';
import Home from './Home';
import Footer from '../../components/main/Footer';
import axios from 'axios';
import Header from '../../components/admin/Header';
import BlogManage from './BlogManage';
import Portfolio from "../main/Portfolio";
import PortfolioManage from "./PortfolioManage";

const Main = () => {

    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);

    // 로그인 세션 받아오기
    const [session, setSession] = useState(null);

    useEffect(() => {
        const sessionData = async () => {
            const response = await axios.get('/api/session');
            if(response.data === ""){
                setIsLogin(false);
                setSession(null);
            }else{
                setIsLogin(true);
                setSession(response.data);
            }
        };
        sessionData();
    }, []);

    return (
        <div style={{background: "#f5f5f5"}}>
            <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Home session={session}/>
            <BlogManage/>
            <PortfolioManage/>
            <Footer/>
        </div>
    );
};

export default Main;