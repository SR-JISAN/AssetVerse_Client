import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
        const {user,loading}= useContext(AuthContext);
        const location = useLocation()
        if(loading){
            return <Loading></Loading>
        }

        if(user){
            return children
        }

     return (
       <Navigate state={location?.pathname} to="/employee-Login"></Navigate>
     );
};

export default PrivateRoute;