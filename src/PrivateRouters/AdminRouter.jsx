import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../pages/Loading/Loading';

const AdminRouter = ({children}) => {
    const {dbUser,loading}= useContext(AuthContext);
    if(loading){
        return<Loading></Loading>
    }
    if (!dbUser || dbUser.role !== "HR-Manager") {
      return <Navigate to="/employee-Login" replace />;
    }

    return children
};

export default AdminRouter;