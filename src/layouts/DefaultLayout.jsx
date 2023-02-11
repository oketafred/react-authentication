import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to='/login' />
  }

  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post('logout')
      .then(() => {
        setUser({});
        setToken(null);
      })

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
    <div>
      <nav>Coming soon</nav>
      <div>User here: {user.name}</div>
      <Link to='/dashboard'>Dashboard</Link> <br/>
      <Link to='/users'>Users</Link>
      <div><a onClick={onLogout} href="#">Logout</a></div>
      <Outlet />
      {notification &&
        <div>{ notification }</div>
      }
    </div>
  );
}