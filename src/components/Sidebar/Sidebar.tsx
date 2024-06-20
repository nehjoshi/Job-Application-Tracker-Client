import React from 'react';
import styles from "./Sidebar.module.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { deleteAccessToken } from '../../utils/getAccessToken';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar: React.FC<{ currentPage: string }> = ({ currentPage }) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        deleteAccessToken();
        navigate("/");
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Job Tracker</h2>
            <hr className={styles.divider} />
            <div className={styles.menu}>
                <Link to='/dashboard' className={`${styles.menuItem} ${currentPage === 'dashboard' && styles.itemSelected}`}>
                    <DashboardIcon className={styles.menuIcon}/>
                    <span>Dashboard</span>
                </Link>
                <Link to='/applications' className={`${styles.menuItem} ${currentPage === 'apps' && styles.itemSelected}`}>
                    <MenuBookIcon className={styles.menuIcon}/>
                    <span>My Applications</span>
                </Link>
                <Link to="/social" className={`${styles.menuItem} ${currentPage === 'social' && styles.itemSelected}`}>
                    <ConnectWithoutContactIcon className={styles.menuIcon}/>
                    <span>Social</span>
                </Link>
                <div className={`${styles.menuItem} ${styles.responsiveLogout}`}>
                    <ExitToAppIcon className={styles.menuIcon}/>
                    <span onClick={handleSignOut}>Sign Out</span>
                </div>
            </div>
            <div className={styles.footer}>
                <hr className={styles.divider} />
                <h3 className='sidebar-logout' onClick={handleSignOut}>Sign Out</h3>
            </div>
        </div>
    )
}