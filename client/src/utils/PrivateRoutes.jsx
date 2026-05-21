import React from 'react'
import { useAuth } from '../context/authContext';


const PrivateRoutes = () => {
  const { user, loading } = useAuth();
}


if (loading) {
    <div>Loading...</div>
}

return user ? children : <Navigate to="/login" />;

export default PrivateRoutes