import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Root/Root';
import EmployeeLogin from '../pages/LogIn/EmployeeLogin';
import HrManagerLogin from '../pages/LogIn/HrManagerLogin';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import NFPage from '../pages/ErrorPage/NFPage';
import EmployeeManagement from '../components/EmployeeManagement/EmployeeManagement';
import AssetList from '../pages/AssetList/AssetList';
import AddAsset from '../pages/AddAsset/AddAsset';
import AllAssetRequest from '../pages/AllAssetRequest/AllAssetRequest';




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
           element: <AssetList></AssetList>,
         },
         {
           path: "/add-asset",
           element: <AddAsset></AddAsset>,
         },
         {
           path: "/all-asset-request",
           element: <AllAssetRequest></AllAssetRequest>,
         },
         {
           path: "/employee-management",
           element: <EmployeeManagement></EmployeeManagement>,
         },
         {
           path: "/employee-Login",
           element: <EmployeeLogin></EmployeeLogin>,
         },
         {
           path: "/register",
           element: <Register></Register>,
         },
       ],
     },
   ]);


export default router;