import React from 'react';
import { Outlet } from 'react-router';
import Loading from '../pages/Loading/Loading';
import Navbar from '../components/Navbar/Navbar';

const Root = () => {
    return (
     <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <h1>footer</h1>
     </>
    );
};

export default Root;