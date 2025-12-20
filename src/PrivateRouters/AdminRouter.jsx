import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../pages/Loading/Loading';

const AdminRouter = ({children}) => {
    const {dbUser,loading}= useContext(AuthContext);
    console.log(dbUser.role)
    if(loading){
        return<Loading></Loading>
    }
    if(dbUser?.role !== "HR-Manager"){
        return <h1 className='text-2xl my-10 text-red-500 text-center font-bold'>UnAuthorized Access</h1>
    }

    return children
};

export default AdminRouter;