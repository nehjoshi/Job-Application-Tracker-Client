import React, { ReactNode } from "react";
import { Navbar } from "./Navbar/Navbar";
import { Sidebar } from "./Sidebar/Sidebar";

interface props {
    children: ReactNode,
    showNavItems?: boolean,
    showNav?: boolean,
    showSidebar?: boolean,
    currentPage?: string
}

export const Layout: React.FC<props> = ({ children, showNavItems=false, showNav=false, showSidebar=false, currentPage="dashboard" }) => {
    return (
        <>
            {showNav && <Navbar showNavItems={showNavItems}/>}
            {showSidebar && <Sidebar currentPage={currentPage}/>}
            {children}
        </>
    )
}