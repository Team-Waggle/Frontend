import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/layout/Layout";
import NewApply from "../pages/NewApply";
import Header from "../components/Header";
import MainHeader from "../components/Main/MainHeader";
import Main from "../pages/Main";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <Main />,
            path: "/",
          },
          {
            element: <Header />,
            children: [
              {
                path: "/newapply",
                element: <NewApply />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
