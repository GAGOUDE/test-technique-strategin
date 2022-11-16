import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Users from '../Users';

axios.defaults.withCredentials = true;

const Main = () => {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const sendRequest = async() => {
        const res = await axios.get('http://localhost:8080/api/users', {
            withCredentials: true,
        })
            .catch(err => console.log(err));

        const data = await res.data;
        // console.log(data);

        return data;
    }

    useEffect(() => {
        localStorage.getItem("token");

        sendRequest().then((data) => setUsers(data.usersFromDB));
    }, []);


    // Déconnexion
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

  return (
    <div className={styles.main_container}>
        {/* Navigation */}
        <nav className={styles.navbar}>
              <h1>Bienvenue !</h1>

            <button 
                className={styles.white_btn}
                onClick={handleLogout}
            >
                Déconnexion
            </button>
        </nav>

        {/* Affichage de la liste des utilisateurs */}

          <div className={styles.main_users_container}>
            {/* Pass data down to the Users component where we'll create the table */}

            <h1>Liste des utilisateurs</h1>

            <Users users={users} />
        </div>
        
    </div>
  )
}

export default Main;