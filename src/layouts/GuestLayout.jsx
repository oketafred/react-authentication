import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to='/' />
  }

  return (
      <div>
        <Outlet />
        <ToastContainer />
      </div>
  );
}