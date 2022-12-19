import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Main = () => {
    return (
        <div className='font-Raleway flex flex-col justify-between min-h-full'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;