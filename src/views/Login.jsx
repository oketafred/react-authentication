import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmitLogin = (event) => {
        event.preventDefault();

        const payload = {
            email: email,
            password: password,
        }

        setErrors(null);
        setLoading(true);

        axiosClient.post('/login', payload)
          .then(({ data }) => {
              setToken(data.token);
              setUser(data.user);
          })
          .catch((error) => {
              const response = error.response;
              if (response && response.status === 422) {
                  if (response.data.error) {
                    setErrors(response.data.errors);
                  } else {
                      setErrors({ email: [ response.data.message ] })
                  }
              }
          })
          .finally(() => {
            setLoading(false);
          })
    }

    return (
        <div>
          <div className="bg-gray-300">
            <div className="flex items-center justify-center h-screen">
                <div className="mx-auto w-full md:w-1/3 bg-white rounded-lg">
                    <h1 className="text-center pt-8 text-2xl font-bold text-indigo-600 sm:text-3xl">
                        React - Laravel
                    </h1>

                    <form onSubmit={onSubmitLogin} className="mb-0 space-y-4 rounded-lg p-8 shadow">
                        <p className="text-lg text-center font-medium">
                            Login into your account
                        </p>
                        {errors &&
                        <div>
                            {Object.keys(errors).map(key => (
                              <div role="alert" className="rounded border-l-4 border-red-400 bg-red-100 p-4">
                                <p className="text-sm text-red-600" key={key}>{ errors[key][0] }</p>
                              </div>
                              ))}
                          </div>
                        }
                        <hr/>

                        <div>
                            <label className="text-sm font-medium">Email Address</label>

                            <div className="relative mt-1">
                                <input
                                  type="email"
                                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 pr-12 text-sm shadow-sm"
                                  placeholder="Enter email address"
                                  onChange={event => setEmail(event.target.value)}
                                  required
                                />
                            </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Password</label>
                            <div className="-mr-2 p-2">
                              <Link to="/forgot-password" className="text-sm text-indigo-600">
                                Forgot your password?
                              </Link>
                            </div>
                          </div>
                            <div className="relative mt-1">
                                <input
                                  type="password"
                                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 pr-12 text-sm shadow-sm"
                                  placeholder="Enter password"
                                  onChange={event => setPassword(event.target.value)}
                                  required
                                />

                                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </span>
                            </div>
                        </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                          {loading ? 'Loading...' : 'Sign in'}
                        </button>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Not Registered? <Link to='/register' className="text-indigo-600">Create an account</Link>
                        </p>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
}