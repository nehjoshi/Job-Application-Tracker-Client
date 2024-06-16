import React from 'react';
import styles from "./Navbar.module.scss"
export const Navbar: React.FC<{ showNavItems: boolean }> = ({ showNavItems }) => {
    return (
        <nav className={styles.nav}>
            <h1>Job Tracker</h1>
            {showNavItems &&
                <ul className={styles.rightSideNav}>
                    <li><button className={styles.tryButtonList}>Try Now</button></li>
                    <li>Login</li>
                    <li>Contact</li>
                </ul>
            }
        </nav>
    )
}