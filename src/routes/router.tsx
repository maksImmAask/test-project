import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ROUTES } from './routes'
import Login from '../features/login/pages/login'
import Signin from '../features/signIn/pages/signin'
import Admin from '../features/admin/pages/admin'
import UsersPage from '../features/admin/pages/users'
import TestsPage from '../features/admin/pages/tests'
import Test from '../features/home/pages/test'
import { NotFound } from '../features/not-found/nFound'
import PrivateRoute from './PrivateRoute'
import Home from '../features/home/pages/home'
import { Layout } from '../layout/layout'
import Results from '../features/home/pages/results'

export const Router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },

  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.ADMIN,
        element: <Admin />,
        children: [
          {
            path: ROUTES.USERS,
            element: <UsersPage />,
          },
          {
            path: ROUTES.TESTS,
            element: <TestsPage />,
          },
        ],
      },
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          }
          ,
          {
            path: ROUTES.TEST_START,
            element: <Test />,
          },
          {
            path: ROUTES.RESULTS,
            element: <Results />, 
          }
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  }
])

export default function AppRouter() {
  return <RouterProvider router={Router} />;
}