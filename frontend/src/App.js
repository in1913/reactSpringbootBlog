import Main from './pages/Main';
import Blog from './pages/blog/Main';
import Login from './pages/admin/Login';
import Admin from './pages/admin/Main';
import Write from './pages/blog/Write';
import BlogsDetail from './pages/blog/BlogsDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TagSearch from './pages/blog/TagSearch';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Main/>} />
        <Route path="blog" element={<Blog/>} />
        <Route path="blog/login" element={<Login/>} />
        <Route path="blog/admin" element={<Admin/>} />
        <Route path="blog/write" element={<Write/>} />
        <Route path="blog/:num" element={<BlogsDetail/>}/>
        <Route path="blog/:category/:tag" element={<TagSearch/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
