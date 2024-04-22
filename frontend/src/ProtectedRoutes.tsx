/*
import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInStatus } from './pages/Auth/axios.ts';

export default async function ProtectedRoutes() {
	// TODO: Use authentication token
	const isLoggedIn = await getLoggedInStatus();

	return isLoggedIn ? <Outlet /> : <Navigate to="/login"  replace />;
};
*/
