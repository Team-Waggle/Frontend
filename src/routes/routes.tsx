import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/layout/Layout";
import NewApply from "../pages/NewApply";
import Header from "../components/Header";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
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