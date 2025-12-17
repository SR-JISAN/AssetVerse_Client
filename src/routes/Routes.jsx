import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Root/Root';
import EmployeeLogin from '../pages/LogIn/EmployeeLogin';
import HrManagerLogin from '../pages/LogIn/HrManagerLogin';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';




   const router = createBrowserRouter([
     {
       path: "/",
       element: <Root></Root>,
       children: [
         {
           index: true,
           path: "/",
           element: <Home></Home>,
         },
         {
           path: "/employee-Login",
           element: <EmployeeLogin></EmployeeLogin>,
         },
         
         {
           path: "/HR-Manager-Login",
           element: <HrManagerLogin></HrManagerLogin>,
         },
         {
           path: "/register",
           element: <Register></Register>,
         },
       ],
     },
   ]);


export default router;