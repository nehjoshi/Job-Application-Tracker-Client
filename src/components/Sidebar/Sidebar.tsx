import React from 'react';
import "./Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { deleteAccessToken } from '../../utils/getAccessToken';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar: React.FC<{currentPage: string}> = ({currentPage}) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        deleteAccessToken();
        navigate("/");
    }

    return (
        <div className="sidebar-container">
            <h2 className="sidebar-title">Job Tracker</h2>
            <hr className="sidebar-divider" />
            <div className="sidebar-menu">
                <div className={`sidebar-menu-item ${currentPage === 'dashboard' && "item-selected"}`}>
                    <DashboardIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>Dashboard</span>
                </div>
                <Link to='/applications' className={`sidebar-menu-item ${currentPage === 'apps' && "item-selected"}`}>
                    <MenuBookIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>My Applications</span>
                </Link>
                <Link to="/social" className={`sidebar-menu-item ${currentPage === 'social' && "item-selected"}`}>
                    <ConnectWithoutContactIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>Social</span>
                </Link>
            </div>
            <div className='sidebar-footer'>
                <hr className="sidebar-divider" />
                <h3 className='sidebar-logout' onClick={handleSignOut}>Sign Out</h3>
            </div>
        </div>
    )
}