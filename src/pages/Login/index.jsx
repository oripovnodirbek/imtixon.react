import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './index.module.css';
// import loginImg from './images/login.avif';

function Login() {
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    function validate() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        let isValid = true;
        let errorMessage = "";

        if (!username) {
            isValid = false;
            errorMessage += "Username is required.\n";
        }
        if (!password) {
            isValid = false;
            errorMessage += "Password is required.\n";
        }

        if (!isValid) {
            alert(errorMessage);
        }

        return isValid;
    }

    function handleForm(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        setLoading(true);
        fetch('https://api.escuelajs.co/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message === 'User Not found.') {
                alert(data.message);
                usernameRef.current.focus();
                return;
            }
            if (data.message === 'Invalid Password') {
                alert(data.message);
                passwordRef.current.focus();
                return;
            }
            if (data.accessToken) {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('token', data.accessToken);
                navigate('/');
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(function() {
            setLoading(false);
        })
    }

    return (
        <div className={styles.logincont}>
            {/* <img src={loginImg} alt="Login" /> */}
            <div className={styles.login_page}>
                <h2>Login Page</h2>
                <form className={styles.login} onSubmit={handleForm}>
                    <input ref={usernameRef} type="text" placeholder="Enter username" />
                    <input ref={passwordRef} type="password" placeholder="Enter password" />
                    {loading && <button>Loading...</button>}
                    {!loading && <button type="submit">Login</button>}
                    <div className={styles.reglink}>
                        <Link className={styles.linke} to='/register'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
