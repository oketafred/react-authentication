import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { FaBackward } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
              .then(({ data }) => {
                  setUser(data);
              })
              .catch((error) => {
                  console.log(error)
              })
              .finally(() => {
                  setLoading(false);
              })
        }, [])
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (user.id) {
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
              toast.success('User was updated successfully');
              navigate('/users');
            })
            .catch((error) => {
              const response = error.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors);
              }
            })
        } else {
          axiosClient.post('/users', user)
            .then(() => {
              toast.success('User was created successfully');
              navigate('/users');
            })
            .catch((error) => {
              const response = error.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors);
              }
            })
        }
    }

    return (
      <div>
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
                  {user.id && <span>Update User: { user.name }</span>}
                  {!user.id && <span>New User</span>}
                </h1>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link
                  to='/users'
                  className="block rounded bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-700 focus:outline-none focus:ring"
                >
                  <div className="flex justify-center items-center">
                    <FaBackward className="text-xl pr-2" />
                    User List
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>



        <div className="overflow-x-auto rounded-lg bg-white border border-gray-200/50 bg-opacity-50 shadow-2xl shadow-gray-600/10 lg:h-full">
          <div>
            {loading && (
              <div>Loading...</div>
            )}
          </div>
          {errors && <div>
            {Object.keys(errors).map(key => (
              <p key={key}>{ errors[key][0] }</p>
            ))}
          </div>}
          {!loading &&
            <form onSubmit={onSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          className="w-full rounded border-2 border-gray-200 focus:outline-cyan-600 px-4 py-2.5 pr-12 text-sm shadow-sm"
                          value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} placeholder="Full Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="relative mt-1">
                        <input
                          type="email"
                          className="w-full rounded border-2 border-gray-200 focus:outline-cyan-600 px-4 py-2.5 pr-12 text-sm shadow-sm"
                          value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} placeholder="Email Address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative mt-1">
                        <input
                          type="password"
                          className="w-full rounded border-2 border-gray-200 focus:outline-cyan-600 px-4 py-2.5 pr-12 text-sm shadow-sm"
                          onChange={(event) => setUser({ ...user, password: event.target.value })} placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="text-sm font-medium">Password Confirmation</label>
                      <div className="relative mt-1">
                        <input
                          type="password"
                          className="w-full rounded border-2 border-gray-200 focus:outline-cyan-600 px-4 py-2.5 pr-12 text-sm shadow-sm"
                          onChange={(event) => setUser({ ...user, password_confirmation: event.target.value })} placeholder="Password confirmation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none">
                    {user.id ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </div>
            </form>
          }
        </div>
      </div>
    );
}