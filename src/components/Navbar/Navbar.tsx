import React from 'react';
import "./Navbar.scss"
export const Navbar: React.FC<{ showNavItems: boolean }> = ({ showNavItems }) => {
    return (
        <nav>
            <h1>Job Tracker</h1>
            {showNavItems &&
                <ul className='right-side-nav'>
                    <li><button className="try-button-list">Try Now</button></li>
                    <li>Login</li>
                    <li>Contact</li>
                </ul>
            }
        </nav>
    )
}