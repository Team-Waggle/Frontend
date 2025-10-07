import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from './App';
import Layout from './components/layout/Layout';
import Main from './pages/Main';
import ProfileForm from './pages/ProfileForm';
import Login from './pages/Login';
import Post from './pages/Post';
import PostForm from './pages/PostForm';
import './styles/global.css';
import ProfileRoute from './routes/ProfileRoute';
import ProfileHome from './pages/profile/ProfileHome';
import { ROUTES } from './constants/route';
import ProfileLayout from './pages/profile/ProfileLayout';
import ProfileLikes from './pages/profile/ProfileLikes';
import ProfileApplications from './pages/profile/ProfileApplications';
import ProfilePosts from './pages/profile/ProfilePosts';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/auth/callback" element={<Login />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/profile/:id" element={<ProfileRoute />} />
        <Route path="/ProfileForm" element={<ProfileForm />} />
        <Route path='/MyProfile' element={<MyProfile />} /> */}

        {/* 내 프로필 (중첩 라우트) */}
        <Route path={ROUTES.PROFILE} element={<ProfileLayout />}>
          <Route index element={<ProfileHome />} />
          <Route path="likes" element={<ProfileLikes />} />
          <Route path="applications" element={<ProfileApplications />} />
          <Route path="posts" element={<ProfilePosts />} />
        </Route>

        {/* 다른 사람 프로필 */}
        <Route path={`${ROUTES.PROFILE}/:id`} element={<ProfileRoute />} />

        <Route path="/ProfileForm" element={<ProfileForm />} />

        <Route path="/post/new" element={<PostForm />} />
        <Route path="/post/edit/:projectId" element={<PostForm />} />
        <Route path="/post/:projectId" element={<Post />} />
      </Route>
    </Route>,
  ),
);
