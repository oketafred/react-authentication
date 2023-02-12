import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const onSubmitForgotPassword = (event) => {
        event.preventDefault();

        const payload = { email: email }

        setErrors(null);
        setLoading(true);

        axiosClient.post('/forgot-password', payload)
          .then(({ data }) => {
            toast.success(data.message);
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
            setEmail('');
          })
    }

    return (
        <div>
          <div className="bg-gray-300">
            <div className="flex items-center justify-center h-screen">
                <div className="mx-auto w-full md:w-1/3 bg-white rounded-lg">
                    <h1 className="text-center pt-8 text-2xl font-bold text-cyan-600 sm:text-3xl">
                        React - Laravel
                    </h1>

                    <form onSubmit={onSubmitForgotPassword} className="mb-0 space-y-4 rounded-lg p-8 shadow">
                        <p className="text-lg text-center font-medium">
                            Reset your password
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
                                  className="w-full rounded-lg border-2 border-gray-200 focus:outline-cyan-600 px-4 py-2.5 pr-12 text-sm shadow-sm"
                                  placeholder="Enter email address"
                                  onChange={event => setEmail(event.target.value)}
                                  required
                                />
                            </div>
                        </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="block w-full rounded-lg bg-cyan-600 px-5 py-3 text-sm font-medium text-white"
                        >
                          {loading ? 'Loading...' : 'Send Password Reset Link'}
                        </button>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          <Link to='/login' className="text-cyan-600">
                            Back to Login Page
                          </Link>
                        </p>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
    );
}