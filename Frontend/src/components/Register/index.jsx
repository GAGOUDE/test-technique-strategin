import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
        
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/register', {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password
            })

            const data = await res.data;
            return data;
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500
            ) (
                setError(error.response.data.message)
            )
        } 
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        sendRequest().then(()=> navigate("/login"))
    }

  return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
            <div className={styles.left}>
                <h1>Je possède un compte.</h1>

                <Link to="/login">
                    <button type='button' className={styles.white_btn}>
                        Se connecter
                    </button>
                </Link>
            </div>

            <div className={styles.right}>
                <form 
                    className={styles.form_container}
                    onSubmit={handleSubmit}
                >
                    <h1>Créer un compte</h1>

                    <input
                        type="text"
                        placeholder='Prénom et Nom'
                        name='username'
                        value={inputs.username}
                        required
                        className={styles.input}
                        onChange={handleChange}
                    />

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
                        S'inscrire
                    </button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Register