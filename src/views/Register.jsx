import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState(null);

    const { setToken, setUser} = useStateContext();

    const onSubmitRegister = (event) => {
        event.preventDefault();
        const payload = {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }

        setErrors(null);

        axiosClient.post('/register', payload)
          .then(({ data }) => {
            setToken(data.token);
            setUser(data.user);
          })
          .catch((error) => {
            const response = error.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          })
    }
    return (
      <form onSubmit={onSubmitRegister}>
        <h2>Register for free</h2>
        {errors && <div>
          {Object.keys(errors).map(key => (
            <p key={key}>{ errors[key][0] }</p>
          ))}
        </div>}
        <div>
            <input type="text" onChange={event => setName(event.target.value)} required/>
        </div>
        <div>
            <input type="email" onChange={event => setEmail(event.target.value)} required/>
        </div>
        <div>
            <input type="password" onChange={event => setPassword(event.target.value)} required/>
        </div>
        <div>
            <input type="password" onChange={event => setPasswordConfirmation(event.target.value)} required/>
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
        <div>
            <p>
                Already Registered? <Link to='/login'>Login</Link>
            </p>
        </div>
      </form>
    );
}