import React from 'react';
import { Outlet } from 'react-router-dom';


const Main = () => {
    return (
        <div>
            <h2 className='w-50 mx-auto p-5 text-success'>My first Email Auth.</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;