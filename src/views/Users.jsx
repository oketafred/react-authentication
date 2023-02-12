import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";


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

          <header>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
                    User List
                  </h1>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                  <Link
                    to='/users/new'
                    className="block flex justify-center items-center rounded bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-700 focus:outline-none focus:ring"
                  >
                    <HiPlus className="text-xl pr-1" />
                    Add User
                  </Link>
                </div>
              </div>
            </div>
          </header>



          <div className="overflow-x-auto p-6 sm:p-8 rounded-lg bg-white border border-gray-200/50 bg-opacity-50 shadow-2xl shadow-gray-600/10 lg:h-full">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Full Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Creation Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-right font-medium text-gray-900">
                  Actions
                </th>
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
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{index + 1}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.created_at}</td>
                    <td className="whitespace-nowrap text-right py-2 text-gray-700">
                      <Link
                        to={'/users/'+ user.id}
                        className="inline-block rounded bg-cyan-600 px-4 py-2 mr-2 font-medium text-white hover:bg-cyan-700"
                      >
                        <div className="flex items-center justify-center">
                          <HiPencil className="text-2xl pr-2"/>
                          Edit
                        </div>
                      </Link>
                      <button
                        className="inline-block rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700"
                        onClick={() => onDelete(user)}>
                        <div className="flex items-center justify-center">
                          <HiTrash className="text-2xl pr-2"/>
                          Delete
                        </div>
                      </button>
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