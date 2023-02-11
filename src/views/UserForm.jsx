import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setNotification } = useStateContext();
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
              setNotification('User was updated successfully');
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
              setNotification('User was created successfully');
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
            {user.id && <h2>Update User: { user.name }</h2>}
            {!user.id && <h2>New User</h2>}
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
                    <div>
                        <input value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} type="text" placeholder="Full Name" />
                    </div>
                    <div>
                        <input value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} type="email" placeholder="Email Address" />
                    </div>
                    <div>
                        <input type="password" onChange={(event) => setUser({ ...user, password: event.target.value })} placeholder="Password" />
                    </div>
                    <div>
                        <input type="password" onChange={(event) => setUser({ ...user, password_confirmation: event.target.value })} placeholder="Password confirmation" />
                    </div>
                    <div>
                        <button type="submit">
                          {user.id ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}