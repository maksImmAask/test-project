import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "./routes";
import Admin from "../pages/admin";
import Home from "../pages/home";
import Login from "../pages/login";
import Signin from "../pages/signin";




export const Router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  }
  ,
  {
    path: ROUTES.ADMIN,
    element:<Admin />,
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