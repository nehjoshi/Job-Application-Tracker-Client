import React, { ReactNode } from "react";
import { Navbar } from "./Navbar/Navbar";

export const Layout: React.FC<{ children: ReactNode, showNavItems: boolean }> = ({ children, showNavItems }) => {
    return (
        <>
            <Navbar showNavItems={showNavItems}/>
            {children}
        </>
    )
}