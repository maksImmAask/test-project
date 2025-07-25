import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "./routes";
import Admin from "../features/admin/pages/admin";
import Home from "../features/home/pages/home";
import Login from "../features/login/pages/login";
import Signin from "../features/signIn/pages/signin";
import UsersPage from "../features/admin/pages/users";
import TestsPage from "../features/admin/pages/tests";




export const Router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  }
  ,
  {
    path: ROUTES.ADMIN,
    element:<Admin />,
    children: [
      {
        path: ROUTES.USERS,
        element:<UsersPage />,
      }
      ,
      {
        path: ROUTES.TESTS,
        element:<TestsPage />,
      }
      
    ]
      
  }
  ,
  {
    path: ROUTES.SIGNIN,
    element:<Signin />,
  }
  ,
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTES.HOME,
        element:<Home />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={Router} />;
}