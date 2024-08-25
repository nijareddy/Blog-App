import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest}) {

  const jwtToken=Cookies.get('jwt_token')

  return jwtToken !== undefined ? <Outlet /> : <Navigate to='/login' />
}
export default ProtectedRoute;