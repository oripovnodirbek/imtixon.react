import React, { useRef } from "react";
import styles from './index.module.css';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const usernameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const repasswordRef = useRef('');
    const navigate = useNavigate();

    function validate() {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const repassword = repasswordRef.current.value;

        if (!username || !email || !password || !repassword) {
            alert("All fields are required.");
            return false;
        }

        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            alert("Invalid email format.");
            emailRef.current.focus();
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            passwordRef.current.focus();
            return false;
        }

        if (password !== repassword) {
            alert("Passwords do not match.");
            repasswordRef.current.focus();
            return false;
        }

        return true;
    }

    function handleForm(e) {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) {
            return;
        }

        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message === 'Failed! Email is already in use!') {
                alert(data.message);
                emailRef.current.focus();
                return;
            }
            if (data.message === 'Failed! Username is already in use!') {
                alert(data.message);
                usernameRef.current.focus();
                return;
            }
            if (data.message === "User registered successfully!") {
                navigate('/'); 
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={styles.register_page}>
            <h2>Register Page</h2>
            <form className={styles.form} onSubmit={handleForm}>
                <input ref={usernameRef} type="text" placeholder="Enter username" />
                <input ref={emailRef} type="email" placeholder="Enter email" />
                <input ref={passwordRef} type="password" placeholder="Enter password" />
                <input ref={repasswordRef} type="password" placeholder="Repeat password" />

                <button type="submit">Register</button>
                <div className={styles.loglink}>
                <Link className={styles.linke} to='/login'>Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
