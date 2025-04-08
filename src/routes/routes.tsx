import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/layout/Layout';
import Header from '../components/Header';
import Main from '../pages/Main';
import Login from '../pages/Login';
import NewApply from '../pages/NewApply';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: (
          <>
            <Header />
            <Layout />
          </>
        ),
        children: [
          {
            index: true,
            element: <Main />,
          },
          {
            path: 'newapply',
            element: <NewApply />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        element: <Layout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
