import { Route, Routes } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';
import NewApply from './pages/NewApply';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/newapply" element={<NewApply />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/callback" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
