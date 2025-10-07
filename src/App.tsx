import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* 중첩 라우팅 영역 */}
    </>
  );
}

export default App;
