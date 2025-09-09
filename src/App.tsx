import { Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Header from './components/layout/Header';
import Layout from './components/layout/Layout';
import Main from './pages/Main';
import ProfileForm from './pages/ProfileForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
// import PostForm from './pages/PostForm';
// import Post from './pages/Post';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/auth/callback" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/ProfileForm" element={<ProfileForm />} />
          {/* 모집글 생성 및 보기 페이지 완료되면 주석 해제 */}
          {/* <Route path="/post/new" element={<PostForm />} />
          <Route path="/post/:projectId" element={<Post />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
