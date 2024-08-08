import React, { useState, useEffect } from "react";
import styles from './index.module.css';
import { Link } from "react-router-dom";

function Home() {
    const [inputs, setInputs] = useState({ name: '', email: '', phone: '' });
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCards([...cards, inputs]);
        setInputs({ name: '', email: '', phone: '' }); // Clear inputs after submission
    };

    const handleDelete = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    return (
        <div className={styles.homebloc}>
            <h2>Home page</h2>
            <form onSubmit={handleSubmit} className={styles.reg}>
                <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={styles.input}
                />
                <input
                    type="tel"
                    name="phone"
                    value={inputs.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>Add Card</button>
            </form>
            <div className={styles.reg}>
                <Link to={'/mainpage'}>MainPage</Link>
            </div>
            <div className={styles.cardContainer}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <p>Name: {card.name}</p>
                        <p>Email: {card.email}</p>
                        <p>Phone: {card.phone}</p>
                        <button onClick={() => handleDelete(index)} className={styles.deleteButton}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Home;
