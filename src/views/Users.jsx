import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (user) => {
      if (!window.confirm('Are you sure you want to delete this user?')) {
        return;
      }

      axiosClient.delete(`/users/${user.id}`)
        .then(() => {
          setNotification('User deleted successfully');
          getUsers();
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
          .then(({ data }) => {
              setUsers(data.data)
          })
          .catch((error) => {
              console.log(error)
          })
          .finally(() => {
              setLoading(false)
          })
    }

    return (
        <div>
          <div>
            <h2>Users</h2>
            <Link to='/users/new'>Add User</Link>
          </div>
          <div>
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading && (
                <tbody>
                <tr>
                  <td colSpan="5">
                    Loading...
                  </td>
                </tr>
                </tbody>
              )}
              {!loading && (
                <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <Link to={'/users/'+ user.id}>Edit</Link>
                      <button onClick={() => onDelete(user)}>Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
    );
}