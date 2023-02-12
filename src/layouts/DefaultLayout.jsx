import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

export default function DefaultLayout() {
  const { token, notification, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      })
      .then((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
    <Sidebar />
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
      <Navbar />

      <div className="px-6 bg-gray-200 pt-6 2xl:container">
        <div>
          <Outlet />
          {notification &&
            <div>{ notification }</div>
          }
        </div>
      </div>
    </div>
    </div>
  );
}