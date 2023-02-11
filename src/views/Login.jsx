import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmitLogin = (event) => {
        event.preventDefault();

        const payload = {
            email: email,
            password: password,
        }

        setErrors(null);

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
    }

    return (
        <div>
            <form onSubmit={onSubmitLogin}>
                <h2>Login into your account</h2>
                {errors && <div>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{ errors[key][0] }</p>
                    ))}
                </div>}
                <div>
                    <input type="email" onChange={event => setEmail(event.target.value)} required/>
                </div>
                <div>
                    <input type="password" onChange={event => setPassword(event.target.value)} required/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <p>
                        Not Registered? <Link to='/register'>Create an account</Link>
                    </p>
                </div>
            </form>
        </div>

    );
}