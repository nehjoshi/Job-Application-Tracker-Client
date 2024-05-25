import React from 'react';
import "./Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Sidebar: React.FC<{currentPage: string}> = ({currentPage}) => {
    return (
        <div className="sidebar-container">
            <h2 className="sidebar-title">Job Tracker</h2>
            <hr className="sidebar-divider" />
            <div className="sidebar-menu">
                <div className={`sidebar-menu-item ${currentPage === 'dashboard' && "item-selected"}`}>
                    <DashboardIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>Dashboard</span>
                </div>
                <div className={`sidebar-menu-item ${currentPage === 'apps' && "item-selected"}`}>
                    <MenuBookIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>My Applications</span>
                </div>
                <div className='sidebar-menu-item'>
                    <ConnectWithoutContactIcon className='sidebar-icon' />
                    <span className='sidebar-item-name'>Social</span>
                </div>
            </div>
        </div>
    )
}