import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { ROUTES } from "./routes/routes";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import SigninPage from "./pages/signinPage";




export const Router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  }
  ,
  {
    path: ROUTES.ADMIN,
    element:<AdminPage />,
  }
  ,
  {
    path: ROUTES.SIGNIN,
    element:<SigninPage />,
  }
  ,
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTES.HOME,
        element:<HomePage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={Router} />;
}