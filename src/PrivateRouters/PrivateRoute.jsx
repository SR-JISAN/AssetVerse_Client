import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
        const { user, loading, dbUser } = useContext(AuthContext);
        const location = useLocation();

        if (loading) return <Loading />;

        
        if (user && dbUser) return children;

        return (
          <Navigate state={{ from: location }} to="/employee-Login" replace />
        );
};

export default PrivateRoute;