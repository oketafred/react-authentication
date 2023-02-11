import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";

const router = createBrowserRouter([
  {
    path: '/', element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' />
      },
      {
        path: '/dashboard', element: <Dashboard />
      },
      {
        path: '/users', element: <Users />
      },
      {
        path: '/users/new', element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id', element: <UserForm key="userUpdate" />
      },
    ]
  },
  {
    path: '/', element: <GuestLayout />,
    children: [
      {
        path: '/login', element: <Login />
      },
      {
        path: '/register', element: <Register />
      }
    ]
  },
  {
    path: '*', element: <NotFound />
  }
]);

export default router;