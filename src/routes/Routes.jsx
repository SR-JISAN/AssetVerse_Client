import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Root/Root';
import EmployeeLogin from '../pages/LogIn/EmployeeLogin';
import HrManagerLogin from '../pages/LogIn/HrManagerLogin';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import NFPage from '../pages/ErrorPage/NFPage';
import AssetList from '../pages/AssetList/AssetList';
import AddAsset from '../pages/AddAsset/AddAsset';
import AllAssetRequest from '../pages/AllAssetRequest/AllAssetRequest';
import PrivateRoute from '../PrivateRouters/PrivateRoute';
import AdminRouter from '../PrivateRouters/AdminRouter';
import Assets from '../pages/Assets/Assets';
import MyAssets from '../pages/MyAssets/MyAssets';
import MyTeam from '../pages/MyTeam/MyTeam';
import Profile from '../pages/profile/profile';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import Payment from '../components/Payment/Payment';






   const router = createBrowserRouter([
     {
       path: "/",
       element: <Root></Root>,
       errorElement: <NFPage></NFPage>,
       children: [
         {
           index: true,
           element: <Home></Home>,
         },

         {
           path: "/HR-Manager-Login",
           element: <HrManagerLogin></HrManagerLogin>,
         },
         {
           path: "/asset-list",
           element: (
             <AdminRouter>
               <PrivateRoute>
                 <AssetList></AssetList>
               </PrivateRoute>
             </AdminRouter>
           ),
         },
         {
           path: "/add-asset",
           element: (
             <AdminRouter>
               <PrivateRoute>
                 <AddAsset></AddAsset>
               </PrivateRoute>
             </AdminRouter>
           ),
         },
         {
           path: "/all-asset-request",
           element: (
             <AdminRouter>
               <PrivateRoute>
                 <AllAssetRequest></AllAssetRequest>
               </PrivateRoute>
               ,
             </AdminRouter>
           ),
         },
         {
           path: "/employeeList",
           element: (
             <AdminRouter>
               <PrivateRoute>
                 <EmployeeList></EmployeeList>
               </PrivateRoute>
             </AdminRouter>
           ),
         },
         {
           path: "/employee-Login",
           element: <EmployeeLogin></EmployeeLogin>,
         },
         {
           path: "/assets",
           element: <Assets></Assets>,
         },
         {
           path: "/my-asset",
           element: (
             <PrivateRoute>
               <MyAssets></MyAssets>
             </PrivateRoute>
           ),
         },
         {
           path: "/team/:companyName",
           element: (
             <PrivateRoute>
               <MyTeam></MyTeam>
             </PrivateRoute>
           ),
         },
         {
           path: "/my-profile",
           element: (
             <PrivateRoute>
               <Profile></Profile>
             </PrivateRoute>
           ),
         },
         {
           path: "/paymentPage",
           element: (
             <PrivateRoute>
               <Payment></Payment>
             </PrivateRoute>
           ),
         },
         {
           path: "/register",
           element: <Register></Register>,
         },
       ],
     },
   ]);


export default router;