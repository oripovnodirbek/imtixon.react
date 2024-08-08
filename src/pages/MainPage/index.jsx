import React from "react";
import styles from './index.module.css'
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div className={styles.mainbloc}>
            <h2>Main page</h2>
            <div className="reg">
               <Link to={'/'}>Home</Link>
            </div>
        </div>
    )
}
export default MainPage