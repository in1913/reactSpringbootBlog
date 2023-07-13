import Home from './main/Home';
import Blog from './main/Blog';
import Portfolio from './main/Portfolio';
import Contact from './main/Contact';
import Footer from '../components/main/Footer';
function App() {
  document.body.style = "background : #f5f5f5";
  return (
    <>
    <Home/>
    <Blog/>
    <Portfolio/>
    <Contact/>
    <Footer/>
    </>
  );
}

export default App;
