import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";


//allows the header to remain the same through routing

export default function Layout () {
    return (
        <>
        <Header />
        <Outlet />
        
        </>
    )
}