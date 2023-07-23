import Main from './pages/Main';
import Main2 from './pages/main2/Main'
import Blog from './pages/blog/Main';
import Admin from './pages/admin/Main';
import Write from './pages/blog/Write';
import BlogsDetail from './pages/blog/BlogsDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagSearch from './pages/blog/TagSearch';
import PortfolioContent from "./components/main/PortfolioContent";
import Modify from "./pages/blog/Modify";
import Signup from "./pages/blog/Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Main2/>} />
        <Route path="blog" element={<Blog/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="blog/write" element={<Write/>} />
        <Route path="blog/modify/:num" element={<Modify/>} />
        <Route path="blog/:num" element={<BlogsDetail/>}/>
        <Route path="portfolio/:num" element={<PortfolioContent/>}/>
        <Route path="blog/:category/:tag" element={<TagSearch/>}/>
      </Routes>
    </Router>

  );
}

export default App;
