import { Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Header from './components/layout/Header';
import Layout from './components/layout/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
// import Profile from './pages/NewProfile';
import PostForm from './pages/PostForm';
import Post from './pages/Post';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/auth/callback" element={<Login />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* 모집글 생성 및 보기 페이지 완료되면 주석 해제 */}
          {/* <Route path="/post/new" element={<PostForm />} />
          <Route path="/post/:projectId" element={<Post />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
