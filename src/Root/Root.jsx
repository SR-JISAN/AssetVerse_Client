import React from 'react';
import { Outlet } from 'react-router';
import Loading from '../pages/Loading/Loading';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../pages/Footer/Footer';

const Root = () => {
    return (
     <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
     </>
    );
};

export default Root;