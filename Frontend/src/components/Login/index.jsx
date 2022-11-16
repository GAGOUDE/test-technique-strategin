import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/login";
            const res = await axios.post(url, {
                email : inputs.email,
                password : inputs.password
            });

            const data = await res.data;

            let tokenFromBD = data.token;
            localStorage.setItem("token", tokenFromBD);

            navigate("/main");
            
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500
            ) (
                setError(error.response.data.message)
            )
        }
    }

    return (
        <div className={styles.signin_container}>
            <div className={styles.signin_form_container}>
                <div className={styles.left}>
                    <form
                        className={styles.form_container}
                        onSubmit={handleSubmit}
                    >
                        <h1>Connexion</h1>

                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={inputs.email}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={inputs.password}
                            required
                            className={styles.input}
                            onChange={handleChange}
                        />

                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type='submit' className={styles.green_btn}>
                            Sign In
                        </button>

                    </form>
                </div>

                <div className={styles.right}>
                    <h1>Je ne possède pas de compte.</h1>

                    <Link to="/register">
                        <button type='button' className={styles.white_btn}>
                            S'inscrire
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login