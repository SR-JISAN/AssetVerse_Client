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
import PrivateRoute from '../PrivateRouters/PrivateRoute';
import AdminRouter from '../PrivateRouters/AdminRouter';
import Assets from '../pages/Assets/Assets';
import MyAssets from '../pages/MyAssets/MyAssets';
import MyTeam from '../pages/MyTeam/MyTeam';




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
           element: <AdminRouter>    
              <PrivateRoute>
                  <AssetList></AssetList>
              </PrivateRoute>
            </AdminRouter>
         },
         {
           path: "/add-asset",
           element:<AdminRouter>
                     <PrivateRoute>
                         <AddAsset></AddAsset>
                     </PrivateRoute>
                    </AdminRouter>,
         },
         {
           path: "/all-asset-request",
           element:<AdminRouter>
              <PrivateRoute>
                 <AllAssetRequest></AllAssetRequest>
              </PrivateRoute>,
           </AdminRouter> 
         },
         {
           path: "/employee-management",
           element: <PrivateRoute><EmployeeManagement></EmployeeManagement></PrivateRoute>,
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
           element: <PrivateRoute>
               <MyAssets></MyAssets>
            </PrivateRoute>,
         },
         {
           path: "/my-team",
           element: <PrivateRoute>
               <MyTeam></MyTeam>
            </PrivateRoute>,
         },
         {
           path: "/register",
           element: <Register></Register>,
         },
       ],
     },
   ]);


export default router;